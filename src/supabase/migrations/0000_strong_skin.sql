CREATE TABLE IF NOT EXISTS "competition" (
	"id" varchar(42) PRIMARY KEY NOT NULL,
	"category" varchar(46) NOT NULL,
	"payment" varchar(256),
	"status" numeric DEFAULT '0' NOT NULL,
	CONSTRAINT "competition_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" varchar(42) PRIMARY KEY NOT NULL,
	"leader_name" varchar(255) NOT NULL,
	"member1_name" varchar(255),
	"member2_name" varchar(255),
	"email" varchar(256) NOT NULL,
	"instance" varchar(64),
	"role" varchar(6) DEFAULT 'user' NOT NULL,
	"num_phone" varchar(14) NOT NULL,
	"competition_id" varchar(42),
	"workshop_id" varchar(42),
	CONSTRAINT "user_id_unique" UNIQUE("id"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workshop" (
	"id" varchar(40) PRIMARY KEY NOT NULL,
	"payment" varchar(256),
	"status" numeric DEFAULT '0' NOT NULL,
	CONSTRAINT "workshop_id_unique" UNIQUE("id")
);
