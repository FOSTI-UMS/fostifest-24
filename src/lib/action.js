"use server";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { userTable, workshopTable, competitionTable } from "@/scheme/scheme";

export const selectUserAction = async (id) => {
  try {
    const data = await db.select().from(userTable).where(eq(userTable.id, id)).limit(1);
    return data[0] || null;
  } catch (error) {
    throw error;
  }
};

export const selectWorkshopAction = async (id) => {
  try {
    const data = await db.select().from(workshopTable).where(eq(workshopTable.id, id)).limit(1);
    return data[0] || null;
  } catch (error) {
    throw error;
  }
};

export const selectCompetitionAction = async (competitionIds) => {
  try {
    const data = await db.select().from(competitionTable).where(competitionIds.includes(competitionTable.id));
    return data;
  } catch (error) {
    throw error;
  }
};

export const insertUserAction = async (data) => {
  try {
    return await db.insert(userTable).values(data);
  } catch (error) {
    throw error;
  }
};

export const insertWorkshopAction = async (data) => {
  try {
    return await db.insert(workshopTable).values(data);
  } catch (error) {
    throw error;
  }
};

export const insertCompetitionAction = async (data) => {
  try {
    return await db.insert(competitionTable).values(data);
  } catch (error) {
    throw error;
  }
};

export const updateUserCompetitionIds = async (userId, competitionIds, member1Name, member2Name) => {
  try {
    return await db.update(userTable).set({ member1Name: member1Name, member2Name: member2Name, competitionId: competitionIds }).where(eq(userTable.id, userId));
  } catch (error) {
    throw error;
  }
};
export const updateUserWorkshopId = async (userId) => {
  try {
    return await db.update(userTable).set({ workshopId: userId }).where(eq(userTable.id, userId));
  } catch (error) {
    throw error;
  }
};
