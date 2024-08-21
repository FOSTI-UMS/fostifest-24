import { PaymentStatusConstant } from "@/constants/paymentStatusConstant";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

// Competition Table
export const competitionTable = pgTable("competition", {
  id: varchar("id", { length: 50 }).primaryKey().unique(),
  category: varchar("category", { length: 50 }).notNull(),
  payment: varchar("payment", { length: 255 }),
  status: varchar("status", { length: 20 }).default(PaymentStatusConstant.notPaid).notNull(),
});

/** @typedef {typeof competitionTable.$inferInsert} InsertCompetitionType */
/** @typedef {typeof competitionTable.$inferSelect} SelectCompetitionType */

// Workshop Table
export const workshopTable = pgTable("workshop", {
  id: varchar("id", { length: 50 }).primaryKey().unique(),
  payment: varchar("payment", { length: 255 }),
  status: varchar("status", { length: 20 }).default(PaymentStatusConstant.notPaid).notNull(),
  presale: boolean("presale").default(false).notNull(),
  created_at: varchar("created_at").notNull(),
});

/** @typedef {typeof workshopTable.$inferInsert} InsertWorkshopType */
/** @typedef {typeof workshopTable.$inferSelect} SelectWorkshopType */

// User Table
export const userTable = pgTable("user", {
  id: varchar("id", { length: 50 }).primaryKey().unique(),
  leaderName: varchar("leader_name", { length: 255 }).notNull(),
  member1Name: varchar("member1_name", { length: 255 }),
  member2Name: varchar("member2_name", { length: 255 }),
  email: varchar("email", { length: 255 }).unique().notNull(),
  instance: varchar("instance", { length: 100 }),
  role: varchar("role", { length: 6 }).default("user").notNull(),
  numPhone: varchar("num_phone", { length: 15 }).notNull(),
  bundle: varchar("bundle", { length: 50 }).array(),
  competitionId: varchar("competition_id", { length: 50 }).array(),
  workshopId: varchar("workshop_id", { length: 50 }),
});

/** @typedef {typeof userTable.$inferInsert} InsertUserType */
/** @typedef {typeof userTable.$inferSelect} SelectUserType */
