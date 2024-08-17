import { createClient } from "@supabase/supabase-js";
import { toast } from "react-toastify";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const deleteFileFromStorage = async (bucketName, fileName) => {
  try {
    const { error } = await supabase.storage.from(bucketName).remove([fileName]);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    toast("Gagal menghapus gambar.", { type: "error" });
  }
};
