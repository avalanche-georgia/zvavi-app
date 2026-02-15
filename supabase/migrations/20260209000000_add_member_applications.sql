-- Add 'pending' status to member_status enum
ALTER TYPE "public"."member_status" ADD VALUE IF NOT EXISTS 'pending';

-- Member applications table
CREATE TABLE IF NOT EXISTS "public"."member_applications" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
  "first_name" varchar(100) NOT NULL,
  "last_name" varchar(100) NOT NULL,
  "email" varchar(255) NOT NULL,
  "address" text,
  "phone" varchar(50) NOT NULL,
  "occupation" text,
  "motivation" text,
  "age" integer,
  "gender" text,
  "payment_method" text NOT NULL,
  "member_id" uuid REFERENCES "public"."members"("id") ON DELETE SET NULL,
  "status" text NOT NULL DEFAULT 'pending',
  "created_at" timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE "public"."member_applications" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can read applications" ON "public"."member_applications";
CREATE POLICY "Authenticated users can read applications"
  ON "public"."member_applications"
  FOR SELECT TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can update applications" ON "public"."member_applications";
CREATE POLICY "Authenticated users can update applications"
  ON "public"."member_applications"
  FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can delete applications" ON "public"."member_applications";
CREATE POLICY "Authenticated users can delete applications"
  ON "public"."member_applications"
  FOR DELETE TO authenticated
  USING (true);

-- RPC function: both inserts in one transaction, SECURITY DEFINER bypasses RLS
-- so no anon policies needed on members or member_applications
CREATE OR REPLACE FUNCTION submit_member_application(
  p_first_name text,
  p_last_name text,
  p_email text,
  p_phone text,
  p_payment_method text,
  p_address text DEFAULT NULL,
  p_occupation text DEFAULT NULL,
  p_motivation text DEFAULT NULL,
  p_age integer DEFAULT NULL,
  p_gender text DEFAULT NULL
) RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_member record;
BEGIN
  INSERT INTO members (first_name, last_name, email, phone, status)
  VALUES (p_first_name, p_last_name, p_email, p_phone, 'pending')
  RETURNING id, member_id, verification_code INTO v_member;

  INSERT INTO member_applications (
    first_name, last_name, email, phone,
    address, occupation, motivation, age, gender,
    payment_method, member_id
  ) VALUES (
    p_first_name, p_last_name, p_email, p_phone,
    p_address, p_occupation, p_motivation, p_age, p_gender,
    p_payment_method, v_member.id
  );

  RETURN json_build_object(
    'memberId', v_member.member_id,
    'verificationCode', v_member.verification_code
  );
END;
$$;

-- Remove anon policies that are no longer needed (RPC handles it)
DROP POLICY IF EXISTS "Anyone can create pending member" ON "public"."members";
DROP POLICY IF EXISTS "Anon can read pending members" ON "public"."members";
DROP POLICY IF EXISTS "Anyone can submit application" ON "public"."member_applications";