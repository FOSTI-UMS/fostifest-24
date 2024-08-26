"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import NotRegisteredCard from "./notRegisteredCard";
import LoadingAnimation from "@/components/common/ui/loadingAnimation";
import { useUser } from "@/store/userContext";
import RegisterModal from "../common/registerModal";
import UploadPaymentBox from "../common/uploadPaymentBox";
import { CompetitionCategoriesConstant } from "@/constants/competitionCategoriesConstant";
import { ImageConstants } from "@/constants/imagesConstant";
import BundlingBox from "../common/bundlingBox";
import RegisterBundleModal from "../common/registerBundleModal";
import UploadPaymentBundleBox from "../common/uploadPaymentBundleBox";

const categories = [
  {
    title: CompetitionCategoriesConstant.cp,
    imageSrc: ImageConstants.py3DLogo,
  },
  {
    title: CompetitionCategoriesConstant.sd,
    imageSrc: ImageConstants.js3DLogo,
  },
  {
    title: CompetitionCategoriesConstant.ud,
    imageSrc: ImageConstants.figma3DLogo,
  },
];

const Workshop = ({}) => {
  const { user, loading, workshop, competitions, competitionBundle } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBundleModalOpen, setIsBundleModalOpen] = useState(false);
  const [competitionList, setCompetitionList] = useState([]);

  useEffect(() => {
    const registeredCategories = new Set(competitions.map((c) => c.category));

    const updatedCompetitionList = categories.map((cat) => ({
      category: cat.title,
      imageSrc: cat.imageSrc,
      isRegistered: registeredCategories.has(cat.title),
    }));

    setCompetitionList(updatedCompetitionList);
  }, [competitions]);

  const openModal = () => {
    setIsBundleModalOpen(true);
  };

  const closeModal = () => {
    setIsBundleModalOpen(false);
  };

  return (
    <div className="md:container">
      <div className="flex items-center space-x-4">
        <Image src={ImageConstants.workshop} alt="workshop-dashboard" height={45} />
        <h1 className="text-2xl font-semibold">Workshop</h1>
      </div>
      <hr className="my-4 border-gray-600 w-full" />
      {loading && <LoadingAnimation />}
      {!loading && user.workshopId === null && <NotRegisteredCard onClick={() => setIsModalOpen(true)} />}
      {!loading && user.workshopId === null && <BundlingBox onClick={() => openModal()} />}
      {!loading && user.bundle === null && <UploadPaymentBox loading={loading} type={workshop} user={user} isWorkshop={true} />}
      {!loading && user.bundle && <UploadPaymentBundleBox />}
      {isModalOpen && <RegisterModal isWorkshop={true} title={"Workshop"} userData={user} onClose={() => setIsModalOpen(false)} category={"workshop"} isRegistered={workshop !== null && (workshop.id === user.id || false)} />}
      {isBundleModalOpen && <RegisterBundleModal onClose={() => closeModal()} />}
    </div>
  );
};

export default Workshop;
