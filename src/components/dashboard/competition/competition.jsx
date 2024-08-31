import { ImageConstants } from "@/constants/imagesConstant";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "../../common/ui/threeDCard";
import { HoverBorderGradient } from "@/components/common/ui/hoverBorderGradient";
import { useUser } from "@/store/userContext";
import { useState, useEffect } from "react";
import RegisterModal from "../common/registerModal";
import { CompetitionCategoriesConstant } from "@/constants/competitionCategoriesConstant";
import UploadPaymentBox from "../common/uploadPaymentBox";
import LoadingAnimation from "@/components/common/ui/loadingAnimation";
import BundlingBox from "../common/bundlingBox";
import RegisterBundleModal from "../common/registerBundleModal";
import UploadPaymentBundleBox from "../common/uploadPaymentBundleBox";
import { signOut } from "@/repositories/supabase";

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

const Competition = () => {
  const { user, workshop, competitions, loading, competitionBundle } = useUser();
  const [competitionList, setCompetitionList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [allRegistered, setAllRegistered] = useState(false);
  const [isBundleModalOpen, setIsBundleModalOpen] = useState(false);

  useEffect(() => {
    const handleSignOut = async () => {
      if (!loading && !user) {
        await signOut();
        window.location.reload();
      }
    };
    handleSignOut();
  }, []);

  useEffect(() => {
    const registeredCategories = new Set(competitions.map((c) => c.category));

    const updatedCompetitionList = categories.map((cat) => ({
      id: competitions.find((c) => c.category === cat.title)?.id,
      payment: competitions.find((c) => c.category === cat.title)?.payment,
      category: cat.title,
      imageSrc: cat.imageSrc,
      isRegistered: registeredCategories.has(cat.title),
      status: competitions.find((c) => c.category === cat.title)?.status,
      project: competitions.find((c) => c.category === cat.title)?.project,
      updated_at: competitions.find((c) => c.category === cat.title)?.updated_at,
    }));

    setCompetitionList(updatedCompetitionList);
    const allRegisteredStatus = updatedCompetitionList.every((item) => item.isRegistered);
    setAllRegistered(allRegisteredStatus);
  }, [competitions]);

  const openModal = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openBundleModal = () => {
    setIsBundleModalOpen(true);
  };

  const closeBundleModal = () => {
    setIsBundleModalOpen(false);
  };

  return (
    <div className="md:container">
      <div className="flex items-center space-x-3">
        <Image src={ImageConstants.competition} alt="competition-dashboard" height={45} />
        <h1 className="text-2xl font-semibold">Competition</h1>
      </div>
      <hr className="my-4 border-gray-600 w-full" />
      {loading && <LoadingAnimation />}
      <div className="flex lg:flex-row flex-col lg:space-x-3 md:space-y-0 space-y-3 justify-start items-start">
        {!loading &&
          competitionList
            .filter((item) => !item.isRegistered)
            .map((item, index, arr) => (
              <CardContainer key={index} className="inter-var" containerClassName={`sm:py-0 md:py-5 lg:py-0 ${arr.length === 1 ? "" : "inline md:w-full w-full lg:w-full"} `}>
                <CardBody className="flex flex-col w-full h-auto bg-gradient-to-tr from-[#191834] to-[#444ca6] transition-all duration-300 bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-main-primary/[0.8] border-black/[0.1] md:rounded-xl rounded-lg md:p-6 p-4 border">
                  <CardItem translateZ="100" className="mt-2 mb-3">
                    <Image src={item.imageSrc} height="1000" width="1000" className="h-16 w-full object-contain rounded-xl" alt={item.category} />
                  </CardItem>
                  <CardItem translateZ="50" className="text-sm font-semibold text-neutral-600 dark:text-white">
                    {item.category}
                  </CardItem>
                  <CardItem translateZ="50" className="text-sm mt-3 font-semibold text-neutral-600 dark:text-white">
                    <h1 className=" font-normal">Rp 40.000,00</h1>
                  </CardItem>
                  <CardItem translateZ="60" className="text-neutral-500 text-sm max-w-sm dark:text-neutral-300">
                    <HoverBorderGradient
                      className="px-7 bg-white text-black font-semibold"
                      as="button"
                      onClick={() => openModal(item.category)}
                      containerClassName="justify-center items-center max-w-fit flex h-10 mt-2 border main-shadow-hover relative rounded-xl"
                    >
                      <span className="text-xs ">Daftar Sekarang</span>
                      <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
                    </HoverBorderGradient>
                  </CardItem>
                </CardBody>
              </CardContainer>
            ))}
      </div>
      {!loading && user.workshopId == null && competitionList.length < 3 && user.bundle === null && <BundlingBox onClick={() => openBundleModal()} />}

      {!loading && user.bundle && <UploadPaymentBundleBox />}

      <div className={`${!allRegistered ? "mt-10" : ""}`}>
        {!loading &&
          competitionList
            .filter((item) => item.isRegistered && (competitionBundle == null || item.id !== competitionBundle.id))
            .map((item, index) => (
              <div key={index} className="mb-5">
                <div className="flex max-w-fit space-x-3 justify-start items-start mb-3">
                  <Image src={item.imageSrc} className="h-14 max-w-fit object-contain rounded-xl" alt={item.category} />
                  <h3 className="font-semibold flex text-xl my-3">{item.category}</h3>
                </div>
                <UploadPaymentBox loading={loading} type={item} user={user} isSoftwareDevelopment={item.category === CompetitionCategoriesConstant.sd} />
              </div>
            ))}
      </div>

      {isBundleModalOpen && <RegisterBundleModal onClose={() => closeBundleModal()} />}
      {isModalOpen && <RegisterModal title={selectedCategory} category={selectedCategory} userData={user} onClose={closeModal} isRegistered={competitionList.find((cat) => cat.category === selectedCategory)?.isRegistered || false} />}
    </div>
  );
};

export default Competition;
