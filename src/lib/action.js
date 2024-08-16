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
    const results = [];

    for (const id of competitionIds) {
      const data = await db.select().from(competitionTable).where(eq(competitionTable.id, id));

      if (data.length > 0) {
        results.push(data[0]);
      }
    }

    return results;
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

export const updateUserAction = async (userId, newData) => {
  const currentUserData = await selectUserAction(userId);

  if (!currentUserData) {
    throw new Error("User not found");
  }
  const updates = {};
  if (newData.leaderName && newData.leaderName !== currentUserData.leaderName) {
    updates.leaderName = newData.leaderName;
  }
  if (newData.member1Name !== currentUserData.member1Name) {
    updates.member1Name = newData.member1Name;
  }
  if (newData.member2Name !== currentUserData.member2Name) {
    updates.member2Name = newData.member2Name;
  }
  if (newData.instance !== currentUserData.instance) {
    updates.instance = newData.instance;
  }
  if (newData.numPhone && newData.numPhone !== currentUserData.numPhone) {
    updates.numPhone = newData.numPhone;
  }

  if (Object.keys(updates).length > 0) {
    return await db.update(userTable).set(updates).where(eq(userTable.id, userId));
  }

  return { message: "No changes detected, no update performed." };
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
