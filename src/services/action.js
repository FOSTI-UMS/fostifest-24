"use server";
import { eq } from "drizzle-orm";
import { db } from "../lib/db";
import { userTable, workshopTable, competitionTable } from "@/scheme/scheme";

export const selectUserAction = async (id) => {
  const data = await db.select().from(userTable).where(eq(userTable.id, id)).limit(1);
  return data[0] || null;
};

export const selectWorkshopAction = async (id) => {
  const data = await db.select().from(workshopTable).where(eq(workshopTable.id, id)).limit(1);
  return data[0] || null;
};

export const selectCompetitionAction = async (competitionIds) => {
  const results = [];

  for (const id of competitionIds) {
    const data = await db.select().from(competitionTable).where(eq(competitionTable.id, id));

    if (data.length > 0) {
      results.push(data[0]);
    }
  }

  return results;
};

export const insertUserAction = async (data) => {
  return await db.insert(userTable).values(data);
};

export const insertWorkshopAction = async (data) => {
  return await db.insert(workshopTable).values(data);
};

export const insertCompetitionAction = async (data) => {
  return await db.insert(competitionTable).values(data);
};

export const updateUserAction = async (userId, newData) => {
  const currentUserData = await selectUserAction(userId);

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
};

export const updateUserCompetitionIds = async (userId, competitionIds, member1Name, member2Name) => {
  return await db.update(userTable).set({ member1Name: member1Name, member2Name: member2Name, competitionId: competitionIds }).where(eq(userTable.id, userId));
};
export const updateUserWorkshopId = async (userId) => {
  return await db.update(userTable).set({ workshopId: userId }).where(eq(userTable.id, userId));
};

export const deleteUserAction = async (userId) => {
  return await db.delete(userTable).where(eq(userTable.id, userId));
};

export const deleteUserAccountAction = async (userId) => {
  const { error: authError } = await supabase.auth.admin.deleteUser(userId);

  if (authError) {
    throw authError;
  }
};

export const deleteCompetitionsAction = async (competitionIds) => {
  for (const id of competitionIds) {
    await db.delete(competitionTable).where(eq(competitionTable.id, id));
  }
};

export const deleteWorkshopsAction = async (userId) => {
  return await db.delete(workshopTable).where(eq(workshopTable.id, userId));
};
