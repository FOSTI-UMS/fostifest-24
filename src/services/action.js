"use server";
import { eq, isNotNull } from "drizzle-orm";
import { db } from "../lib/db";
import { userTable, workshopTable, competitionTable } from "@/scheme/scheme";
import { PaymentStatusConstant } from "@/constants/paymentStatusConstant";
import { PresaleConstant } from "@/constants/presaleConstant";

export const checkPresaleStatus = async ({ currentDate }) => {
  let presaleStatus = null;

  const now = currentDate;

  const registerStart = new Date(process.env.NEXT_PUBLIC_COUNTDOWN_START_PRESALE1);

  if (now >= registerStart) {
    const presale1Users = await db.select().from(workshopTable).where({ presale: PresaleConstant.presale1 });

    const presale2Users = await db.select().from(workshopTable).where({ presale: PresaleConstant.presale2 });

    if (presale1Users.length < 5) {
      presaleStatus = PresaleConstant.presale1;
    } else if (presale2Users.length < 5) {
      presaleStatus = PresaleConstant.presale2;
    }
  }

  return presaleStatus;
};

export const selectUsersAndWorkshopAction = async () => {
  const data = await db
    .select({
      userId: userTable.id,
      userName: userTable.leaderName,
      userEmail: userTable.email,
      workshopPayment: workshopTable.payment,
      workshopStatus: workshopTable.status,
    })
    .from(userTable)
    .leftJoin(workshopTable, eq(userTable.workshopId, workshopTable.id))
    .where(eq(userTable.role, "user"))
    .where(isNotNull(userTable.workshopId))
    .orderBy(userTable.id);

  return data;
};

export const selectUsersWAndCompetitionAction = async (category) => {
  const competitions = await db
    .select({
      id: competitionTable.id,
      payment: competitionTable.payment,
      status: competitionTable.status,
    })
    .from(competitionTable)
    .where(eq(competitionTable.category, category));

  const competitionIds = competitions.map((comp) => comp.id);

  const users = await db
    .select({
      userId: userTable.id,
      userName: userTable.leaderName,
      member1Name: userTable.member1Name,
      member2Name: userTable.member2Name,
      userEmail: userTable.email,
      competitionId: userTable.competitionId,
    })
    .from(userTable)
    .where(eq(userTable.role, "user"));

  const filteredUsers = users.map((user) => {
    const userCompetitions = user.competitionId ? competitionIds.filter((id) => user.competitionId.includes(id)) : [];

    return {
      ...user,
      competitions: userCompetitions.map((id) => competitions.find((comp) => comp.id === id)),
    };
  });

  return filteredUsers;
};

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

export const selectBundleAction = async (BundleIds) => {
  const results = [];

  for (const id of BundleIds) {
    const data = await db.select().from(workshopTable).where(eq(workshopTable.id, id));

    if (data.length > 0) {
      results.push(data[0]);
    }
  }

  for (const id of BundleIds) {
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

export const insertWorkshopAction = async ({ userId }) => {
  await db.transaction(async (trx) => {
    const existingUsers = await trx.select().from(workshopTable).where(eq(workshopTable.id, userId));

    if (existingUsers.length > 0) {
      throw new Error("User already exists");
    }

    await trx.insert(workshopTable).values({
      id: userId,
    });
  });
};

export const insertCompetitionAction = async (data) => {
  return await db.insert(competitionTable).values(data);
};

export const updateCompetitionConfirmPaymentAction = async (competitionId, currentDate) => {
  return await db.update(competitionTable).set({ status: PaymentStatusConstant.notPaid, updated_at: currentDate }).where(eq(competitionTable.id, competitionId));
};

export const updateWorkshopConfirmPaymentAction = async (workshopId, currentDate) => {
  return await db.update(workshopTable).set({ status: PaymentStatusConstant.notPaid, updated_at: currentDate }).where(eq(workshopTable.id, workshopId));
};

export const updateCompetitionPayment = async (competitionId, paymentUrl) => {
  return await db.update(competitionTable).set({ payment: paymentUrl, status: PaymentStatusConstant.pendingVerification }).where(eq(competitionTable.id, competitionId));
};

export const updateSubmissionAction = async (competitionId, projectUrl) => {
  return await db.update(competitionTable).set({ project: projectUrl }).where(eq(competitionTable.id, competitionId));
};

export const updateCompetitionStatusAction = async (competitionId, presaleStatus) => {
  return await db.update(competitionTable).set({ status: PaymentStatusConstant.paid, presale: presaleStatus }).where(eq(competitionTable.id, competitionId));
};

export const updateWorkshopPayment = async (workshopId, paymentUrl) => {
  return await db.update(workshopTable).set({ payment: paymentUrl, status: PaymentStatusConstant.pendingVerification }).where(eq(workshopTable.id, workshopId));
};

export const updateWorkshopStatusAction = async (workshopId, presaleStatus) => {
  return await db.update(workshopTable).set({ status: PaymentStatusConstant.paid, presale: presaleStatus }).where(eq(workshopTable.id, workshopId));
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

export const updateUserCompetitionIds = async (userId, competitionIds, member1Name, member2Name, bundle) => {
  return await db.update(userTable).set({ member1Name: member1Name, member2Name: member2Name, competitionId: competitionIds, bundle: bundle }).where(eq(userTable.id, userId));
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
