


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE SCHEMA IF NOT EXISTS "public";


ALTER SCHEMA "public" OWNER TO "pg_database_owner";


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE TYPE "public"."avalanche_problem_type" AS ENUM (
    'cornice',
    'deepSlab',
    'glide',
    'looseDry',
    'looseWet',
    'persistentSlab',
    'stormSlab',
    'wetSlab',
    'windSlab'
);


ALTER TYPE "public"."avalanche_problem_type" OWNER TO "postgres";


CREATE TYPE "public"."confidence" AS ENUM (
    'high',
    'low',
    'moderate'
);


ALTER TYPE "public"."confidence" OWNER TO "postgres";


CREATE TYPE "public"."distribution" AS ENUM (
    'isolated',
    'specific',
    'widespread'
);


ALTER TYPE "public"."distribution" OWNER TO "postgres";


CREATE TYPE "public"."forecast_status" AS ENUM (
    'draft',
    'published'
);


ALTER TYPE "public"."forecast_status" OWNER TO "postgres";


CREATE TYPE "public"."hazard_level" AS ENUM (
    '1',
    '2',
    '3',
    '4',
    '5'
);


ALTER TYPE "public"."hazard_level" OWNER TO "postgres";


CREATE TYPE "public"."member_status" AS ENUM (
    'active',
    'inactive',
    'suspended',
    'expired'
);


ALTER TYPE "public"."member_status" OWNER TO "postgres";


CREATE TYPE "public"."sensitivity" AS ENUM (
    'reactive',
    'stubborn',
    'touchy',
    'unreactive'
);


ALTER TYPE "public"."sensitivity" OWNER TO "postgres";


CREATE TYPE "public"."snow_condition" AS ENUM (
    'dry',
    'wet'
);


ALTER TYPE "public"."snow_condition" OWNER TO "postgres";


CREATE TYPE "public"."trend" AS ENUM (
    'deteriorating',
    'improving',
    'noChange'
);


ALTER TYPE "public"."trend" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."fetch_combined_forecast_data"() RETURNS "jsonb"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    last_forecast_id INTEGER;
BEGIN
    -- Step 1: Get the ID of the last forecast
    SELECT id INTO last_forecast_id
    FROM forecasts
    ORDER BY id DESC
    LIMIT 1;

    -- Step 2: Return data from both tables as JSON
    RETURN (
        SELECT jsonb_build_object(
            'recent_avalanches', jsonb_agg(
                jsonb_build_object(
                    'id', ra.id,
                    'date', ra.date,
                    'description', ra.description,
                    'size', ra.size,
                    'aspects', ra.aspects
                )
            ),
            'avalanche_problems', jsonb_agg(
                jsonb_build_object(
                    'id', ap.id,
                    'created_at', ap.created_at,
                    'type', ap.type,
                    'avalanche_size', ap.avalanche_size,
                    'sensitivity', ap.sensitivity,
                    'distribution', ap.distribution,
                    'confidence', ap.confidence,
                    'trend', ap.trend,
                    'aspects', ap.aspects,
                    'description', ap.description,
                    'time_of_day', ap.time_of_day,
                    'is_all_day', ap.is_all_day
                )
            )
        )
        FROM recent_avalanches AS ra
        JOIN avalanche_problems AS ap
        ON ra.forecast_id = ap.forecast_id
        WHERE ra.forecast_id = last_forecast_id
    );
END;
$$;


ALTER FUNCTION "public"."fetch_combined_forecast_data"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."generate_member_id"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  current_year TEXT;
  sequence_num INTEGER;
  new_member_id TEXT;
BEGIN
  -- Only generate if member_id is not provided
  IF NEW.member_id IS NULL OR NEW.member_id = '' THEN
    current_year := EXTRACT(YEAR FROM CURRENT_DATE)::TEXT;

    -- Get the next sequence number for this year
    SELECT COALESCE(MAX(
      CAST(SUBSTRING(member_id FROM 'ZVAVI-' || current_year || '-(\d+)') AS INTEGER)
    ), 0) + 1
    INTO sequence_num
    FROM members
    WHERE member_id LIKE 'ZVAVI-' || current_year || '-%';

    new_member_id := 'ZVAVI-' || current_year || '-' || LPAD(sequence_num::TEXT, 4, '0');
    NEW.member_id := new_member_id;
  END IF;

  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."generate_member_id"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."generate_verification_code"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  IF NEW.verification_code IS NULL OR NEW.verification_code = '' THEN
    NEW.verification_code := encode(gen_random_bytes(16), 'hex');
  END IF;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."generate_verification_code"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_latest_published_forecast_with_related"() RETURNS "jsonb"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    result jsonb;
BEGIN 
    SELECT jsonb_build_object(
        'forecast', jsonb_build_object('data', f.*),
        'avalanche_problems', COALESCE(
            jsonb_agg(DISTINCT jsonb_build_object('data', ap.*)), 
            '[]'::jsonb
        ),
        'recent_avalanches', COALESCE(
            jsonb_agg(DISTINCT jsonb_build_object('data', ra.*)), 
            '[]'::jsonb
        )
    ) INTO result
    FROM forecasts f 
    LEFT JOIN avalanche_problems ap ON f.id = ap.forecast_id 
    LEFT JOIN recent_avalanches ra ON f.id = ra.forecast_id 
    WHERE f.status = 'published' 
    GROUP BY f.id 
    ORDER BY f.id DESC 
    LIMIT 1;
    
    RETURN result;
END;
$$;


ALTER FUNCTION "public"."get_latest_published_forecast_with_related"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_published_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
  if new.status = 'published' then
    new.published_at := now();
  elsif new.status = 'draft' then
    new.published_at := null;
  end if;
  return new;
end;
$$;


ALTER FUNCTION "public"."handle_published_at"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_members_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_members_updated_at"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_updated_at_column"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."verify_member"("code" "text", "client_ip" "inet" DEFAULT NULL::"inet", "client_user_agent" "text" DEFAULT NULL::"text") RETURNS "json"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  member_record RECORD;
  result JSON;
BEGIN
  -- Find member by verification code
  SELECT
    id,
    first_name,
    last_name,
    member_id,
    status,
    joined_at,
    expires_at
  INTO member_record
  FROM members
  WHERE verification_code = code;

  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'error', 'Member not found');
  END IF;

  -- Log the verification
  INSERT INTO member_verifications (member_id, ip_address, user_agent)
  VALUES (member_record.id, client_ip, client_user_agent);

  -- Return member info
  RETURN json_build_object(
    'success', true,
    'member', json_build_object(
      'firstName', member_record.first_name,
      'lastName', member_record.last_name,
      'memberId', member_record.member_id,
      'status', member_record.status,
      'joinedAt', member_record.joined_at,
      'expiresAt', member_record.expires_at
    )
  );
END;
$$;


ALTER FUNCTION "public"."verify_member"("code" "text", "client_ip" "inet", "client_user_agent" "text") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."avalanche_problems" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "type" "public"."avalanche_problem_type" NOT NULL,
    "avalanche_size" bigint,
    "sensitivity" "public"."sensitivity",
    "distribution" "public"."distribution",
    "confidence" "public"."confidence",
    "trend" "public"."trend",
    "forecast_id" bigint NOT NULL,
    "aspects" "jsonb" DEFAULT '{"alpine": [], "sub_alpine": [], "high_alpine": []}'::"jsonb",
    "description" "text",
    "time_of_day" "jsonb" DEFAULT '{"end": null, "start": null}'::"jsonb",
    "is_all_day" boolean DEFAULT true NOT NULL
);


ALTER TABLE "public"."avalanche_problems" OWNER TO "postgres";


ALTER TABLE "public"."avalanche_problems" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."avalanche_problems_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."avalanche_translations" (
    "id" integer NOT NULL,
    "avalanche_id" bigint NOT NULL,
    "locale" "text" NOT NULL,
    "description" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "avalanche_translations_locale_check" CHECK (("locale" = ANY (ARRAY['en'::"text", 'ka'::"text"])))
);


ALTER TABLE "public"."avalanche_translations" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."avalanche_translations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."avalanche_translations_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."avalanche_translations_id_seq" OWNED BY "public"."avalanche_translations"."id";



CREATE TABLE IF NOT EXISTS "public"."forecast_translations" (
    "id" integer NOT NULL,
    "forecast_id" integer NOT NULL,
    "locale" "text" NOT NULL,
    "summary" "text",
    "weather" "text",
    "snowpack" "text",
    "additional_hazards" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "forecast_translations_locale_check" CHECK (("locale" = ANY (ARRAY['en'::"text", 'ka'::"text"])))
);


ALTER TABLE "public"."forecast_translations" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."forecast_translations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."forecast_translations_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."forecast_translations_id_seq" OWNED BY "public"."forecast_translations"."id";



CREATE TABLE IF NOT EXISTS "public"."forecasts" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "forecaster" "text",
    "status" "public"."forecast_status" DEFAULT 'draft'::"public"."forecast_status",
    "valid_until" timestamp with time zone,
    "snowpack" "text",
    "summary" "text",
    "weather" "text",
    "snow_condition" "public"."snow_condition" DEFAULT 'dry'::"public"."snow_condition" NOT NULL,
    "additional_hazards" "text",
    "hazard_levels" "jsonb" DEFAULT '{"alpine": "1", "overall": "1", "subAlpine": "1", "highAlpine": "1"}'::"jsonb" NOT NULL,
    "published_at" timestamp with time zone
);


ALTER TABLE "public"."forecasts" OWNER TO "postgres";


COMMENT ON COLUMN "public"."forecasts"."snow_condition" IS 'Deprecated. Do not use this column';



ALTER TABLE "public"."forecasts" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."forecasts_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."member_verifications" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "member_id" "uuid" NOT NULL,
    "verified_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "ip_address" "inet",
    "user_agent" "text"
);


ALTER TABLE "public"."member_verifications" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."members" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "first_name" character varying(100) NOT NULL,
    "last_name" character varying(100) NOT NULL,
    "email" character varying(255),
    "phone" character varying(50),
    "member_id" character varying(50) NOT NULL,
    "status" "public"."member_status" DEFAULT 'active'::"public"."member_status" NOT NULL,
    "joined_at" "date" DEFAULT CURRENT_DATE NOT NULL,
    "expires_at" "date",
    "verification_code" character varying(32) NOT NULL,
    "auth_user_id" "uuid",
    "notes" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."members" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."problem_translations" (
    "id" integer NOT NULL,
    "problem_id" bigint NOT NULL,
    "locale" "text" NOT NULL,
    "description" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "problem_translations_locale_check" CHECK (("locale" = ANY (ARRAY['en'::"text", 'ka'::"text"])))
);


ALTER TABLE "public"."problem_translations" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."problem_translations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."problem_translations_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."problem_translations_id_seq" OWNED BY "public"."problem_translations"."id";



CREATE TABLE IF NOT EXISTS "public"."recent_avalanches" (
    "id" bigint NOT NULL,
    "date" timestamp with time zone NOT NULL,
    "description" "text",
    "size" bigint,
    "aspects" "jsonb" DEFAULT '{"alpine": [], "sub_alpine": [], "high_alpine": []}'::"jsonb",
    "forecast_id" bigint NOT NULL
);


ALTER TABLE "public"."recent_avalanches" OWNER TO "postgres";


ALTER TABLE "public"."recent_avalanches" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."recent_avalanches_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."user_profiles" (
    "id" "uuid" NOT NULL,
    "email" "text" NOT NULL,
    "name" "text",
    "role" "text" DEFAULT 'trainee'::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "user_profiles_role_check" CHECK (("role" = ANY (ARRAY['forecaster'::"text", 'trainee'::"text", 'admin'::"text"])))
);


ALTER TABLE "public"."user_profiles" OWNER TO "postgres";


ALTER TABLE ONLY "public"."avalanche_translations" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."avalanche_translations_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."forecast_translations" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."forecast_translations_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."problem_translations" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."problem_translations_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."avalanche_problems"
    ADD CONSTRAINT "avalanche_problems_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."avalanche_translations"
    ADD CONSTRAINT "avalanche_translations_avalanche_id_locale_key" UNIQUE ("avalanche_id", "locale");



ALTER TABLE ONLY "public"."avalanche_translations"
    ADD CONSTRAINT "avalanche_translations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."forecast_translations"
    ADD CONSTRAINT "forecast_translations_forecast_id_locale_key" UNIQUE ("forecast_id", "locale");



ALTER TABLE ONLY "public"."forecast_translations"
    ADD CONSTRAINT "forecast_translations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."forecasts"
    ADD CONSTRAINT "forecasts_id_key" UNIQUE ("id");



ALTER TABLE ONLY "public"."forecasts"
    ADD CONSTRAINT "forecasts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."member_verifications"
    ADD CONSTRAINT "member_verifications_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."members"
    ADD CONSTRAINT "members_member_id_key" UNIQUE ("member_id");



ALTER TABLE ONLY "public"."members"
    ADD CONSTRAINT "members_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."members"
    ADD CONSTRAINT "members_verification_code_key" UNIQUE ("verification_code");



ALTER TABLE ONLY "public"."problem_translations"
    ADD CONSTRAINT "problem_translations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."problem_translations"
    ADD CONSTRAINT "problem_translations_problem_id_locale_key" UNIQUE ("problem_id", "locale");



ALTER TABLE ONLY "public"."recent_avalanches"
    ADD CONSTRAINT "recent_avalanches_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_profiles"
    ADD CONSTRAINT "userprofiles_pkey" PRIMARY KEY ("id");



CREATE INDEX "idx_avalanche_translations_avalanche_id" ON "public"."avalanche_translations" USING "btree" ("avalanche_id");



CREATE INDEX "idx_avalanche_translations_locale" ON "public"."avalanche_translations" USING "btree" ("locale");



CREATE INDEX "idx_forecast_translations_forecast_id" ON "public"."forecast_translations" USING "btree" ("forecast_id");



CREATE INDEX "idx_forecast_translations_locale" ON "public"."forecast_translations" USING "btree" ("locale");



CREATE INDEX "idx_member_verifications_member_id" ON "public"."member_verifications" USING "btree" ("member_id");



CREATE INDEX "idx_members_member_id" ON "public"."members" USING "btree" ("member_id");



CREATE INDEX "idx_members_status" ON "public"."members" USING "btree" ("status");



CREATE INDEX "idx_members_verification_code" ON "public"."members" USING "btree" ("verification_code");



CREATE INDEX "idx_problem_translations_locale" ON "public"."problem_translations" USING "btree" ("locale");



CREATE INDEX "idx_problem_translations_problem_id" ON "public"."problem_translations" USING "btree" ("problem_id");



CREATE OR REPLACE TRIGGER "trigger_generate_member_id" BEFORE INSERT ON "public"."members" FOR EACH ROW EXECUTE FUNCTION "public"."generate_member_id"();



CREATE OR REPLACE TRIGGER "trigger_generate_verification_code" BEFORE INSERT ON "public"."members" FOR EACH ROW EXECUTE FUNCTION "public"."generate_verification_code"();



CREATE OR REPLACE TRIGGER "trigger_update_members_updated_at" BEFORE UPDATE ON "public"."members" FOR EACH ROW EXECUTE FUNCTION "public"."update_members_updated_at"();



CREATE OR REPLACE TRIGGER "update_avalanche_translations_updated_at" BEFORE UPDATE ON "public"."avalanche_translations" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_forecast_translations_updated_at" BEFORE UPDATE ON "public"."forecast_translations" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_problem_translations_updated_at" BEFORE UPDATE ON "public"."problem_translations" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_published_at" BEFORE UPDATE ON "public"."forecasts" FOR EACH ROW WHEN (("old"."status" IS DISTINCT FROM "new"."status")) EXECUTE FUNCTION "public"."handle_published_at"();



ALTER TABLE ONLY "public"."avalanche_problems"
    ADD CONSTRAINT "avalanche_problems_forecast_id_fkey" FOREIGN KEY ("forecast_id") REFERENCES "public"."forecasts"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."avalanche_translations"
    ADD CONSTRAINT "avalanche_translations_avalanche_id_fkey" FOREIGN KEY ("avalanche_id") REFERENCES "public"."recent_avalanches"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."forecast_translations"
    ADD CONSTRAINT "forecast_translations_forecast_id_fkey" FOREIGN KEY ("forecast_id") REFERENCES "public"."forecasts"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."member_verifications"
    ADD CONSTRAINT "member_verifications_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."members"
    ADD CONSTRAINT "members_auth_user_id_fkey" FOREIGN KEY ("auth_user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."problem_translations"
    ADD CONSTRAINT "problem_translations_problem_id_fkey" FOREIGN KEY ("problem_id") REFERENCES "public"."avalanche_problems"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."recent_avalanches"
    ADD CONSTRAINT "recent_avalanches_forecast_id_fkey" FOREIGN KEY ("forecast_id") REFERENCES "public"."forecasts"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_profiles"
    ADD CONSTRAINT "userprofiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



CREATE POLICY "Allow all users to update" ON "public"."recent_avalanches" FOR UPDATE USING (true) WITH CHECK (true);



CREATE POLICY "Allow all users to update any forecast" ON "public"."forecasts" FOR UPDATE USING (true) WITH CHECK (true);



CREATE POLICY "Allow delete for authenticated users" ON "public"."forecasts" FOR DELETE USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Allow insert for authenticated users" ON "public"."avalanche_problems" FOR INSERT WITH CHECK (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Allow insert for authenticated users" ON "public"."forecasts" FOR INSERT WITH CHECK (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Allow insert for authenticated users" ON "public"."recent_avalanches" FOR INSERT WITH CHECK (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Allow read access for all users" ON "public"."avalanche_problems" FOR SELECT USING (true);



CREATE POLICY "Allow read access for all users" ON "public"."forecasts" FOR SELECT USING (true);



CREATE POLICY "Allow read access for all users" ON "public"."recent_avalanches" FOR SELECT USING (true);



CREATE POLICY "Authenticated users can delete members" ON "public"."members" FOR DELETE TO "authenticated" USING (true);



CREATE POLICY "Authenticated users can insert members" ON "public"."members" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Authenticated users can manage avalanche translations" ON "public"."avalanche_translations" TO "authenticated" USING (true) WITH CHECK (true);



CREATE POLICY "Authenticated users can manage forecast translations" ON "public"."forecast_translations" TO "authenticated" USING (true) WITH CHECK (true);



CREATE POLICY "Authenticated users can manage problem translations" ON "public"."problem_translations" TO "authenticated" USING (true) WITH CHECK (true);



CREATE POLICY "Authenticated users can read members" ON "public"."members" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Authenticated users can read verifications" ON "public"."member_verifications" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Authenticated users can update members" ON "public"."members" FOR UPDATE TO "authenticated" USING (true) WITH CHECK (true);



CREATE POLICY "Enable delete for users" ON "public"."avalanche_problems" FOR DELETE USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Enable delete for users" ON "public"."recent_avalanches" FOR DELETE USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Enable update for users" ON "public"."avalanche_problems" FOR UPDATE USING (true) WITH CHECK (true);



CREATE POLICY "Public can read avalanche translations" ON "public"."avalanche_translations" FOR SELECT TO "anon" USING (true);



CREATE POLICY "Public can read forecast translations" ON "public"."forecast_translations" FOR SELECT TO "anon" USING (true);



CREATE POLICY "Public can read problem translations" ON "public"."problem_translations" FOR SELECT TO "anon" USING (true);



CREATE POLICY "Restrict deletion of selected forecast by ID " ON "public"."forecasts" AS RESTRICTIVE FOR DELETE USING (("id" <> ALL (ARRAY[(35)::bigint, (77)::bigint])));



ALTER TABLE "public"."avalanche_problems" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."avalanche_translations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."forecast_translations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."forecasts" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."member_verifications" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."members" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."problem_translations" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "public read profiles" ON "public"."user_profiles" FOR SELECT USING (true);



ALTER TABLE "public"."recent_avalanches" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "user can read own profile" ON "public"."user_profiles" FOR SELECT USING (("id" = "auth"."uid"()));



ALTER TABLE "public"."user_profiles" ENABLE ROW LEVEL SECURITY;


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



GRANT ALL ON FUNCTION "public"."fetch_combined_forecast_data"() TO "anon";
GRANT ALL ON FUNCTION "public"."fetch_combined_forecast_data"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."fetch_combined_forecast_data"() TO "service_role";



GRANT ALL ON FUNCTION "public"."generate_member_id"() TO "anon";
GRANT ALL ON FUNCTION "public"."generate_member_id"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."generate_member_id"() TO "service_role";



GRANT ALL ON FUNCTION "public"."generate_verification_code"() TO "anon";
GRANT ALL ON FUNCTION "public"."generate_verification_code"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."generate_verification_code"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_latest_published_forecast_with_related"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_latest_published_forecast_with_related"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_latest_published_forecast_with_related"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_published_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_published_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_published_at"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_members_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_members_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_members_updated_at"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "service_role";



GRANT ALL ON FUNCTION "public"."verify_member"("code" "text", "client_ip" "inet", "client_user_agent" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."verify_member"("code" "text", "client_ip" "inet", "client_user_agent" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."verify_member"("code" "text", "client_ip" "inet", "client_user_agent" "text") TO "service_role";



GRANT ALL ON TABLE "public"."avalanche_problems" TO "anon";
GRANT ALL ON TABLE "public"."avalanche_problems" TO "authenticated";
GRANT ALL ON TABLE "public"."avalanche_problems" TO "service_role";



GRANT ALL ON SEQUENCE "public"."avalanche_problems_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."avalanche_problems_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."avalanche_problems_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."avalanche_translations" TO "anon";
GRANT ALL ON TABLE "public"."avalanche_translations" TO "authenticated";
GRANT ALL ON TABLE "public"."avalanche_translations" TO "service_role";



GRANT ALL ON SEQUENCE "public"."avalanche_translations_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."avalanche_translations_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."avalanche_translations_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."forecast_translations" TO "anon";
GRANT ALL ON TABLE "public"."forecast_translations" TO "authenticated";
GRANT ALL ON TABLE "public"."forecast_translations" TO "service_role";



GRANT ALL ON SEQUENCE "public"."forecast_translations_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."forecast_translations_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."forecast_translations_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."forecasts" TO "anon";
GRANT ALL ON TABLE "public"."forecasts" TO "authenticated";
GRANT ALL ON TABLE "public"."forecasts" TO "service_role";



GRANT ALL ON SEQUENCE "public"."forecasts_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."forecasts_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."forecasts_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."member_verifications" TO "anon";
GRANT ALL ON TABLE "public"."member_verifications" TO "authenticated";
GRANT ALL ON TABLE "public"."member_verifications" TO "service_role";



GRANT ALL ON TABLE "public"."members" TO "anon";
GRANT ALL ON TABLE "public"."members" TO "authenticated";
GRANT ALL ON TABLE "public"."members" TO "service_role";



GRANT ALL ON TABLE "public"."problem_translations" TO "anon";
GRANT ALL ON TABLE "public"."problem_translations" TO "authenticated";
GRANT ALL ON TABLE "public"."problem_translations" TO "service_role";



GRANT ALL ON SEQUENCE "public"."problem_translations_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."problem_translations_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."problem_translations_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."recent_avalanches" TO "anon";
GRANT ALL ON TABLE "public"."recent_avalanches" TO "authenticated";
GRANT ALL ON TABLE "public"."recent_avalanches" TO "service_role";



GRANT ALL ON SEQUENCE "public"."recent_avalanches_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."recent_avalanches_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."recent_avalanches_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."user_profiles" TO "anon";
GRANT ALL ON TABLE "public"."user_profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."user_profiles" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";







