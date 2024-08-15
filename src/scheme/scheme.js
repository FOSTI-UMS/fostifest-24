import {
  pgTable,
  varchar,
  numeric,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";

// Competition Table
export const competitionTable = pgTable("competition", {
  id: varchar("id", { length: 42 }).primaryKey().unique(),
  category: varchar("category", { length: 46 }).notNull(),
  payment: varchar("payment", { length: 256 }),
  status: varchar("status" , { length: 20 }).default("Belum Bayar").notNull(),
});

/** @typedef {typeof competitionTable.$inferInsert} InsertCompetitionType */
/** @typedef {typeof competitionTable.$inferSelect} SelectCompetitionType */

// Workshop Table
export const workshopTable = pgTable("workshop", {
  id: varchar("id", { length: 40 }).primaryKey().unique(),
  payment: varchar("payment", { length: 256 }),
  status: numeric("status").default("0").notNull(),  // Assuming boolean is represented as numeric (0, 1)
});

/** @typedef {typeof workshopTable.$inferInsert} InsertWorkshopType */
/** @typedef {typeof workshopTable.$inferSelect} SelectWorkshopType */

// User Table
export const userTable = pgTable("user", {
  id: varchar("id", { length: 42 }).primaryKey().unique(),
  leaderName: varchar("leader_name", { length: 255 }).notNull(),
  member1Name: varchar("member1_name", { length: 255 }),
  member2Name: varchar("member2_name", { length: 255 }),
  email: varchar("email", { length: 256 }).unique().notNull(),
  instance: varchar("instance", { length: 64 }),
  role: varchar("role", { length: 6 }).default("user").notNull(),
  numPhone: varchar("num_phone", { length: 14 }).notNull(),
  competitionId: varchar("competition_id", { length: 42 }).array(),
  workshopId: varchar("workshop_id", { length: 42 }),
});

/** @typedef {typeof userTable.$inferInsert} InsertUserType */
/** @typedef {typeof userTable.$inferSelect} SelectUserType */
