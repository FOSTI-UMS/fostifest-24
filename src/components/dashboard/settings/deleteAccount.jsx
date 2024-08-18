import React, { useState } from "react";
import CustomButton from "@/components/common/ui/customButton";
import DeleteAccountModal from "./deleteAccountConfirmationModal";
import SuccessModal from "@/components/dashboard/common/successModal";
import { useUser } from "@/store/userContext";
import { deleteUserAccount } from "../../../repositories/supabase";
import LoadingAnimation from "@/components/common/ui/loadingAnimation";

const DeleteAccount = () => {
  const { user } = useUser();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!user) return;
    setIsDeleting(true);

    const result = await deleteUserAccount(user.id);
    setIsDeleting(false);
    setIsDeleteModalOpen(false);
    setIsSuccessModalOpen(true);
    window.location.reload("/");
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  return (
    <div className="my-5 border text-red-800 border-red-950 rounded-lg md:p-8 p-3">
      <h2 className="text-xl">Delete Account</h2>
      <hr className="my-4 border-red-950 w-44" />
      <div className="lg:flex-row flex flex-col justify-between lg:space-y-0 space-y-5 lg:items-center items-start">
        <p className="text-gray-400 lg:text-base text-sm lg:w-[70%] w-full">Setelah Anda menghapus akun, keputusan ini tidak bisa diubah. Pastikan Anda benar-benar yakin sebelum melanjutkan.</p>
        <CustomButton
          as="button"
          type={"button"}
          onClick={handleOpenDeleteModal}
          containerClassName={"lg:w-[30%] m-0 border-red-700"}
          text={"Hapus"}
          className={"text-sm px-10 bg-gradient-to-r from-transparent to-transparent text-red-700"}
        />
      </div>
      {isDeleteModalOpen && (
        <DeleteAccountModal
          message={`Untuk menghapus akun Anda, ketik <strong>delete_${user.email}</strong> di bawah ini.`}
          email={user.email}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          loadingAnimation={isDeleting ? <LoadingAnimation /> : null}
        />
      )}
      {isSuccessModalOpen && <SuccessModal message="Akun Anda berhasil dihapus." onClose={handleCloseSuccessModal} />}
      {error && <div className="mt-4 text-red-600">{error}</div>}
    </div>
  );
};

export default DeleteAccount;
