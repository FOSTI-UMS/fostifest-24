"use client";

import React, { useState } from "react";
import Backround from "../../../../public/images/bg-login.webp";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "@/components/common/ui/customButton";
import { IconConstants } from "@/constants/iconsConstant";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import LoadingAnimation from "@/components/common/ui/loadingAnimation";
import FostifestLogo from "@/components/common/ui/fostifestLogo";
import { signUp } from "@/repositories/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { mapToString } from "@/utils/utils";

const Register = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    instance: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validate = () => {
    const errors = {};

    if (!formData.fullName) {
      errors.fullName = "Nama Lengkap wajib diisi.";
    }

    if (!formData.phoneNumber) {
      errors.phoneNumber = "Nomor Telepon wajib diisi.";
    } else if (formData.phoneNumber.length > 14) {
      errors.phoneNumber = "Nomor Telepon maksimal 14 karakter.";
    } else if (!/^\d+$/.test(formData.phoneNumber)) {
      errors.phoneNumber = "Nomor Telepon tidak vaild.";
    }

    if (!formData.email) {
      errors.email = "Email wajib diisi.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email tidak valid.";
    }

    if (!formData.password) {
      errors.password = "Password wajib diisi.";
    } else if (formData.password.length < 6) {
      errors.password = "Password minimal 6 karakter.";
    } else if (!/[A-Z]/.test(formData.password) || !/[a-z]/.test(formData.password) || !/\d/.test(formData.password)) {
      errors.password = "Password harus terdiri dari huruf besar, huruf kecil, dan angka";
    }

    return errors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          console.log(error);
          throw error;
        } 
        const currentUser = await supabase.auth.getUser();
        mapToString(currentUser)

        await signUp(formData, currentUser);
        router.replace("/dashboard");
      } catch (error) {
        toast("Terjadi Kesalahan", { type: "error" });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="relative w-full lg:w-1/2 bg-black flex flex-col justify-center items-center md:p-8 p-4">
        <div className="absolute md:top-8 top-5 md:left-8 left-4">
          <FostifestLogo logoSize={65} textSize="text-[8px]" titleSize="text-lg" />
        </div>
        <div className="md:h-16 h-[120px]"></div>
        <div className="w-full lg:max-w-md sm:max-w-sm md:max-w-lg lg:mt-20 sm:mt-28 md:mt-10">
          <h3 className="text-white text-3xl font-bold mb-6">Daftarkan Diri Anda!</h3>
          <p className="text-white mb-8">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-main-primary">
              Login
            </Link>{" "}
          </p>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className={`relative ${errors.fullName ? "mb-0" : "mb-6"}`}>
              <input
                className={`text-sm w-full p-3 border-2 ${errors.fullName ? "border-red-500" : "border-black"} hover:border-main-primary focus:border-main-primary rounded-lg bg-white text-black focus:outline-none pl-3 pt-6`}
                id="fullName"
                type="text"
                maxLength={250}
                placeholder="Nama Lengkap Anda"
                value={formData.fullName}
                onChange={handleChange}
              />
              <label className="font-medium absolute top-4 left-2 transform -translate-y-1/2 bg-none px-1 text-black text-sm">Nama Lengkap</label>
              {errors.fullName && <p className="text-red-500 text-xs mt-1 mb-6">{errors.fullName}</p>}
            </div>

            <div className={`relative mb-6`}>
              <input
                className={`text-sm w-full p-3 border-2 ${errors.instance ? "border-red-500" : "border-black"} hover:border-main-primary focus:border-main-primary rounded-lg bg-white text-black focus:outline-none pl-3 pt-6`}
                id="instance"
                type="text"
                maxLength={64}
                placeholder="cth:Universitas Muhammadiyah Surakarta"
                value={formData.instance}
                onChange={handleChange}
              />
              <label className="font-medium absolute top-4 left-2 transform -translate-y-1/2 bg-none px-1 text-black text-sm">Instansi (opsional)</label>
            </div>

            <div className={`relative ${errors.phoneNumber ? "mb-0" : "mb-6"}`}>
              <input
                className={`text-sm w-full p-3 border-2 ${errors.phoneNumber ? "border-red-500" : "border-black"} hover:border-main-primary focus:border-main-primary rounded-lg bg-white text-black focus:outline-none pl-3 pt-6`}
                id="phoneNumber"
                type="number"
                placeholder="cth:081234"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <label className="font-medium absolute top-4 left-2 transform -translate-y-1/2 bg-none px-1 text-black text-sm">Nomor Telepon</label>
              {errors.phoneNumber && <p className="text-red-500 text-xs mt-1 mb-6">{errors.phoneNumber}</p>}
            </div>

            <div className={`relative ${errors.email ? "mb-0" : "mb-6"}`}>
              <input
                className={`text-sm w-full p-3 border-2 ${errors.email ? "border-red-500" : "border-black"} hover:border-main-primary focus:border-main-primary rounded-lg bg-white text-black focus:outline-none pl-3 pt-6`}
                id="email"
                type="email"
                maxLength={250}
                placeholder="contoh@example.com"
                value={formData.email}
                onChange={handleChange}
              />
              <label className="font-medium absolute top-4 left-2 transform -translate-y-1/2 bg-none px-1 text-black text-sm">Email</label>
              {errors.email && <p className="text-red-500 text-xs mt-1 mb-6">{errors.email}</p>}
            </div>

            <div className={`relative ${errors.password ? "mb-0" : "mb-6"}`}>
              <input
                className={`w-full p-3 text-sm border-2 ${errors.password ? "border-red-500" : "border-black"} hover:border-main-primary focus:border-main-primary rounded-lg bg-white text-black focus:outline-none pl-3 pt-6`}
                id="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="**********"
                value={formData.password}
                maxLength={60}
                onChange={handleChange}
              />
              <label className="absolute top-4 left-2 font-medium transform -translate-y-1/2 bg-none px-1 text-black text-sm">Password</label>
              <button type="button" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-main-primary" onClick={togglePasswordVisibility}>
                {passwordVisible ? <Image height={28} src={IconConstants.visiblePass} alt="visible-pass" /> : <Image height={28} src={IconConstants.invisiblePass} alt="invisible-pass" />}
              </button>
              {errors.password && <p className="text-red-500 text-xs mt-1 mb-6">{errors.password}</p>}
            </div>
            {isLoading ? (
              <CustomButton className={"min-w-full"} containerClassName="min-w-full mb-5 bg-main-tertiary" text={""} icon={<LoadingAnimation />} />
            ) : (
              <CustomButton as="button" type={"submit"} className={"min-w-full"} containerClassName="min-w-full mb-5" text={"Register"} />
            )}
          </form>
        </div>
      </div>

      <div className="p-5 hidden lg:block lg:w-1/2 overflow-hidden bg-black">
        <Image src={Backround} className="w-full h-full bg-cover bg-center rounded-2xl" alt="background" />
      </div>
    </div>
  );
};

export default Register;
