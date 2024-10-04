"use server";
import {
  insertCompetitionAction,
  insertUserAction,
  selectUserAction,
  insertWorkshopAction,
  selectCompetitionAction,
  selectWorkshopAction,
  selectUsersAndWorkshopAction,
  selectUsersWAndCompetitionAction,
  updateUserWorkshopId,
  updateCompetitionPayment,
  updateWorkshopPayment,
  updateUserAction,
  updateUserCompetitionIds,
  updateCompetitionStatusAction,
  updateWorkshopStatusAction,
  updateCompetitionConfirmPaymentAction,
  updateWorkshopConfirmPaymentAction,
  updateSubmissionAction,
  deleteUserAccountAction,
  deleteCompetitionsAction,
  deleteUserAction,
  deleteWorkshopsAction,
  selectBundleAction,
} from "../services/action";
import { v4 as uuidv4 } from "uuid";
import { cookies, headers } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { mapToString } from "@/utils/utils";

const cookieStore = cookies();
const headerStore = headers();

const supabase = createServerComponentClient({ cookies: () => cookieStore, headers: () => headerStore });

const getServerTime = async () => {
  try {
    const response = await fetch("https://timeapi.io/api/time/current/zone?timeZone=Asia%2FJakarta");
    const data = await response.json();
    return new Date(data.dateTime);
  } catch (error) {
    return new Date();
  }
};

const updateCompetitionConfirmPayment = async (competitionId) => {
  try {
    const currentDate = await getServerTime();
    const data = await updateCompetitionConfirmPaymentAction(competitionId, currentDate);
    return data;
  } catch (error) {
    throw error;
  }
};

const updateWorkshopConfirmPayment = async (workshopId) => {
  try {
    const currentDate = await getServerTime();
    const data = await updateWorkshopConfirmPaymentAction(workshopId, currentDate);
    return data;
  } catch (error) {
    throw error;
  }
};
const updateCompetitionStatus = async (competitionId) => {
  try {
    const data = await updateCompetitionStatusAction(competitionId);
    return data;
  } catch (error) {
    throw error;
  }
};

const updateWorkshopStatus = async (workshopId) => {
  try {
    const data = await updateWorkshopStatusAction(workshopId);
    return data;
  } catch (error) {
    throw error;
  }
};

const selectUsersAndWorkshop = async () => {
  try {
    const data = await selectUsersAndWorkshopAction();
    return data;
  } catch (error) {
    throw error;
  }
};

const selectUsersAndCompetition = async (category) => {
  try {
    const data = await selectUsersWAndCompetitionAction(category);
    return data;
  } catch (error) {
    throw error;
  }
};

const uploadPaymentProof = async (isWorkshop, id, fileUrl) => {
  try {
    if (isWorkshop) {
      await updateWorkshopPayment(id, fileUrl);
    } else {
      await updateCompetitionPayment(id, fileUrl);
    }
  } catch (error) {
    throw error;
  }
};

const uploadSubmission = async (id, fileUrl) => {
  try {
    await updateSubmissionAction(id, fileUrl);
  } catch (error) {
    throw error;
  }
};

const uploadPaymentBundleProof = async (userId, competitionId, fileUrl, workshopFileUrl) => {
  try {
    await updateWorkshopPayment(userId, workshopFileUrl);
    await updateCompetitionPayment(competitionId, fileUrl);
  } catch (error) {
    throw error;
  }
};

async function deleteUserAccount(userId) {
  try {
    const user = await selectUserAction(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (user.competitionId && user.competitionId.length > 0) {
      await deleteCompetitionsAction(user.competitionId);
    }

    if (user.workshopId) {
      await deleteWorkshopsAction(userId);
    }

    await deleteUserAction(userId);

    await signOut();

    await deleteUserAccountAction();

    return { message: "User account deleted successfully" };
  } catch (error) {
    throw error;
  }
}

async function updateUserData(userId, newData) {
  try {
    if (newData.password !== "") {
      const { error } = await supabase.auth.updateUser({
        password: newData.password,
      });

      if (error) {
        throw new Error(`Auth Failure`);
      }
    }

    await updateUserAction(userId, newData);
  } catch (error) {
    let message = "Gagal memperbaruhi data Anda. Mohon coba lagi!";
    if (error.message.includes("Auth Failure")) {
      throw error;
    } else {
      throw error;
    }
  }
}

async function registerAdditionalWorkshop(currentUser) {
  try {
    const userId = currentUser.data.user.id;
    await updateUserWorkshopId(userId);
    const currentDate = await getServerTime();

    await insertWorkshopAction({ userId, currentDate });
  } catch (error) {
    return { data: null, error };
  }
}

async function registerAdditionalCompetition(isBundle = false, user, category, member1Name, member2Name) {
  try {
    const competitionId = uuidv4().toString();

    await insertCompetitionAction({ id: competitionId, category: category });

    const currentCompetitionIds = user.competitionId || [];

    if (currentCompetitionIds.length >= 3) {
      throw new Error("Anda sudah mendaftar untuk maksimal 3 lomba.");
    }

    let bundle = [];
    if (isBundle) {
      if (user.bundle !== null && user.bundle.length > 0) {
        bundle = user.bundle;
      } else {
        bundle = [user.id, competitionId];
      }
    } else {
      if (user.bundle !== null && user.bundle.length > 0) {
        bundle = user.bundle;
      } else {
        bundle = null;
      }
    }

    const updatedCompetitionIds = [...currentCompetitionIds, competitionId];
    await updateUserCompetitionIds(user.id, updatedCompetitionIds, member1Name, member2Name, bundle);
  } catch (error) {
    return { data: null, error };
  }
}

async function registerBundle(user, category, member1Name, member2Name) {
  try {
    const competitionId = uuidv4().toString();

    await insertCompetitionAction({ id: competitionId, category: category });

    const currentCompetitionIds = user.competitionId || [];

    if (currentCompetitionIds.length >= 3) {
      throw new Error("Anda sudah mendaftar untuk maksimal 3 lomba.");
    }

    const updatedCompetitionIds = [...currentCompetitionIds, competitionId];
    await updateUserCompetitionIds(user.id, updatedCompetitionIds, member1Name, member2Name);

    await updateUserWorkshopId(user.id);
    const currentDate = await getServerTime();

    await insertWorkshopAction({ userId: user.id, currentDate });
  } catch (error) {
    return { data: null, error };
  }
}

async function getWorkshopData(currentUser) {
  try {
    const userId = currentUser.data.user.id;
    const data = await selectWorkshopAction(userId);

    return data;
  } catch (error) {
    throw error;
  }
}

async function getCompetitionDataList(competitionIds) {
  try {
    const data = await selectCompetitionAction(competitionIds);
    return data;
  } catch (error) {
    throw error;
  }
}

async function getBundleDataList(bundleIds) {
  try {
    const data = await selectBundleAction(bundleIds);
    return data;
  } catch (error) {
    throw error;
  }
}

async function getCurrentUserData(currentUser) {
  try {
    const userId = currentUser.data.user.id;
    const data = await selectUserAction(userId);

    return data;
  } catch (error) {
    throw error;
  }
}

async function signOut() {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    throw error;
  }
}

async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/api/auth/callback`,
    },
  });

  console.log(data);
  if (error) {
    let message;
    switch (error.message) {
      case "User already registered":
        message = "Email Pengguna telah digunakan";
        break;
      case "Password should be at least 6 characters.":
        message = "Password setidaknya harus 6 karakter";
        break;
      case "Invalid login credentials":
        message = "Email atau password yang anda masukan salah";
        break;
      default:
        message = "Terjadi kesalahan";
    }
    throw error;
  } else {
  }

  return { data, error };
}

async function signUp(formData, currentUser) {
  try {
    const userId = currentUser.data.user.id;
    console.log(userId);

    await insertUserAction({
      id: userId,
      leaderName: formData.fullName,
      email: formData.email,
      instance: formData.instance,
      numPhone: formData.phoneNumber,
    });
  } catch (error) {
    let message = error.message;
    switch (message) {
      case "User already registered":
        message = "Email Pengguna telah digunakan";
        break;
      case "Password should be at least 6 characters.":
        message = "Password setidaknya harus 6 karakter";
        break;
      default:
        message = "Terjadi kesalahan";
    }
    throw error;
  }
}

async function registerCompetition(formData) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/api/auth/callback`,
      },
    });
    if (error) {
      throw error;
    } else {
      const userId = (await getCurrentUser()).data.user.id;
      const competitionId = uuidv4().toString();
      await insertUserAction({
        id: userId,
        leaderName: formData.fullName,
        email: formData.email,
        instance: formData.instance,
        member1Name: formData.member1,
        member2Name: formData.member2,
        numPhone: formData.phoneNumber,
        competitionId: [competitionId],
      });
      await insertCompetitionAction({ id: competitionId, category: formData.category });
    }
    return { data, error };
  } catch (error) {
    let message = error.message;
    switch (message) {
      case "User already registered":
        message = "Email Pengguna telah digunakan";
        break;
      case "Password should be at least 6 characters.":
        message = "Password setidaknya harus 6 karakter";
        break;
      default:
        message = "Terjadi kesalahan";
    }
    throw error;
  }
}

async function getCurrentUser() {
  try {
    const { data, error } = await supabase.auth.getUser();
    mapToString(data);
    return { data, error };
  } catch (error) {
    throw error;
  }
}

export {
  uploadPaymentBundleProof,
  registerBundle,
  updateCompetitionStatus,
  updateWorkshopStatus,
  selectUsersAndCompetition,
  selectUsersAndWorkshop,
  uploadPaymentProof,
  deleteUserAccount,
  updateUserData,
  registerAdditionalWorkshop,
  signIn,
  registerCompetition,
  getCurrentUser,
  signOut,
  getCurrentUserData,
  getWorkshopData,
  getCompetitionDataList,
  registerAdditionalCompetition,
  getServerTime,
  signUp,
  getBundleDataList,
  updateCompetitionConfirmPayment,
  updateWorkshopConfirmPayment,
  uploadSubmission,
};
