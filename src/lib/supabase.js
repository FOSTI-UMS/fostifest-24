import { createClient } from "@supabase/supabase-js";
import { toast } from 'react-toastify';
import { insertCompetitionAction, insertUserAction, insertWorkshopAction } from "./action";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        autoRefreshToken: true,
        storage: typeof window !== 'undefined' ? localStorage : null,
        persistSession: true,
    },
});

async function signIn({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })
    if (error) {
        toast(error.message, { type: "error" })
    }
    return { data, error }
}


async function registerWorkshop(formData) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
        })
        if (error) {
            toast(error.message, { type: "error" })
        } else {
            const userId = (await getCurrentUser()).data.user.id;
            await insertUserAction({
                id: userId,
                leaderName: formData.fullName,
                email: formData.email,
                instance: formData.institution,
                numPhone: formData.phoneNumber,
                workshopId: userId,
            })
            await insertWorkshopAction({ id: userId })
            toast("Pendaftaran Workshop berhasil", { type: "success" })
            router
        }
        return { data, error }
    } catch (error) {
        let message = error.message
        switch (message) {
            case "User already registered":
                message = "Email Pengguna telah digunakan";
            default:
                message = "Terjadi suatu kesalahan";
        }
        toast(message, { type: "error" })
    }

}

async function registerCompetition(formData) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
        })
        if (error) {
            throw new Error();
        } else {
            const userId = (await getCurrentUser()).data.user.id;
            await insertUserAction({
                id: userId,
                leaderName: formData.fullName,
                email: formData.email,
                instance: formData.institution,
                member1Name:formData.member1,
                member2Name:formData.member2,
                numPhone: formData.phoneNumber,
                competitionId: userId,
            })
            await insertCompetitionAction({ id: userId, category: formData.category })
            toast(`Pendaftaran Kompetisi ${formData.category} berhasil`, { type: "success" })
        }
        return { data, error }
    } catch (error) {
        let message = error.message
        switch (message) {
            case "User already registered":
                message = "Email Pengguna telah digunakan";
            default:
                message = "Terjadi suatu kesalahan";
        }
        toast(message, { type: "error" })
    }

}

async function getCurrentUser() {
    const { data, error } = await supabase.auth.getUser()
    console.log(data, error);
    return { data, error }
}
        
export { signIn, registerCompetition, registerWorkshop, getCurrentUser }