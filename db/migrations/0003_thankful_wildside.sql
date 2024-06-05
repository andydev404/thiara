CREATE TABLE IF NOT EXISTS "prompts_versions" (
	"id" text PRIMARY KEY NOT NULL,
	"value" text NOT NULL,
	"promptId" text NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prompts_versions" ADD CONSTRAINT "prompts_versions_promptId_prompts_id_fk" FOREIGN KEY ("promptId") REFERENCES "public"."prompts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "prompts" DROP COLUMN IF EXISTS "prompt";