-- Personal details on the member itself, so members added by an admin carry the
-- same data as those who applied. member_applications stays the record of what
-- an applicant submitted (incl. payment method); members holds the current data.

ALTER TABLE public.members
  ADD COLUMN IF NOT EXISTS address text,
  ADD COLUMN IF NOT EXISTS age integer,
  ADD COLUMN IF NOT EXISTS gender text,
  ADD COLUMN IF NOT EXISTS motivation text,
  ADD COLUMN IF NOT EXISTS occupation text;

-- Backfill from each member's latest application
UPDATE public.members m
SET
  address = a.address,
  age = a.age,
  gender = a.gender,
  motivation = a.motivation,
  occupation = a.occupation
FROM (
  SELECT DISTINCT ON (member_id) member_id, address, age, gender, motivation, occupation
  FROM public.member_applications
  WHERE member_id IS NOT NULL
  ORDER BY member_id, created_at DESC
) a
WHERE a.member_id = m.id;

-- NOT VALID: enforced for new writes; older applications were checked only in the browser
ALTER TABLE public.members
  DROP CONSTRAINT IF EXISTS members_age_range,
  ADD CONSTRAINT members_age_range CHECK (age BETWEEN 0 AND 120) NOT VALID,
  DROP CONSTRAINT IF EXISTS members_gender_values,
  ADD CONSTRAINT members_gender_values
    CHECK (gender IN ('male', 'female', 'preferNotToSay')) NOT VALID;

-- The public application now also fills the member's details. Same signature:
-- CREATE OR REPLACE keeps the service_role-only EXECUTE grant.
CREATE OR REPLACE FUNCTION public.submit_member_application(
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
  INSERT INTO members (
    first_name, last_name, email, phone, status,
    address, occupation, motivation, age, gender
  )
  VALUES (
    p_first_name, p_last_name, p_email, p_phone, 'pending',
    p_address, p_occupation, p_motivation, p_age, p_gender
  )
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
