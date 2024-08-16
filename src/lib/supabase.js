import { toast } from "react-toastify";
import { updateUserAction, updateUserCompetitionIds, insertCompetitionAction, insertUserAction, insertWorkshopAction, selectUserAction, selectCompetitionAction, selectWorkshopAction, updateUserWorkshopId } from "./action";
import { v4 as uuidv4 } from "uuid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

async function updateUserData(userId, newData) {
  try {
    await updateUserAction(userId, newData);

  } catch (error) {
    if (error.message.includes("Auth Failure")) {
      throw new Error("Auth Failure");
    } else {
      let message = "Terjadi kesalahan saat memperbarui data pengguna";
      toast(message, { type: "error" });
      throw error;
    }
  }
}

async function registerAdditionalWorkshop() {
  try {
    const userId = (await getCurrentUser()).data.user.id;

    await updateUserWorkshopId(userId);

    await insertWorkshopAction({ id: userId });

  } catch (error) {
    toast(error, { type: "error" });
    return { data: null, error };
  }
}
async function registerAdditionalCompetition(user, category, member1Name, member2Name) {
  try {
    const competitionId = uuidv4().toString();

    await insertCompetitionAction({ id: competitionId, category: category });

    const currentCompetitionIds = user.competitionId || [];

    if (currentCompetitionIds.length >= 3) {
      throw new Error("Anda sudah mendaftar untuk maksimal 3 kompetisi.");
    }

    const updatedCompetitionIds = [...currentCompetitionIds, competitionId];

    await updateUserCompetitionIds(user.id, updatedCompetitionIds, member1Name, member2Name);

  } catch (error) {
    toast(error, { type: "error" });
    return { data: null, error };
  }
}

async function getWorkshopData() {
  try {
    const userId = (await getCurrentUser()).data.user.id;
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

async function getCurrentUserData() {
  try {
    const userId = (await getCurrentUser()).data.user.id;
    const data = await selectUserAction(userId);

    return data;
  } catch (error) {
    console.error("Error fetching current user data:", error);
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
      emailRedirectTo: `${location.origin}/api/auth/callback`,
    },
  });

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
    toast(message, { type: "error" });
    throw error;
  } else {
    toast(`Selamat datang kembali ${data.user.email}`, { type: "success" });
  }

  return { data, error };
}

async function registerWorkshop(formData) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    });
    if (error) {
      throw error;
    } else {
      const userId = (await getCurrentUser()).data.user.id;
      await insertUserAction({
        id: userId,
        leaderName: formData.fullName,
        email: formData.email,
        instance: formData.institution,
        numPhone: formData.phoneNumber,
        workshopId: userId,
      });
      await insertWorkshopAction({ id: userId });
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
    toast(message, { type: "error" });
  }
}

async function registerCompetition(formData) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    });
    if (error) {
      throw error;
    } else {
      const userId = (await getCurrentUser()).data.user.id;
      const competitionId = uuidv4().toString();
      console.log("wowowo" + competitionId);
      await insertUserAction({
        id: userId,
        leaderName: formData.fullName,
        email: formData.email,
        instance: formData.institution,
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
    toast(message, { type: "error" });
  }
}

async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  return { data, error };
}

export { updateUserData, registerAdditionalWorkshop, signIn, registerCompetition, registerWorkshop, getCurrentUser, signOut, getCurrentUserData, getWorkshopData, getCompetitionDataList, registerAdditionalCompetition };
