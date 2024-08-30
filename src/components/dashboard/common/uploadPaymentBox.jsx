import React, { useState, useEffect } from "react";
import CustomButton from "@/components/common/ui/customButton";
import { IconConstants } from "@/constants/iconsConstant";
import Image from "next/image";
import UploadFileModal from "./uploadFileModal";
import { PaymentStatusConstant, StatusStyles } from "@/constants/paymentStatusConstant";
import { getServerTime, updateCompetitionConfirmPayment, updateWorkshopConfirmPayment, uploadPaymentProof, uploadSubmission } from "@/repositories/supabase";
import LoadingAnimation from "@/components/common/ui/loadingAnimation";
import SuccessModal from "../../common/ui/successModal";
import { UrlConstant } from "@/constants/urlConstant";
import Link from "next/link";
import { useUser } from "@/store/userContext";
import ConfirmationModal from "@/components/common/ui/confirmationModal";
import { CompetitionCategoriesConstant } from "@/constants/competitionCategoriesConstant";
import UploadSubmissionModal from "./uploadSubmissionModal";

const UploadPaymentBox = ({ loading, type, user, onDownload, isSoftwareDevelopment = false, isWorkshop = false }) => {
  const { now, workshop, updateEnd, submissionStarted, submissionEnded } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [doPaymentConfirmModal, setDoPaymentConfirmModal] = useState(false);
  const isNotSolo = isSoftwareDevelopment && user.member1Name !== null && user.member1Name !== "";
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [refreshModal, setRefreshModal] = useState(false);
  const [updattingConfirmStatus, setUpdattingConfirmStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    if (type?.updated_at && type.status === PaymentStatusConstant.notPaid) {
      const endTime = new Date(type.updated_at);
      endTime.setHours(endTime.getHours() + 24);

      const updateCountdown = async () => {
        const now = await getServerTime();
        const distance = endTime - now;

        if (distance <= 0) {
          setCountdown("00:00:00");
          clearInterval(timerInterval);
        } else {
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          setCountdown(`${String(hours).padStart(2, "0")}j:${String(minutes).padStart(2, "0")}m:${String(seconds).padStart(2, "0")}d`);
        }
      };

      updateCountdown();
      const timerInterval = setInterval(updateCountdown, 1000);
      return () => clearInterval(timerInterval);
    }
  }, [type]);

  const handleConfirm = async () => {
    setDoPaymentConfirmModal(false);
    setUpdattingConfirmStatus(true);
    if (isWorkshop && workshop) {
      await updateWorkshopConfirmPayment(workshop.id);
    } else {
      if (type) await updateCompetitionConfirmPayment(type.id);
    }
    setUpdattingConfirmStatus(false);
    setRefreshModal(true);
  };

  const handleDoPayment = () => {
    setDoPaymentConfirmModal(true);
  };

  const handleUpload = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUploadSubmission = () => {
    setShowSubmissionModal(true);
  };

  const handleCloseModalSubmission = () => {
    setShowSubmissionModal(false);
  };

  const handleCloseRefreshModal = () => {
    setRefreshModal(false);
    window.location.reload();
  };

  const handleConfirmUpload = async (url) => {
    setShowModal(false);
    setIsLoading(true);
    try {
      await uploadPaymentProof(isWorkshop, type.id, url);
      setIsSuccessModalOpen(true);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmUploadSubmission = async (url) => {
    setShowSubmissionModal(false);
    setIsLoading(true);
    try {
      await uploadSubmission(type.id, url);
      setIsSuccessModalOpen(true);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!loading && type && (
        <div className="space-y-5 bg-gradient-to-tr from-[#191834] to-[#444ca6] rounded-xl md:p-8 p-5">
          <div className="flex items-center justify-start space-x-3">
            <h2 className="font-medium">Status : </h2>
            <p className={`py-2 px-5 rounded-md max-w-fit text-sm cursor-default ${StatusStyles[type.status] || "bg-red-700"}`}>{type.status || PaymentStatusConstant.notPaid}</p>
          </div>
          <div className="bg-[#0F172A] rounded-xl w-full p-5 overflow-clip">
            <h2 className="text-lg font-semibold mb-4 text-gray-200">Data {isNotSolo ? "Tim" : "Diri"} Anda</h2>
            <table className=" text-gray-200 text-sm">
              <tbody>
                <tr>
                  <td className="font-semibold pr-2 py-1">{isNotSolo ? "Nama Ketua" : "Nama Lengkap"} </td>
                  <td className="py-1">: {user.leaderName}</td>
                </tr>
                {isSoftwareDevelopment && isNotSolo && (
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
            <h2 className="font-semibold text-lg">Dokumen</h2>
            <p className="text-sm mb-5">Pastikan dokumen yang Anda berikan benar.</p>
            {type.payment !== null && type.payment !== "" && (
              <div className="flex mb-5 space-x-3 items-center">
                <p className="text-sm">Bukti pembayaran: </p>
                <Link className="hover:text-blue-800 underline text-sm" href={UrlConstant.paymentImageUrl + (isWorkshop ? "workshop/" : "competition/") + type.payment} target="blank">
                  Lihat bukti pembayaran
                </Link>
              </div>
            )}
            {!isWorkshop && type.project !== null && type.project !== "" && (
              <>
                <div className="flex  space-x-3 items-center">
                  <p className="text-sm">Karya Anda: </p>
                  <Link download className="hover:text-blue-800 underline text-sm" href={type.project} target="blank">
                    Lihat karya Anda
                  </Link>
                </div>
                <p className="text-xs text-main-primary mb-5 mt-2">Pasikan Link Google Drive Anda memiliki izin akses!</p>
              </>
            )}
            {type.status === PaymentStatusConstant.notPaid && (
              <div className="mb-5">
                <p className="text-sm font-medium">Mohon lakukan pembayaran!</p>
                <p className="text-sm text-red-500">Waktu Tersisa: {countdown}</p>
              </div>
            )}
            <div className="flex space-x-3">
              {now <= updateEnd && (
                <>
                  {type.status === PaymentStatusConstant.pendingVerification && (
                    <CustomButton
                      icon={isLoading ? <LoadingAnimation className={"h-5 w-5"} /> : <Image className="h-[15px] w-[13px]" src={IconConstants.upload} alt="upload" />}
                      as="button"
                      type={"submit"}
                      onClick={handleUpload}
                      containerClassName={"m-0 border-main-primary"}
                      className={"md:text-sm text-xs px-5"}
                      text={"Unggah Bukti Baru"}
                    />
                  )}
                  {now >= submissionStarted && now <= submissionEnded && type.status === PaymentStatusConstant.paid && type.category !== CompetitionCategoriesConstant.cp && !isWorkshop && type.project && (
                    <CustomButton
                      icon={isLoading ? <LoadingAnimation className={"h-5 w-5"} /> : <Image className="h-[15px] w-[13px]" src={IconConstants.upload} alt="upload" />}
                      as="button"
                      type={"submit"}
                      onClick={handleUploadSubmission}
                      containerClassName={"m-0 border-main-primary"}
                      className={"md:text-sm text-xs px-5"}
                      text={"Unggah Karya Baru"}
                    />
                  )}
                </>
              )}
              {type.status === null && (
                <CustomButton
                  icon={updattingConfirmStatus && <LoadingAnimation className={"h-5 w-5"} />}
                  as="button"
                  type={"submit"}
                  onClick={handleDoPayment}
                  containerClassName={"m-0 border-main-primary"}
                  className={"md:text-sm text-xs px-5"}
                  text={"Bayar Sekarang"}
                />
              )}
              {type.status === PaymentStatusConstant.notPaid && (
                <CustomButton
                  icon={isLoading ? <LoadingAnimation className={"h-5 w-5"} /> : <Image className="h-[15px] w-[13px]" src={IconConstants.upload} alt="upload" />}
                  as="button"
                  type={"submit"}
                  onClick={handleUpload}
                  containerClassName={"m-0 border-main-primary"}
                  className={"md:text-sm text-xs px-5"}
                  text={"Unggah Bukti Pembayaran"}
                />
              )}
              {now >= submissionStarted && now <= submissionEnded && type.status === PaymentStatusConstant.paid && type.category !== CompetitionCategoriesConstant.cp && !isWorkshop && !type.project && (
                <CustomButton
                  icon={<Image className="h-[15px] w-[13px]" src={IconConstants.upload} alt="upload" />}
                  as="button"
                  type={"submit"}
                  onClick={handleUploadSubmission}
                  containerClassName={"m-0 border-main-primary"}
                  className={"md:text-sm text-xs px-5"}
                  text={"Unggah Karya"}
                />
              )}
              {!isWorkshop && (
                <CustomButton
                  icon={<Image className="h-[19px] w-[19px]" src={IconConstants.download} alt="download" />}
                  as="button"
                  type={"submit"}
                  onClick={onDownload}
                  containerClassName={"m-0 border-main-primary"}
                  className={"md:text-sm text-xs px-5 bg-gradient-to-r from-transparent to-transparent text-main-primary"}
                  text={"Unduh Guidebook"}
                />
              )}
            </div>

            {!loading && type.status !== PaymentStatusConstant.paid && <hr className="my-3" />}
            {!loading && type.status !== PaymentStatusConstant.paid && (
              <div className="flex space-x-3 md:text-base text-sm">
                <p className="font-medium">Total Biaya Pendaftaran: </p>
                {!isWorkshop && <p>Rp 40.000,00</p>}
                {isWorkshop && <p>Rp 70.000,00</p>}
              </div>
            )}
            {isWorkshop && type.status === PaymentStatusConstant.paid && <p className="text-xs text-main-primary">Terima kasih sudah berpartisipasi dalam workshop FOSTIFEST! Sampai bertemu pada tanggal 20 Oktober 2024 nanti! 🌟</p>}
            {!isWorkshop && type.status === PaymentStatusConstant.paid && type.category === CompetitionCategoriesConstant.cp && (
              <p className="text-xs text-main-primary mt-3">Terima kasih sudah berpartisipasi pada lomba {type.category} FOSTIFEST! Tetap semangat dan semoga sukses di babak lomba yang dilaksanakan pada tanggal 6 Oktober 2024 nanti! 💪</p>
            )}
            {!isWorkshop && type.status === PaymentStatusConstant.paid && type.category !== CompetitionCategoriesConstant.cp && (
              <p className="text-xs text-main-primary mt-3">Terima kasih sudah berpartisipasi pada lomba {type.category} FOSTIFEST! Mohon untuk pengumpulan karya bisa dilakukan mulai tanggal 2 - 12 Oktober 2024! 🌟</p>
            )}
          </div>
        </div>
      )}

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
        <UploadFileModal
          onClose={handleCloseModal}
          onConfirm={handleConfirmUpload}
          bucket={isWorkshop ? "workshop" : "competition"}
          message="Silahkan unggah bukti pembayaran dengan format .png .jpg atau .jpeg"
          folder={isWorkshop ? "" : type.category.replaceAll("/", "_") + "/"}
          uploadedFile={type.payment}
        />
      )}

      {!isWorkshop && showSubmissionModal && <UploadSubmissionModal onClose={handleCloseModalSubmission} onConfirm={handleConfirmUploadSubmission} loadingAnimation={isLoading ? <LoadingAnimation className={"h-5 w-5"} /> : null} />}

      {doPaymentConfirmModal && (
        <ConfirmationModal
          title="Konfirmasi Pembayaran"
          message={"Apakah Anda yakin ingin melanjutkan pembayaran? Mohon unggah bukti pembayaran dalam waktu <strong style='color:#FA1100'>1 x 24 jam.</strong>"}
          onConfirm={handleConfirm}
          onClose={() => setDoPaymentConfirmModal(false)}
        />
      )}

      {refreshModal && (
        <ConfirmationModal isOnlyConfirm={true} title="Konfirmasi Pembayaran" message={"<strong style='color:#FA1100'>Mohon segera unggah bukti pembayaran Anda dalam waktu 1x24 jam</strong>"} onConfirm={handleCloseRefreshModal} />
      )}
    </>
  );
};

export default UploadPaymentBox;
