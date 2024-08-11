"use client";

import React, { useState } from "react";
import Logo from "../../../../public/images/logo/fostifest.png";
import Backround from "../../../../public/images/bg-login.webp";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "@/components/common/ui/customButton";
import { IconConstants } from "@/constants/iconsConstant";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});

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
    } else if (password.length < 3) {
      errors.password = "Password minimal 3 karakter.";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    console.log("Validation Errors: ", validationErrors);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted successfully!");
      // TODO: Call API
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="relative w-full lg:w-1/2 bg-black flex flex-col justify-center items-center p-8">
        <div className="absolute top-8 left-8">
          <Image src={Logo} alt="Fostifest Logo" className="w-40" />
        </div>

        <div className="w-full lg:max-w-sm sm:max-w-sm md:max-w-lg lg:mt-24 sm:mt-24 md:mt-10">
          <h3 className="text-white text-3xl font-bold mb-6">Selamat Datang</h3>
          <p className="text-white mb-8">
            Belum punya akun?{" "}
            <Link href="/register-competition" className="text-main-primary">
              Daftar Kompetisi
            </Link>{" "}
            atau{" "}
            <Link href="/register-workshop" className="text-main-primary">
              Daftar Workshop
            </Link>
          </p>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className={`relative ${errors.email ? "mb-0": "mb-6"}`}>
              <input
                className={`w-full p-3 text-sm border-2 ${
                  errors.email ? "border-red-500" : "border-black"
                } hover:border-main-primary focus:border-main-primary rounded-lg bg-white text-black focus:outline-none pl-3 pt-6`}
                id="email"
                type="email"
                name="email"
                placeholder="youremail@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="absolute top-4 left-2 font-medium transform -translate-y-1/2 bg-white px-1 text-black text-sm">
                Email
              </label>
            </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 mb-6">{errors.email}</p>
              )}
            <div className={`relative ${errors.password ? "mb-0": "mb-6"}`}>
              <input
                className={`w-full p-3 text-sm border-2 ${
                  errors.password ? "border-red-500" : "border-black"
                } hover:border-main-primary focus:border-main-primary rounded-lg bg-white text-black focus:outline-none pl-3 pt-6`}
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="**********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="absolute top-4 left-2 font-medium transform -translate-y-1/2 bg-white px-1 text-black text-sm">
                Password
              </label>
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-main-primary"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <Image
                    height={28}
                    src={IconConstants.visiblePass}
                    alt="visible-pass-login"
                  />
                ) : (
                  <Image
                    height={28}
                    src={IconConstants.invisiblePass}
                    alt="invisible-pass-login"
                  />
                )}
              </button>
            </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 mb-6">{errors.password}</p>
              )}
            <CustomButton
              as="button"
              type={"submit"}
              className={"min-w-full"}
              containerClassName="min-w-full"
              text={"Login"}   
            />
          </form>
        </div>
      </div>

      <div className="p-5 hidden lg:block lg:w-1/2 overflow-hidden bg-black">
        <Image
          src={Backround}
          className="w-full h-full bg-cover bg-center rounded-2xl"
          alt="login-background"
        />
      </div>
    </div>
  );
};

export default Login;
