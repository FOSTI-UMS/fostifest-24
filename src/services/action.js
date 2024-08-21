"use server";
import { and, gte, lte, eq, isNotNull } from "drizzle-orm";
import { db } from "../lib/db";
import { userTable, workshopTable, competitionTable } from "@/scheme/scheme";
import { PaymentStatusConstant } from "@/constants/paymentStatusConstant";

export const checkPresaleStatus = async ({ currentDate }) => {
  let presaleStatus = false;

  const now = currentDate;

  const firstPresaleStart = new Date("2024-08-01T00:00:00+07:00");
  const firstPresaleEnd = new Date("2024-09-07T23:59:59+07:00");
  const secondPresaleStart = new Date("2024-09-09T00:00:00+07:00");
  const secondPresaleEnd = new Date("2024-09-15T23:59:59+07:00");

  if (now >= secondPresaleStart && now <= secondPresaleEnd) {
    const secondPresaleUsers = await db
      .select()
      .from(workshopTable)
      .where(and(
        gte(workshopTable.created_at, secondPresaleStart.toISOString()),
        lte(workshopTable.created_at, secondPresaleEnd.toISOString()),
        eq(workshopTable.status, PaymentStatusConstant.paid)
      ));

    if (secondPresaleUsers.length < 5) {
      presaleStatus = true;
    }
  } else if (now >= firstPresaleStart && now <= firstPresaleEnd) {
    const firstPresaleUsers = await db
      .select()
      .from(workshopTable)
      .where(and(
        gte(workshopTable.created_at, firstPresaleStart.toISOString()),
        lte(workshopTable.created_at, firstPresaleEnd.toISOString()),
        eq(workshopTable.status, PaymentStatusConstant.paid)
      ));

    if (firstPresaleUsers.length < 5) {
      presaleStatus = true;
    }
  }

  return presaleStatus;
};

export const insertUserAndWorkshop = async ({ userId, formData, presaleStatus, currentDate }) => {
  await db.transaction(async (trx) => {
    const existingUsers = await trx.select().from(workshopTable).where(eq(workshopTable.id, userId));

    if (existingUsers.length > 0) {
      throw new Error("Terjadi kesalahan. Mohon coba lagi!");
    }

    await trx.insert(userTable).values({
      id: userId,
      leaderName: formData.fullName,
      email: formData.email,
      instance: formData.instance,
      numPhone: formData.phoneNumber,
      workshopId: userId,
    });

    await trx.insert(workshopTable).values({
      id: userId,
      created_at: currentDate.toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
      presale: presaleStatus,
    });
  });
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
    const userCompetitions = competitionIds.filter((id) => user.competitionId.includes(id));
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

  console.log("TEST BUNDLE: "+ results);

  return results;
};

export const insertUserAction = async (data) => {
  return await db.insert(userTable).values(data);
};

export const insertWorkshopAction = async ({ userId, presaleStatus, currentDate }) => {
  await db.transaction(async (trx) => {
    const existingUsers = await trx.select().from(workshopTable).where(eq(workshopTable.id, userId));

    if (existingUsers.length > 0) {
      throw new Error("User already exists");
    }

    await trx.insert(workshopTable).values({
      id: userId,
      created_at: currentDate.toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
      presale: presaleStatus,
    });
  });
};

export const insertCompetitionAction = async (data) => {
  return await db.insert(competitionTable).values(data);
};

export const updateCompetitionPayment = async (competitionId, paymentUrl) => {
  return await db.update(competitionTable).set({ payment: paymentUrl, status: PaymentStatusConstant.pendingVerification }).where(eq(competitionTable.id, competitionId));
};

export const updateCompetitionStatusAction = async (competitionId) => {
  return await db.update(competitionTable).set({ status: PaymentStatusConstant.paid }).where(eq(competitionTable.id, competitionId));
};

export const updateWorkshopPayment = async (workshopId, paymentUrl) => {
  return await db.update(workshopTable).set({ payment: paymentUrl, status: PaymentStatusConstant.pendingVerification }).where(eq(workshopTable.id, workshopId));
};

export const updateWorkshopStatusAction = async (workshopId) => {
  return await db.update(workshopTable).set({ status: PaymentStatusConstant.paid }).where(eq(workshopTable.id, workshopId));
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
