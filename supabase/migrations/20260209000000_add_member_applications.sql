-- Add 'pending' status to member_status enum
ALTER TYPE "public"."member_status" ADD VALUE IF NOT EXISTS 'pending';

-- Allow anonymous users to create pending members
DROP POLICY IF EXISTS "Anyone can create pending member" ON "public"."members";
CREATE POLICY "Anyone can create pending member"
  ON "public"."members"
  FOR INSERT TO anon
  WITH CHECK (status = 'pending');

-- Allow anon to read back the member row after insert (.insert().select())
DROP POLICY IF EXISTS "Anon can read pending members" ON "public"."members";
CREATE POLICY "Anon can read pending members"
  ON "public"."members"
  FOR SELECT TO anon
  USING (status = 'pending');

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

DROP POLICY IF EXISTS "Anyone can submit application" ON "public"."member_applications";
CREATE POLICY "Anyone can submit application"
  ON "public"."member_applications"
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

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
