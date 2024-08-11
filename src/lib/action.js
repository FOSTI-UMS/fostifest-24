"use server";
import { db } from "./db";
import { userTable, workshopTable, competitionTable } from "@/scheme/scheme";

export const insertUserAction = async (data) => {
  try {
    return await db.insert(userTable).values(data);
  } catch (error) {
    throw new Error(error);
  }
};

export const insertWorkshopAction = async (data) => {
  try {
    return await db.insert(workshopTable).values(data);
  } catch (error) {
    throw new Error(error);
  }
};

export const insertCompetitionAction = async (data) => {
  try {
    return await db.insert(competitionTable).values(data);
  } catch (error) {
    throw new Error(error);
  }
};