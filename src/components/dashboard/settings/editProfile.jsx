import React, { useState } from "react";
import CustomButton from "@/components/common/ui/customButton";

const EditProfile = ({}) => {
  const [leaderName, setLeaderName] = useState("");
  const [memberName1, setMemberName1] = useState("");
  const [memberName2, setMemberName2] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [institution, setInstitution] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const errors = {};

    if (!leaderName) {
      errors.leaderName = "Nama Ketua wajib diisi.";
    }

    if (!phoneNumber) {
      errors.phoneNumber = "Nomor Telepon wajib diisi.";
    } else if (!/^\d+$/.test(phoneNumber)) {
      errors.phoneNumber = "Nomor Telepon harus berupa angka.";
    }

    if (!password) {
      errors.password = "Password wajib diisi.";
    } else if (password.length < 3) {
      errors.password = "Password minimal 3 karakter.";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Konfirmasi password wajib diisi.";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Password dan konfirmasi password tidak cocok.";
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
        // TODO: integrate to supabase
    } else {
          // TODO: ERROR HANDLING
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border border-[#3A3F5F] md:p-8 p-3 rounded-xl w-full text-main-primary relative">
      <h2 className="text-xl">Edit Profile</h2>
      <hr className="my-4 border-main-primary w-36" />
      <form className="lg:w-[70%] w-full" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between space-x-6 mb-4">
          <label htmlFor="leaderName" className="text-sm w-[30%]">
            Nama Ketua
          </label>
          <div className="w-[70%]">
            <input
              className={`w-full p-2 text-sm border ${errors.leaderName ? "border-red-900" : "border-black"} hover:border-main-primary focus:border-main-primary rounded-lg bg-[#3A3F5F] text-white focus:outline-none`}
              id="leaderName"
              name="leaderName"
              type="text"
              placeholder="Nama ketua"
              value={leaderName}
              onChange={(e) => setLeaderName(e.target.value)}
            />
            {errors.leaderName && <p className="text-red-700 text-xs mt-1">{errors.leaderName}</p>}
          </div>
        </div>
        <div className="flex items-center justify-between space-x-6 mb-4">
          <label htmlFor="memberName1" className="text-sm w-[30%]">
            Nama Anggota 1
          </label>
          <div className="w-[70%]">
            <input
              className={`w-full p-2 text-sm border ${errors.memberName1 ? "border-red-900" : "border-black"} hover:border-main-primary focus:border-main-primary rounded-lg bg-[#3A3F5F] text-white focus:outline-none`}
              id="memberName1"
              name="memberName1"
              type="text"
              placeholder="Nama anggota 1"
              value={memberName1}
              onChange={(e) => setMemberName1(e.target.value)}
            />
            {errors.memberName1 && <p className="text-red-700 text-xs mt-1">{errors.memberName1}</p>}
          </div>
        </div>
        <div className="flex items-center justify-between space-x-6 mb-4">
          <label htmlFor="memberName2" className="text-sm w-[30%]">
            Nama Anggota 2
          </label>
          <div className="w-[70%]">
            <input
              className="w-full p-2 text-sm border border-black hover:border-main-primary focus:border-main-primary rounded-lg bg-[#3A3F5F] text-white focus:outline-none"
              id="memberName2"
              name="memberName2"
              type="text"
              placeholder="Nama anggota 2"
              value={memberName2}
              onChange={(e) => setMemberName2(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center justify-between space-x-6 mb-4">
          <label htmlFor="phoneNumber" className="text-sm w-[30%]">
            Nomor Telepon
          </label>
          <div className="w-[70%]">
            <input
              className={`w-full p-2 text-sm border ${errors.phoneNumber ? "border-red-900" : "border-black"} hover:border-main-primary focus:border-main-primary rounded-lg bg-[#3A3F5F] text-white focus:outline-none`}
              id="phoneNumber"
              name="phoneNumber"
              type="number"
              placeholder="Nomor telepon"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {errors.phoneNumber && <p className="text-red-700 text-xs mt-1">{errors.phoneNumber}</p>}
          </div>
        </div>
        <div className="flex items-center justify-between space-x-6 mb-4">
          <label htmlFor="institution" className="text-sm w-[30%]">
            Instansi
          </label>
          <div className="w-[70%]">
            <input
              className="w-full p-2 text-sm border border-black hover:border-main-primary focus:border-main-primary rounded-lg bg-[#3A3F5F] text-white focus:outline-none"
              id="institution"
              name="institution"
              type="text"
              placeholder="Instansi"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center justify-between space-x-6 mb-4">
          <label htmlFor="password" className="text-sm w-[30%]">
            Password Baru
          </label>
          <div className="w-[70%]">
            <input
              className={`w-full p-2 text-sm border ${errors.password ? "border-red-900" : "border-black"} hover:border-main-primary focus:border-main-primary rounded-lg bg-[#3A3F5F] text-white focus:outline-none`}
              id="password"
              name="password"
              type="password"
              placeholder="Password baru"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-700 text-xs mt-1">{errors.password}</p>}
          </div>
        </div>
        <div className="flex items-center justify-between space-x-6 mb-4">
          <label htmlFor="confirmPassword" className="text-sm w-[30%]">
            Konfirmasi Password
          </label>
          <div className="w-[70%]">
            <input
              className={`w-full p-2 text-sm border ${errors.confirmPassword ? "border-red-900" : "border-black"} hover:border-main-primary focus:border-main-primary rounded-lg bg-[#3A3F5F] text-white focus:outline-none`}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Konfirmasi password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <p className="text-red-700 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
        </div>
        {isLoading ? <CustomButton className={"text-sm px-10"} containerClassName=" bg-main-tertiary" text={"Mohon tunggu"} /> : <CustomButton as="button" type={"submit"} className={"text-sm px-10"} text={"Simpan"} />}
      </form>
    </div>
  );
};

export default EditProfile;
