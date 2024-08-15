import React, { useRef, useEffect, useState } from "react";
import { CompetitionCategoriesConstant } from "@/constants/competitionCategoriesConstant";
import CustomButton from "@/components/common/ui/customButton";
import ConfirmationModal from "./confirmationModal";
import { registerAdditionalCompetition } from "@/lib/supabase";
import LoadingAnimation from "@/components/common/ui/loadingAnimation";
import { toast } from "react-toastify";

const RegisterModal = ({ title, category, userData, onClose, isRegistered }) => {
  const modalRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [member1Name, setMember1Name] = useState("");
  const [member2Name, setMember2Name] = useState("");
  const [loading, setLoading] = useState(false);

  const isAnyInputFilled = () => {
    return member1Name.trim() !== "" || member2Name.trim() !== "";
  };

  const handleRegister = () => {
    if (category === CompetitionCategoriesConstant.sd) {
      if (isAnyInputFilled()) {
        setModalMessage(`Pastikan data Anda sesuai. Apakah Anda yakin untuk mendaftar pada kategori <strong>${category}</strong>?`);
      } else {
        setModalMessage("Anda belum mengisi nama anggota. Apakah Anda yakin ingin melanjutkan pendaftaran sendiri?");
      }
    } else {
      setModalMessage(`Pastikan data Anda sesuai. Apakah Anda yakin untuk mendaftar pada kategori <strong>${category}</strong>?`);
    }
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setLoading(true);
    const { error } = await registerAdditionalCompetition(category);
    if (error) {
      toast(error.message, { type: "error" });
    } else {
      toast("Pendaftaran kompetisi berhasil!", { type: "success" });
    }

    setLoading(false);
    onClose();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const renderContent = () => {
    if (isRegistered) {
      return (
        <div className="p-6 bg-[#0F172A] rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-200">Data Diri Anda</h3>
          <table className="w-full text-gray-200 text-sm">
            <tbody>
              <tr>
                <td className="font-semibold pr-2 py-1">{category === CompetitionCategoriesConstant.sd ? "Nama Ketua" : "Nama Lengkap"} </td>
                <td className="py-1">: {userData.leaderName}</td>
              </tr>
              {category === CompetitionCategoriesConstant.sd && (
                <>
                  <tr>
                    <td className="font-semibold pr-2 py-1">Nama Anggota 1 </td>
                    <td className="py-1">: {member1Name}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold pr-2 py-1">Nama Anggota 2 </td>
                    <td className="py-1">: {member2Name}</td>
                  </tr>
                </>
              )}
              <tr>
                <td className="font-semibold pr-2 py-1">Email </td>
                <td className="py-1">: {userData.email}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-2 py-1">Instansi </td>
                <td className="py-1">: {userData.instance}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-2 py-1">Nomor Telepon </td>
                <td className="py-1">: {userData.numPhone}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else {
      if (category === CompetitionCategoriesConstant.cp || category === CompetitionCategoriesConstant.ud) {
        return (
          <div className="p-6 bg-[#0F172A] rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Data Diri Anda</h3>
            <table className="w-full text-gray-200 text-sm">
              <tbody>
                <tr>
                  <td className="font-semibold pr-2 py-1">Nama Lengkap </td>
                  <td className="py-1">: {userData.leaderName}</td>
                </tr>
                <tr>
                  <td className="font-semibold pr-2 py-1">Email </td>
                  <td className="py-1">: {userData.email}</td>
                </tr>
                <tr>
                  <td className="font-semibold pr-2 py-1">Instansi </td>
                  <td className="py-1">: {userData.instance}</td>
                </tr>
                <tr>
                  <td className="font-semibold pr-2 py-1">Nomor Telepon </td>
                  <td className="py-1">: {userData.numPhone}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      } else if (category === CompetitionCategoriesConstant.sd) {
        return (
          <div className="p-6 bg-[#0F172A] rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">Nama Anggota 1</label>
              <input
                type="text"
                className="mt-1 px-2 py-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-800 text-gray-100 placeholder-gray-500 transition duration-300 ease-in-out"
                placeholder="Nama Anggota 1"
                value={member1Name}
                onChange={(e) => setMember1Name(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">Nama Anggota 2</label>
              <input
                type="text"
                className="mt-1 px-2 py-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-800 text-gray-100 placeholder-gray-500 transition duration-300 ease-in-out"
                placeholder="Nama Anggota 2"
                value={member2Name}
                onChange={(e) => setMember2Name(e.target.value)}
              />
            </div>
            <hr />
            <div>
              <h3 className="font-bold my-2 text-gray-200">Data Diri Anda</h3>
              <table className="w-full text-gray-200 text-sm">
                <tbody>
                  <tr>
                    <td className="font-medium pr-2 py-1">Nama Ketua </td>
                    <td className="py-1">: {userData.leaderName}</td>
                  </tr>
                  <tr>
                    <td className="font-medium pr-2 py-1">Email </td>
                    <td className="py-1">: {userData.email}</td>
                  </tr>
                  <tr>
                    <td className="font-medium pr-2 py-1">Instansi </td>
                    <td className="py-1">: {userData.instance}</td>
                  </tr>
                  <tr>
                    <td className="font-medium pr-2 py-1">Nomor Telepon </td>
                    <td className="py-1">: {userData.numPhone}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      } else {
        return <p className="text-gray-400">Kategori tidak dikenal.</p>;
      }
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
        <div ref={modalRef} className="relative bg-gradient-to-r from-[#1f2a48] to-[#2b3e6f] p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200">{isRegistered ? title : "Daftar " + title}</h2>
          <div className="mb-6">{renderContent()}</div>
          <div className="flex justify-end space-x-4">
            {!loading && <CustomButton as="button" onClick={onClose} containerClassName={"m-0 border-main-primary"} className={"text-sm px-6 bg-gradient-to-r from-transparent to-transparent text-main-primary"} text={"Kembali"} />}
            {loading && !isRegistered && <CustomButton as="div" containerClassName={"m-0"} className={"text-sm px-10"} text={""} icon={<LoadingAnimation className={"h-6 w-6"} />} />}
            {!loading && !isRegistered && <CustomButton as="button" onClick={handleRegister} containerClassName={"m-0"} className={"text-sm px-6"} text={"Daftar"} />}
          </div>
        </div>
      </div>
      {!loading && showModal && <ConfirmationModal title="Konfirmasi Pendaftaran" message={modalMessage} onConfirm={handleConfirm} onClose={() => setShowModal(false)} />}
    </>
  );
};

export default RegisterModal;
