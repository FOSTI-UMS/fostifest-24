import React, { useState } from "react";
import CustomButton from "@/components/common/ui/customButton";
import { IconConstants } from "@/constants/iconsConstant";
import Image from "next/image";
import UploadFileModal from "./uploadFileModal";
import { PaymentStatusConstant, StatusStyles } from "@/constants/paymentStatusConstant";
import { uploadPaymentBundleProof } from "@/repositories/supabase";
import LoadingAnimation from "@/components/common/ui/loadingAnimation";
import SuccessModal from "../../common/ui/successModal";
import { UrlConstant } from "@/constants/urlConstant";
import Link from "next/link";
import { useUser } from "@/store/userContext";
import { CategoriesImage, CompetitionCategoriesConstant } from "@/constants/competitionCategoriesConstant";
import UploadBundleFileModal from "./uploadBundleFileModal";

const UploadPaymentBundleBox = ({ onDownload }) => {
  const { user, now, workshopBundle, competitionBundle } = useUser();
  const [showModal, setShowModal] = useState(false);
  const isNotSolo = competitionBundle.category === CompetitionCategoriesConstant.sd && user.member1Name !== null && user.member1Name !== "";
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const secondPresaleStart = new Date("2024-09-09T00:00:00+07:00");

  const handleUpload = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmUpload = async (url) => {
    setIsLoading(true);
    setShowModal(false);
    try {
      await uploadPaymentBundleProof(user.bundle[0], user.bundle[1], url);
      setIsSuccessModalOpen(true);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center space-x-2 text-xl font-semibold mb-3">
        <h1>Paket Bundle: </h1>
        <Image src={CategoriesImage[competitionBundle.category]} alt={competitionBundle.category} className="h-10 max-w-fit" /> <h1>{competitionBundle.category + " "} </h1> <h1> + Workshop</h1>
      </div>
      <div className="space-y-5 bg-gradient-to-tr from-[#191834] to-[#444ca6] rounded-xl md:p-8 p-5">
        <div className="flex items-center justify-start space-x-3">
          <h2 className="font-medium">Status : </h2>
          <p className={`py-2 px-5 rounded-md max-w-fit text-sm cursor-default ${StatusStyles[workshopBundle.status] || "bg-gray-500"}`}>{workshopBundle.status}</p>
        </div>
        <div className="bg-[#0F172A] rounded-xl w-full p-5 overflow-clip">
          <h2 className="text-lg font-semibold mb-4 text-gray-200">Data {isNotSolo ? "Tim" : "Diri"} Anda</h2>
          <table className="w-full text-gray-200 text-sm">
            <tbody>
              <tr>
                <td className="font-semibold pr-2 py-1">{isNotSolo ? "Nama Ketua" : "Nama Lengkap"} </td>
                <td className="py-1">: {user.leaderName}</td>
              </tr>
              {isNotSolo && (
                <>
                  <tr>
                    <td className="font-semibold pr-2 py-1">Nama Anggota 1 </td>
                    <td className="py-1">: {user.member1Name}</td>
                  </tr>
                  {user.member2Name !== null && user.member2Name !== "" && (
                    <tr>
                      <td className="font-semibold pr-2 py-1">Nama Anggota 2 </td>
                      <td className="py-1">: {user.member2Name}</td>
                    </tr>
                  )}
                </>
              )}
              <tr>
                <td className="font-semibold pr-2 py-1">Email </td>
                <td className="py-1">: {user.email}</td>
              </tr>
              {user.instance !== null && user.instance !== "" && (
                <tr>
                  <td className="font-semibold pr-2 py-1">Instansi </td>
                  <td className="py-1">: {user.instance}</td>
                </tr>
              )}
              <tr>
                <td className="font-semibold pr-2 py-1">Nomor Telepon </td>
                <td className="py-1">: {user.numPhone}</td>
              </tr>
            </tbody>
          </table>
          <hr className="my-3" />
          <h2 className="font-medium text-lg">Bukti Pembayaran</h2>
          <p className="text-sm mb-5">Silahkan upload bukti pembayaran.</p>
          {workshopBundle.payment !== null && workshopBundle.payment !== "" && (
            <div className="flex mb-5 space-x-3 items-center">
              <p className="text-sm">Bukti pembayaran: </p>
              <Link className="hover:text-blue-800 underline text-sm" href={UrlConstant.paymentImageUrl + "workshop/" + workshopBundle.payment} target="blank">
                Lihat bukti pembayaran
              </Link>
            </div>
          )}
          <div className="flex space-x-3">
            {workshopBundle.status === PaymentStatusConstant.pendingVerification && (
              <CustomButton
                icon={isLoading ? <LoadingAnimation className={"h-5 w-5"} /> : <Image className="h-[15px] w-[13px]" src={IconConstants.upload} alt="upload" />}
                as="button"
                type={"submit"}
                onClick={!isLoading && handleUpload}
                containerClassName={"m-0 border-main-primary"}
                className={"md:text-sm text-xs px-5 bg-gradient-to-r from-transparent to-transparent text-main-primary"}
                text={"Unggah Bukti Baru"}
              />
            )}
            {workshopBundle.status === PaymentStatusConstant.notPaid && (
              <CustomButton
                icon={isLoading ? <LoadingAnimation className={"h-5 w-5"} /> : <Image className="h-[15px] w-[13px]" src={IconConstants.upload} alt="upload" />}
                as="button"
                type={"submit"}
                onClick={!isLoading && handleUpload}
                containerClassName={"m-0 border-main-primary"}
                className={"md:text-sm text-xs px-5 bg-gradient-to-r from-transparent to-transparent text-main-primary"}
                text={"Unggah"}
              />
            )}
            <CustomButton
              icon={<Image className="h-[19px] w-[19px]" src={IconConstants.download} alt="download" />}
              as="button"
              type={"submit"}
              onClick={onDownload}
              containerClassName={"m-0 border-main-primary"}
              className={"md:text-sm text-xs px-5 bg-gradient-to-r from-transparent to-transparent text-main-primary"}
              text={`Unduh Guidebook ${competitionBundle.category}`}
            />
          </div>
          <hr className="my-3" />

          <div className="flex space-x-3 md:text-base text-sm">
            <p className="font-medium">Total Biaya Pendaftaran: </p>
            {!workshopBundle.presale && <p>Rp 100.000,00</p>}
            {!workshopBundle.presale && <p>Rp 100.000,00</p>}
            {workshopBundle.presale && (
              <p className="">
                <s className="text-gray-400">
                  Rp 100.000,00 <br className="md:hidden block" />{" "}
                </s>{" "}
                {now >= secondPresaleStart ? " Rp 85.000,00" : " Rp 75.000,00"}
              </p>
            )}
          </div>
          {workshopBundle.presale && <p className="text-xs mt-3 text-main-primary">Selamat 🎉 Anda berhasil menjadi salah satu dari 5 pendaftar tercepat dan mendapatkan hak presale!</p>}
        </div>

        {isSuccessModalOpen && (
          <SuccessModal
            message="Anda Berhasil Mengunggah bukti pembayaran! Mohon menunggu verifikasi dari Admin"
            onClose={() => {
              setIsSuccessModalOpen(false);
              window.location.reload();
            }}
          />
        )}

        {showModal && (
          <UploadBundleFileModal
            onClose={handleCloseModal}
            onConfirm={handleConfirmUpload}
            message="Silahkan unggah bukti pembayaran."
            competitionFolder={competitionBundle.category.replaceAll("/", "_") + "/"}
            workshopFolder={""}
            uploadedCompetitionFile={competitionBundle.payment}
            uploadedWorkshopFile={workshopBundle.payment}
          />
        )}
      </div>
    </>
  );
};

export default UploadPaymentBundleBox;
