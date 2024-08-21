"use client";
import { useState } from "react";
import { IconConstants } from "@/constants/iconsConstant";
import Image from "next/image";
import NotRegisteredCard from "./notRegisteredCard";
import LoadingAnimation from "@/components/common/ui/loadingAnimation";
import { useUser } from "@/store/userContext";
import RegisterModal from "../common/registerModal";
import UploadPaymentBox from "../common/uploadPaymentBox";

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
      <UploadPaymentBox loading={loading} type={workshop} user={user} isWorkshop={true} />
      {isModalOpen && <RegisterModal isWorkshop={true} title={"Workshop"} userData={user} onClose={() => setIsModalOpen(false)} category={"workshop"} isRegistered={workshop !== null && (workshop.id === user.id || false)} />}
    </div>
  );
};

export default Workshop;
