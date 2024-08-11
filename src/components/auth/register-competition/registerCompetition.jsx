"use client";

import React, { useState } from "react";
import Logo from "../../../../public/images/logo/fostifest.png";
import Backround from "../../../../public/images/bg-login.webp";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "@/components/common/ui/customButton";
import { IconConstants } from "@/constants/iconsConstant";

const RegisterCompetition = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    institution: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validate = () => {
    const errors = {};

    if (!formData.fullName) {
      errors.fullName = "Nama Lengkap wajib diisi.";
    }

    if (!formData.institution) {
      errors.institution = "Instansi wajib diisi.";
    }

    if (!formData.phoneNumber) {
      errors.phoneNumber = "Nomor Telepon wajib diisi.";
    }

    if (!formData.email) {
      errors.email = "Email wajib diisi.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email tidak valid.";
    }

    if (!formData.password) {
      errors.password = "Password wajib diisi.";
    } else if (formData.password.length < 3) {
      errors.password = "Password minimal 3 karakter.";
    }

    return errors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
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
        <div className="md:h-16 h-[120px]"></div>
        <div className="w-full lg:max-w-md sm:max-w-sm md:max-w-lg lg:mt-20 sm:mt-28 md:mt-10">
          <h3 className="text-white text-3xl font-bold mb-6">Daftar Kompetisi</h3>
          <p className="text-white mb-8">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-main-primary">
              Login
            </Link> atau  <Link href="/register-workshop" className="text-main-primary">
              Daftar Workshop
            </Link>
          </p>

          <form className="w-full" onSubmit={handleSubmit}>
            <div className={`relative mb-6`}>
              <select
                className="text-sm w-full p-3 border-2 hover:border-main-primary focus:border-main-primary border-black rounded-lg bg-white text-black focus:outline-none pl-3 pt-6"
                id="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="Competitive Programming">Competitive Programming</option>
                <option value="Software Development">Software Development</option>
                <option value="UI/UX Design">UI/UX Design</option>
              </select>
              <label className="font-medium absolute top-4 left-2 transform -translate-y-1/2 bg-none px-1 text-black text-sm">
                Kategori
              </label>
              <p className="ms-2 text-sm text-main-primary">Harap pilih kategori terlebih dahulu!</p>
            </div>

            <div className={`relative ${errors.fullName ? "mb-0": "mb-6"}`}>
              <input
                className={`text-sm w-full p-3 border-2 ${
                  errors.fullName ? "border-red-500" : "border-black"
                } hover:border-main-primary focus:border-main-primary rounded-lg bg-white text-black focus:outline-none pl-3 pt-6`}
                id="fullName"
                type="text"
                placeholder={selectedCategory === "Software Development" ? "Nama Ketua" : "Nama Lengkap Anda"}
                value={formData.fullName}
                onChange={handleChange}
              />
              <label className="font-medium absolute top-4 left-2 transform -translate-y-1/2 bg-none px-1 text-black text-sm">
                {selectedCategory === "Software Development" ? "Nama Ketua" : "Nama Lengkap"}
              </label>
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1 mb-6">{errors.fullName}</p>
              )}
            </div>

            {selectedCategory === "Software Development" && (
              <>
                <div className={`relative mb-6`}>
                  <input
                    className={`text-sm w-full p-3 border-2 ${
                      errors.member1 ? "border-red-500" : "border-black"
                    } hover:border-main-primary focus:border-main-primary rounded-lg bg-white text-black focus:outline-none pl-3 pt-6`}
                    id="member1"
                    type="text"
                    placeholder="Nama Anggota 1"
                    value={formData.member1}
                    onChange={handleChange}
                  />
                  <label className="font-medium absolute top-4 left-2 transform -translate-y-1/2 bg-none px-1 text-black text-sm">
                    Nama Anggota 1 (opsional)
                  </label>
                  {errors.member1 && (
                    <p className="text-red-500 text-xs mt-1 mb-6">{errors.member1}</p>
                  )}
                </div>
                <div className={`relative mb-6`}>
                  <input
                    className={`text-sm w-full p-3 border-2 ${
                      errors.member2 ? "border-red-500" : "border-black"
                    } hover:border-main-primary focus:border-main-primary rounded-lg bg-white text-black focus:outline-none pl-3 pt-6`}
                    id="member2"
                    type="text"
                    placeholder="Nama Anggota 2"
                    value={formData.member2}
                    onChange={handleChange}
                  />
                  <label className="font-medium absolute top-4 left-2 transform -translate-y-1/2 bg-none px-1 text-black text-sm">
                    Nama Anggota 2 (opsional)
                  </label>
                  {errors.member2 && (
                    <p className="text-red-500 text-xs mt-1 mb-6">{errors.member2}</p>
                  )}
                </div>
              </>
            )}

            <div className={`relative ${errors.institution ? "mb-0": "mb-6"}`}>
              <input
                className={`text-sm w-full p-3 border-2 ${
                  errors.institution ? "border-red-500" : "border-black"
                } hover:border-main-primary focus:border-main-primary rounded-lg bg-white text-black focus:outline-none pl-3 pt-6`}
                id="institution"
                type="text"
                placeholder="cth: Universitas Muhammadiyah Surakarta"
                value={formData.institution}
                onChange={handleChange}
              />
              <label className="font-medium absolute top-4 left-2 transform -translate-y-1/2 bg-none px-1 text-black text-sm">
                Instansi
              </label>
              {errors.institution && (
                <p className="text-red-500 text-xs mt-1 mb-6">{errors.institution}</p>
              )}
            </div>

            <div className={`relative ${errors.phoneNumber ? "mb-0": "mb-6"}`}>
              <input
                className={`text-sm w-full p-3 border-2 ${
                  errors.phoneNumber ? "border-red-500" : "border-black"
                } hover:border-main-primary focus:border-main-primary rounded-lg bg-white text-black focus:outline-none pl-3 pt-6`}
                id="phoneNumber"
                type="number"
                placeholder="cth: 08123456"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <label className="font-medium absolute top-4 left-2 transform -translate-y-1/2 bg-none px-1 text-black text-sm">
                {selectedCategory === "Software Development" ? "Nomor Telepon Ketua" : "Nomor Telepon"}
              </label>
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1 mb-6">{errors.phoneNumber}</p>
              )}
            </div>

            <div className={`relative ${errors.email ? "mb-0": "mb-6"}`}>
              <input
                className={`text-sm w-full p-3 border-2 ${
                  errors.email ? "border-red-500" : "border-black"
                } hover:border-main-primary focus:border-main-primary rounded-lg bg-white text-black focus:outline-none pl-3 pt-6`}
                id="email"
                type="email"
                placeholder="contoh@example.com"
                value={formData.email}
                onChange={handleChange}
              />
              <label className="font-medium absolute top-4 left-2 transform -translate-y-1/2 bg-none px-1 text-black text-sm">
                {selectedCategory === "Software Development" ? "Email Ketua" : "Email"}
              </label>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 mb-6">{errors.email}</p>
              )}
            </div>

            <div className={`relative ${errors.password ? "mb-0": "mb-6"}`}>
              <input
                className={`w-full p-3 text-sm border-2 ${
                  errors.password ? "border-red-500" : "border-black"
                } hover:border-main-primary focus:border-main-primary rounded-lg bg-white text-black focus:outline-none pl-3 pt-6`}
                id="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="**********"
                value={formData.password}
                onChange={handleChange}
              />
              <label className="absolute top-4 left-2 font-medium transform -translate-y-1/2 bg-none px-1 text-black text-sm">
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
                    alt="visible-pass-register-competition"
                  />
                ) : (
                  <Image
                    height={28}
                    src={IconConstants.invisiblePass}
                    alt="invisible-pass-register-competition"
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
              containerClassName="min-w-full mb-5"
              text={"Register"}
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

export default RegisterCompetition;
