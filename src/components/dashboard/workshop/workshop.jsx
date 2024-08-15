"use client";
import { useState } from "react";
import { IconConstants } from "@/constants/iconsConstant";
import Image from "next/image";
import NotRegisteredCard from "./notRegisteredCard";
import LoadingAnimation from "@/components/common/ui/loadingAnimation";
import { useUser } from "@/contexts/userContext";
import { StatusStyles } from "@/constants/paymentStatusConstant";
import CustomButton from "@/components/common/ui/customButton";
import RegisterModal from "../common/registerModal";

const Workshop = ({}) => {
  const { user, loading, workshop } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="md:container">
      <div className="flex items-center space-x-4">
        <Image src={IconConstants.workshop} alt="workshop-dashboard" height={35} />
        <h1 className="text-2xl font-semibold">Workshop</h1>
      </div>
      <hr className="my-4 border-gray-600 w-full" />
      {loading && <LoadingAnimation />}
      {!loading && user.workshopId == null && <NotRegisteredCard onClick={() => setIsModalOpen(true)} />}
      {!loading && user.workshopId != null && (
        <div className="space-y-5 bg-gradient-to-tr from-[#191834] to-[#444ca6] rounded-xl md:p-8 p-5">
          <div className="flex items-center justify-start space-x-3">
            <h2 className="font-medium">Status : </h2>
            <p className={`py-2 px-5 rounded-md max-w-fit text-sm cursor-default ${StatusStyles[workshop.status] || "bg-gray-500"}`}>{workshop.status}</p>
          </div>
          <div className="bg-[#0F172A] rounded-xl w-full p-5">
            <h2 className="text-lg font-semibold mb-4 text-gray-200">Data Diri Anda</h2>
            <table className="w-full text-gray-200 text-sm">
              <tbody>
                <tr>
                  <td className="font-semibold pr-2 py-1">Nama Lengkap </td>
                  <td className="py-1">: {user.leaderName}</td>
                </tr>
                <tr>
                  <td className="font-semibold pr-2 py-1">Email </td>
                  <td className="py-1">: {user.email}</td>
                </tr>
                <tr>
                  <td className="font-semibold pr-2 py-1">Instansi </td>
                  <td className="py-1">: {user.instance}</td>
                </tr>
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
                containerClassName={"m-0 border-main-primary"}
                className={"md:text-sm text-xs px-5 bg-gradient-to-r from-transparent to-transparent text-main-primary"}
                text={"Unggah"}
              />
              <CustomButton
                icon={<Image className="h-[19px] w-[19px]" src={IconConstants.download} alt="download" />}
                as="button"
                type={"submit"}
                containerClassName={"m-0 border-main-primary"}
                className={"md:text-sm text-xs px-5 bg-gradient-to-r from-transparent to-transparent text-main-primary"}
                text={"Unduh Guidebook"}
              />
            </div>
          </div>
        </div>
      )}
      {isModalOpen && <RegisterModal title={"Workshop"} userData={user} onClose={() => setIsModalOpen(false)} category={"workshop"} isRegistered={workshop !== null && (workshop.id === user.id || false)} />}
    </div>
  );
};

export default Workshop;
