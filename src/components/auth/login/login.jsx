"use client";

import React, { useState } from "react";
import Backround from "../../../../public/images/bg-login.webp";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "@/components/common/ui/customButton";
import { IconConstants } from "@/constants/iconsConstant";
import { useRouter } from "next/navigation";
import LoadingAnimation from "@/components/common/ui/loadingAnimation";
import FostifestLogo from "@/components/common/ui/fostifestLogo";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validate = () => {
    const errors = {};

    if (!email) {
      errors.email = "Email wajib diisi.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email tidak valid.";
    }

    if (!password) {
      errors.password = "Password wajib diisi.";
    } else if (password.length < 6) {
      errors.password = "Password minimal 6 karakter.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const validationErrors = validate();
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        await supabase.auth.signInWithPassword({
          email,
          password,
        })
        router.replace("/dashboard");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="relative w-full lg:w-1/2 bg-black flex flex-col justify-center items-center md:p-8 p-4">
        <div className="absolute md:top-8 top-5 md:left-8 left-4">
          <FostifestLogo logoSize={65} textSize="text-[8px]" titleSize="text-lg" />
        </div>

        <div className="w-full lg:max-w-md sm:max-w-sm md:max-w-lg lg:mt-24 sm:mt-24 md:mt-10">
          <h3 className="text-white text-3xl font-bold mb-6">Selamat Datang</h3>
          <p className="text-white mb-8">
            Belum punya akun?{" "}
            <Link href="/register" className="text-main-primary">
              Daftar
            </Link>
          </p>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className={`relative ${errors.email ? "mb-0" : "mb-6"}`}>
              <input
                className={`w-full p-3 text-sm border-2 ${errors.email ? "border-red-500" : "border-black"} hover:border-main-primary focus:border-main-primary rounded-lg bg-white text-black focus:outline-none pl-3 pt-6`}
                id="email"
                type="email"
                name="email"
                placeholder="youremail@example.com"
                maxLength={250}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="absolute top-4 left-2 font-medium transform -translate-y-1/2 px-1 text-black text-sm">Email</label>
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1 mb-6">{errors.email}</p>}
            <div className={`relative ${errors.password ? "mb-0" : "mb-6"}`}>
              <input
                className={`w-full p-3 text-sm border-2 ${errors.password ? "border-red-500" : "border-black"} hover:border-main-primary focus:border-main-primary rounded-lg bg-white text-black focus:outline-none pl-3 pt-6`}
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="**********"
                value={password}
                maxLength={60}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="absolute top-4 left-2 font-medium transform -translate-y-1/2 px-1 text-black text-sm">Password</label>
              <button type="button" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-main-primary" onClick={togglePasswordVisibility}>
                {passwordVisible ? <Image height={28} src={IconConstants.visiblePass} alt="visible-pass-login" /> : <Image height={28} src={IconConstants.invisiblePass} alt="invisible-pass-login" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1 mb-6">{errors.password}</p>}
            {isLoading ? (
              <CustomButton className={"min-w-full"} containerClassName="min-w-full mb-5 bg-main-tertiary" text={""} icon={<LoadingAnimation />} />
            ) : (
              <CustomButton as="button" type={"submit"} className={"min-w-full"} containerClassName="min-w-full mb-5" text={"Login"} />
            )}
          </form>
        </div>
      </div>

      <div className="p-5 hidden lg:block lg:w-1/2 overflow-hidden bg-black">
        <Image src={Backround} className="w-full h-full bg-cover bg-center rounded-2xl" alt="login-background" />
      </div>
    </div>
  );
};

export default Login;
