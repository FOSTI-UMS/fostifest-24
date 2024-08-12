"use server";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { userTable, workshopTable, competitionTable } from "@/scheme/scheme";

export const selectUserAction = async (id) => {
  try {
    return await db.select().from(userTable).where(eq(userTable.id, id))
  } catch (error) {
    throw error
  }
}

export const selectWorkshopAction = async (id) => {
  try {
    return await db.select().from(workshopTable).where(eq(workshopTable.id, id))
  } catch (error) {
    throw error
  }
}

export const selectCompetitionAction = async (id) => {
  try {
    return await db.select().from(competitionTable).where(eq(competitionTable.id, id))
  } catch (error) {
    throw error
  }
}

export const insertUserAction = async (data) => {
  try {
    return await db.insert(userTable).values(data);
  } catch (error) {
    throw error
  }
};

export const insertWorkshopAction = async (data) => {
  try {
    return await db.insert(workshopTable).values(data);
  } catch (error) {
    throw error
  }
};

export const insertCompetitionAction = async (data) => {
  try {
    return await db.insert(competitionTable).values(data);
  } catch (error) {
    throw error
  }
};