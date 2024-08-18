import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import CustomButton from "@/components/common/ui/customButton";
import { useUser } from "@/store/userContext";
import { CompetitionCategoriesConstant } from "@/constants/competitionCategoriesConstant";
import { updateUserData } from "../../../repositories/supabase";
import LoadingAnimation from "@/components/common/ui/loadingAnimation";
import ConfirmationModal from "@/components/dashboard/common/confirmationModal";
import SuccessModal from "@/components/dashboard/common/successModal";
import { signOut } from "@/repositories/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

const EditProfile = ({}) => {
  const { loading, user, competitions } = useUser();
  const [leaderName, setLeaderName] = useState("");
  const [member1Name, setMember1Name] = useState("");
  const [member2Name, setMember2Name] = useState("");
  const [numPhone, setNumPhone] = useState("");
  const [instance, setInstance] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasSoftwareDevelopmentCategory, setHasSoftwareDevelopmentCategory] = useState(false);

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      setLeaderName(user.leaderName);
      setMember1Name(user.member1Name);
      setMember2Name(user.member2Name);
      setInstance(user.instance);
      setNumPhone(user.numPhone);
      setHasSoftwareDevelopmentCategory(competitions.some((comp) => comp.category === CompetitionCategoriesConstant.sd));
    }
  }, [loading, user, competitions]);

  const validate = () => {
    const errors = {};

    if (!leaderName) {
      errors.leaderName = "Nama Ketua wajib diisi.";
    }

    if (!numPhone) {
      errors.numPhone = "Nomor Telepon wajib diisi.";
    } else if (numPhone.length > 14) {
      errors.numPhone = "Nomor Telepon maksimal 14 karakter.";
    }else if (!/^\d+$/.test(numPhone)) {
      errors.numPhone = "Nomor Telepon tidak vaild.";
    }

    if (password.length > 0 && password.length < 6) {
      errors.password = "Password minimal 6 karakter.";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Password dan konfirmasi password tidak cocok.";
    }

    if (member2Name && !member1Name) {
      errors.member2Name = "Mohon isi anggota 1 terlebih dahulu!";
    }

    return errors;
  };

  const handleOpenConfirmationModal = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsConfirmationModalOpen(true);
    } else {
      toast("Harap perbaiki kesalahan pada formulir", { type: "error" });
    }
  };

  const handleUpdateUserData = async () => {
    setIsLoading(true);
    const pass = password.trim();

    const newData = {
      leaderName,
      member1Name,
      member2Name,
      instance,
      numPhone,
      password: pass,
    };

    try {
      await updateUserData(user.id, newData);
      setIsSuccessModalOpen(true);
    } catch (error) {
    } finally {
      setPassword("");
      setConfirmPassword("");
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsConfirming(true);
    await signOut();
    setIsConfirming(false);
    window.location.reload();
  };

  return (
    <div className="border border-[#3A3F5F] md:p-8 p-3 rounded-xl w-full text-main-primary relative">
      <h2 className="text-xl">Edit Profile</h2>
      <hr className="my-4 border-main-primary w-36" />
      <form className="lg:w-[70%] w-full" onSubmit={handleOpenConfirmationModal}>
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
              maxLength={250}
              value={leaderName}
              onChange={(e) => setLeaderName(e.target.value)}
            />
            {errors.leaderName && <p className="ms-1 text-red-600 text-xs mt-1">{errors.leaderName}</p>}
          </div>
        </div>
        {!loading && hasSoftwareDevelopmentCategory && (
          <>
            <div className="flex items-center justify-between space-x-6 mb-4">
              <label htmlFor="member1Name" className="text-sm w-[30%]">
                Nama Anggota 1
              </label>
              <div className="w-[70%]">
                <input
                  className={`w-full p-2 text-sm border ${errors.member1Name ? "border-red-900" : "border-black"} hover:border-main-primary focus:border-main-primary rounded-lg bg-[#3A3F5F] text-white focus:outline-none`}
                  id="member1Name"
                  name="member1Name"
                  type="text"
                  placeholder="Nama anggota 1"
                  value={member1Name}
                  maxLength={250}
                  onChange={(e) => setMember1Name(e.target.value)}
                />
                {errors.member1Name && <p className="ms-1 text-red-600 text-xs mt-1">{errors.member1Name}</p>}
              </div>
            </div>
            <div className="flex items-center justify-between space-x-6 mb-4">
              <label htmlFor="member2Name" className="text-sm w-[30%]">
                Nama Anggota 2
              </label>
              <div className="w-[70%]">
                <input
                  className={`w-full p-2 text-sm border ${errors.member2Name ? "border-red-900" : "border-black"} hover:border-main-primary focus:border-main-primary rounded-lg bg-[#3A3F5F] text-white focus:outline-none`}
                  id="member2Name"
                  name="member2Name"
                  type="text"
                  placeholder="Nama anggota 2"
                  maxLength={250}
                  value={member2Name}
                  onChange={(e) => setMember2Name(e.target.value)}
                />
                {errors.member2Name && <p className="ms-1 text-red-600 text-xs mt-1">{errors.member2Name}</p>}
              </div>
            </div>
          </>
        )}
        <div className="flex items-center justify-between space-x-6 mb-4">
          <label htmlFor="numPhone" className="text-sm w-[30%]">
            Nomor Telepon
          </label>
          <div className="w-[70%]">
            <input
              className={`w-full p-2 text-sm border ${errors.numPhone ? "border-red-900" : "border-black"} hover:border-main-primary focus:border-main-primary rounded-lg bg-[#3A3F5F] text-white focus:outline-none`}
              id="numPhone"
              name="numPhone"
              type="number"
              placeholder="Nomor telepon"
              value={numPhone}
              onChange={(e) => setNumPhone(e.target.value)}
            />
            {errors.numPhone && <p className="ms-1 text-red-600 text-xs mt-1">{errors.numPhone}</p>}
          </div>
        </div>
        <div className="flex items-center justify-between space-x-6 mb-4">
          <label htmlFor="instance" className="text-sm w-[30%]">
            Instansi
          </label>
          <div className="w-[70%]">
            <input
              className="w-full p-2 text-sm border border-black hover:border-main-primary focus:border-main-primary rounded-lg bg-[#3A3F5F] text-white focus:outline-none"
              id="instance"
              name="instance"
              type="text"
              placeholder="Instansi"
              maxLength={64}
              value={instance}
              onChange={(e) => setInstance(e.target.value)}
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
              maxLength={60}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="ms-1 text-red-600 text-xs mt-1">{errors.password}</p>}
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
              maxLength={60}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <p className="ms-1 text-red-600 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
        </div>

        <div className="mt-8">
          {isLoading ? (
            <CustomButton as="div" containerClassName={"m-0 border-main-primary"} text={""} className={"text-sm px-10 bg-gradient-to-r from-transparent to-transparent text-main-primary"} icon={<LoadingAnimation />} />
          ) : (
            <CustomButton as="button" type={"submit"} containerClassName={"m-0 border-main-primary"} className={"text-sm px-10 bg-gradient-to-r from-transparent to-transparent text-main-primary"} text={"Simpan"} />
          )}
        </div>
      </form>

      {isConfirmationModalOpen && (
        <ConfirmationModal
          title="Konfirmasi Perubahan"
          message="Apakah Anda yakin ingin menyimpan perubahan?"
          onClose={() => setIsConfirmationModalOpen(false)}
          onConfirm={async () => {
            setIsConfirmationModalOpen(false);
            await handleUpdateUserData();
          }}
        />
      )}
      {isSuccessModalOpen && (
        <SuccessModal
          message="Data Anda berhasil diperbarui!"
          onClose={() => {
            setIsSuccessModalOpen(false);
            window.location.reload();
          }}
        />
      )}

      {isLogoutModalOpen && (
        <ConfirmationModal
          loadingAnimation={isConfirming ? <LoadingAnimation className={"h-6 w-6"} /> : null}
          title="Sesi Autentikasi Hilang"
          message="Sesi autentikasi Anda telah hilang. Harap login ulang!"
          className={"bg-gradient-to-br from-red-800 to-red-600"}
          onClose={() => setIsLogoutModalOpen(false)}
          onConfirm={handleLogout}
          confirmText="Logout"
        />
      )}
    </div>
  );
};

export default EditProfile;
