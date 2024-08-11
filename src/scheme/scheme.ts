import {
    pgTable,
    varchar,
    numeric,
  } from "drizzle-orm/pg-core";
  
  // User Table
  export const userTable = pgTable("user", {
    id: varchar("id", { length: 11 }).primaryKey().unique(),
    leaderName: varchar("leader_name", { length: 255 }).notNull(),
    member1Name: varchar("member1_name", { length: 255 }),
    member2Name: varchar("member2_name", { length: 255 }),
    email: varchar("email", { length: 256 }).unique().notNull(),
    instance: varchar("instance", { length: 64 }),
    role: varchar("role", { length: 6 }).default("user").notNull(),
    numPhone: varchar("num_phone", { length: 14 }).notNull(),
    competitionId: varchar("competition_id", { length: 11 }),
    workshopId: varchar("workshop_id", { length: 11 }),
  });
  
  export type InsertUserType = typeof userTable.$inferInsert;
  export type SelectUserType = typeof userTable.$inferSelect;
  
  // Competition Table
  export const competitionTable = pgTable("competition", {
    id: varchar("id", { length: 11 }).primaryKey().unique(),
    category: varchar("category", { length: 46 }).notNull(),
    payment: varchar("payment", { length: 256 }),
    status: numeric("status").default("0").notNull(),  // Assuming boolean is represented as numeric (0, 1)
  });
  
  export type InsertCompetitionType = typeof competitionTable.$inferInsert;
  export type SelectCompetitionType = typeof competitionTable.$inferSelect;
  
  // Workshop Table
  export const workshopTable = pgTable("workshop", {
    id: varchar("id", { length: 11 }).primaryKey().unique(),
    payment: varchar("payment", { length: 256 }),
    status: numeric("status").default("0").notNull(),  // Assuming boolean is represented as numeric (0, 1)
  });
  
  export type InsertWorkshopType = typeof workshopTable.$inferInsert;
  export type SelectWorkshopType = typeof workshopTable.$inferSelect;
  