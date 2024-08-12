import { toast } from 'react-toastify';
import { insertCompetitionAction, insertUserAction, insertWorkshopAction } from "./action";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient()

// async function signOut() {
//     try {
//         await supabase.auth.signOut()
//     } catch (error) {
//         throw error        
//     }
// }

async function signIn({ email, password }) {
    console.log('====================================');
    console.log(email);
    console.log(password);
    console.log('====================================');
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
        options: {
            emailRedirectTo: `${location.origin}/api/auth/callback`
        }
    })

    if (error) {
        let message = error.message;
        switch (message) {
            case "User already registered":
                message = "Email Pengguna telah digunakan";
                break
            case "Password should be at least 6 characters.":
                message = "Password setidaknya harus 6 karakter"
                break
            case "Invalid login credentials":
                message = "Email atau password yang anda masukan salah"
                break
            default:
                message = "Terjadi kesalahan";
        }
        toast(message, { type: "error" })
        throw error
    } else {
        toast(`Selamat datang kembali ${data.user.email}`, { type: "success" })
    }
    return { data, error }
}


async function registerWorkshop(formData) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                emailRedirectTo: `${location.origin}/api/auth/callback`
            }
        })
        if (error) {
            throw error
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
        }
        return { data, error }
    } catch (error) {
        let message = error.message;
        switch (message) {
            case "User already registered":
                message = "Email Pengguna telah digunakan";
                break
            case "Password should be at least 6 characters.":
                message = "Password setidaknya harus 6 karakter"
                break
            default:
                message = "Terjadi kesalahan";
        }
        toast(message, { type: "error" })
    }

}

async function registerCompetition(formData) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                emailRedirectTo: `${location.origin}/api/auth/callback`
            }
        })
        if (error) {
            throw error
        } else {
            const userId = (await getCurrentUser()).data.user.id;
            await insertUserAction({
                id: userId,
                leaderName: formData.fullName,
                email: formData.email,
                instance: formData.institution,
                member1Name: formData.member1,
                member2Name: formData.member2,
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
                break
            case "Password should be at least 6 characters.":
                message = "Password setidaknya harus 6 karakter"
                break
            default:
                message = "Terjadi kesalahan";
        }
        toast(message, { type: "error" })
    }

}

async function getCurrentUser() {
    const { data, error } = await supabase.auth.getUser()
    return { data, error }
}

export { signIn, registerCompetition, registerWorkshop, getCurrentUser }