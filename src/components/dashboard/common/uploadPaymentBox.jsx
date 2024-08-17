import React, { useState } from "react";
import CustomButton from "@/components/common/ui/customButton";
import { IconConstants } from "@/constants/iconsConstant";
import Image from "next/image";
import UploadFileModal from "./uploadFileModal";
import { StatusStyles } from "@/constants/paymentStatusConstant";

const UploadPaymentBox = ({ loading, type, user, onDownload, isSoftwareDevelopment = false, isWorkshop = false }) => {
  const [showModal, setShowModal] = useState(false);
  const isNotSolo = isSoftwareDevelopment && user.member1Name !== null && user.member1Name !== "";

  const handleUpload = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmUpload = () => {
    setShowModal(false);
  };

  return (
    <>
      {!loading && type && (
        <div className="space-y-5 bg-gradient-to-tr from-[#191834] to-[#444ca6] rounded-xl md:p-8 p-5">
          <div className="flex items-center justify-start space-x-3">
            <h2 className="font-medium">Status : </h2>
            <p className={`py-2 px-5 rounded-md max-w-fit text-sm cursor-default ${StatusStyles[type.status] || "bg-gray-500"}`}>{type.status}</p>
          </div>
          <div className="bg-[#0F172A] rounded-xl w-full p-5">
            <h2 className="text-lg font-semibold mb-4 text-gray-200">Data {isNotSolo ? "Tim" : "Diri"} Anda</h2>
            <table className="w-full text-gray-200 text-sm">
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
                {user.instance !== null && user.instance !== "" &&
                <tr>
                  <td className="font-semibold pr-2 py-1">Instansi </td>
                  <td className="py-1">: {user.instance}</td>
                </tr>}
                <tr>
                  <td className="font-semibold pr-2 py-1">Nomor Telepon </td>
                  <td className="py-1">: {user.numPhone}</td>
                </tr>
              </tbody>
            </table>
            <hr className="my-3" />
            <h2 className="font-medium text-lg">Bukti Pembayaran</h2>
            <p className="text-sm mb-5">Silahkan upload bukti pembayaran.</p>
            <div className="flex space-x-3">
              <CustomButton
                icon={<Image className="h-[15px] w-[13px]" src={IconConstants.upload} alt="upload" />}
                as="button"
                type={"submit"}
                onClick={handleUpload}
                containerClassName={"m-0 border-main-primary"}
                className={"md:text-sm text-xs px-5 bg-gradient-to-r from-transparent to-transparent text-main-primary"}
                text={"Unggah"}
              />
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
          </div>
        </div>
      )}

      {showModal && (
        <UploadFileModal
          onClose={handleCloseModal}
          onConfirm={handleConfirmUpload}
          bucket="workshop"
          message="Silahkan unggah bukti pembayaran."
        />
      )}
    </>
  );
};

export default UploadPaymentBox;
