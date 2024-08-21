import React, { useRef, useState, useEffect } from "react";
import { CompetitionCategoriesConstant } from "@/constants/competitionCategoriesConstant";
import CustomButton from "@/components/common/ui/customButton";
import ConfirmationModal from "../../common/ui/confirmationModal";
import { getPresaleStatus, registerAdditionalCompetition, registerAdditionalWorkshop, updateUserData } from "@/repositories/supabase";
import LoadingAnimation from "@/components/common/ui/loadingAnimation";
import SuccessModal from "../../common/ui/successModal";
import { useUser } from "@/store/userContext";

const RegisterBundleModal = ({ onClose }) => {
  const modalRef = useRef(null);
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [member1Name, setMember1Name] = useState("");
  const [member2Name, setMember2Name] = useState("");
  const [loading, setLoading] = useState(false);
  const [gettingAvailablePresale, setGettingAvailablePresale] = useState(false);
  const [availablePresale, setAvailablePresale] = useState(false);
  const [error, setError] = useState("");
  const [now, setNow] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const secondPresaleStart = new Date("2024-09-09T00:00:00+07:00");
  const [selectedCategory, setSelectedCategory] = useState(CompetitionCategoriesConstant.cp);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  useEffect(() => {
    const fetchPresaleStatus = async () => {
      setGettingAvailablePresale(true);
      const data = await getPresaleStatus();
      setNow(data.currentDate);
      setAvailablePresale(data.presaleStatus);
      setGettingAvailablePresale(false);
    };
    fetchPresaleStatus();
  }, []);

  const isAnyInputFilled = () => {
    return member1Name.trim() !== "" || member2Name.trim() !== "";
  };

  const handleRegister = () => {
    if (selectedCategory === CompetitionCategoriesConstant.sd) {
      if (member2Name.trim() !== "" && member1Name.trim() === "") {
        setError("Mohon isi anggota 1 terlebih dahulu!");
        return;
      }

      if (isAnyInputFilled()) {
        setError("");
        setModalMessage(`Pastikan data Anda sesuai. Apakah Anda yakin untuk mendaftar <strong>paket bundle workshop + ${selectedCategory}</strong>?`);
      } else {
        setError("");
        setModalMessage("Anda belum mengisi nama anggota. Apakah Anda yakin ingin melanjutkan pendaftaran sendiri?");
      }
    } else {
      setError("");
      setModalMessage(`Pastikan data Anda sesuai. Apakah Anda yakin untuk mendaftar <strong>paket bundle workshop + ${selectedCategory}</strong>?`);
    }
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setShowModal(false);
    setLoading(true);

    await registerAdditionalCompetition(user, selectedCategory, user.member1Name !== null && user.member1Name !== "" ? user.member1Name : member1Name, user.member2Name !== null && user.member2Name !== "" ? user.member2Name : member2Name, true);
    await registerAdditionalWorkshop();
    setShowSuccessModal(true);

    setLoading(false);
    setShowModal(false);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    onClose();
    window.location.reload();
  };

  const renderContent = () => {
    return (
      <div className="p-6 bg-[#0F172A] rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Kategori Kompetisi</label>
          <select
            className="mt-1 px-2 py-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-800 text-gray-100 placeholder-gray-500 transition duration-300 ease-in-out"
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value={CompetitionCategoriesConstant.cp}>{CompetitionCategoriesConstant.cp}</option>
            <option value={CompetitionCategoriesConstant.sd}>{CompetitionCategoriesConstant.sd}</option>
            <option value={CompetitionCategoriesConstant.ud}>{CompetitionCategoriesConstant.ud}</option>
          </select>
          <p className="ms-1 mt-1 text-xs text-main-primary">Harap pilih kategori terlebih dahulu!</p>
        </div>
        {selectedCategory === CompetitionCategoriesConstant.sd && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">Nama Anggota 1</label>
              <input
                type="text"
                maxLength={250}
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
                maxLength={250}
                className={`mt-1 px-2 py-3 block w-full border ${
                  error === "" ? "border-gray-300 " : "border-red-500"
                } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-800 text-gray-100 placeholder-gray-500 transition duration-300 ease-in-out`}
                placeholder="Nama Anggota 2"
                value={member2Name}
                onChange={(e) => setMember2Name(e.target.value)}
              />
              {error !== "" && <p className="text-xs ms-1 text-red-600">{error}</p>}
            </div>
          </>
        )}

        <hr />
        <div>
          <h3 className="font-bold my-2 text-gray-200">Data Diri Anda</h3>
          <table className="w-full text-gray-200 text-sm">
            <tbody>
              <tr>
                <td className="font-medium pr-2 py-1">Nama Ketua </td>
                <td className="py-1">: {user.leaderName}</td>
              </tr>
              <tr>
                <td className="font-medium pr-2 py-1">Email </td>
                <td className="py-1">: {user.email}</td>
              </tr>
              {user.instance !== null && user.instance !== "" && (
                <tr>
                  <td className="font-semibold pr-2 py-1">Instansi </td>
                  <td className="py-1">: {user.instance}</td>
                </tr>
              )}
              <tr>
                <td className="font-medium pr-2 py-1">Nomor Telepon </td>
                <td className="py-1">: {user.numPhone}</td>
              </tr>
            </tbody>
          </table>
          <hr className="my-3" />
          <div className="flex space-x-3 text-sm">
            <p className="font-medium">Total Biaya pendaftaran:</p>
            {gettingAvailablePresale && <LoadingAnimation className={"h-5 w-5"} />}
            {!gettingAvailablePresale && (
              <>
                {!availablePresale ? (
                  <p>Rp 130.000,00</p>
                ) : (
                  <p>
                    <s className="text-gray-400">Rp 130.000,00</s> {now >= secondPresaleStart ? "Rp 125.000,00" : "Rp 125.000,00"}
                  </p>
                )}
              </>
            )}
          </div>
          {!gettingAvailablePresale && availablePresale && <p className="text-xs mt-3 text-main-primary">Selamat 🎉 Anda berhasil menjadi salah satu dari 5 pendaftar tercepat dan mendapatkan hak presale!</p>}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
        <div ref={modalRef} className="relative bg-gradient-to-r from-[#1f2a48] to-[#2b3e6f] p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200">Daftar Workshop + {selectedCategory}</h2>
          <div className="mb-6">{renderContent()}</div>
          <div className="flex justify-end space-x-4">
            {!loading && <CustomButton as="button" onClick={onClose} containerClassName={"m-0 border-main-primary"} className={"text-sm px-6 bg-gradient-to-r from-transparent to-transparent text-main-primary"} text={"Kembali"} />}
            {loading && <CustomButton as="div" containerClassName={"m-0"} className={"text-sm px-10"} text={""} icon={<LoadingAnimation className={"h-6 w-6"} />} />}
            {!loading && <CustomButton as="button" onClick={handleRegister} containerClassName={"m-0"} className={"text-sm px-6"} text={"Daftar"} />}
          </div>
          {showModal && <ConfirmationModal message={modalMessage} onConfirm={handleConfirm} onClose={() => setShowModal(false)} />}
        </div>
      </div>
      {showSuccessModal && <SuccessModal message={`Pendaftaran pada <strong>paket bundle workshop + ${selectedCategory}</strong> berhasil!`} onClose={handleSuccessModalClose} />}
    </>
  );
};

export default RegisterBundleModal;
