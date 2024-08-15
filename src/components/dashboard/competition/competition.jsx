import { IconConstants } from "@/constants/iconsConstant";
import { ImageConstants } from "@/constants/imagesConstant";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "../../common/ui/threeDCard";
import { HoverBorderGradient } from "@/components/common/ui/hoverBorderGradient";
import CustomButton from "@/components/common/ui/customButton";
import { useUser } from "@/contexts/userContext";
import { useState, useEffect } from "react";
import LoadingAnimation from "@/components/common/ui/loadingAnimation";
import { PaymentStatusConstant, StatusStyles } from "@/constants/paymentStatusConstant";

const categories = [
  {
    title: "Competitive Programming",
    imageSrc: ImageConstants.py3DLogo,
  },
  {
    title: "Software Development",
    imageSrc: ImageConstants.js3DLogo,
  },
  {
    title: "UI/UX Design",
    imageSrc: ImageConstants.figma3DLogo,
  },
];

const Competition = () => {
  const { competitions, loading } = useUser();
  const [competitionList, setCompetitionList] = useState([]);

  useEffect(() => {
    const registeredCategories = new Set(competitions.map((c) => c.category));

    const updatedCompetitionList = categories.map((cat) => ({
      category: cat.title,
      imageSrc: cat.imageSrc,
      isRegistered: registeredCategories.has(cat.title),
      status: competitions.find((c) => c.category === cat.title)?.status || PaymentStatusConstant.notPaid,
    }));

    setCompetitionList(updatedCompetitionList);
  }, [competitions]);

  return (
    <div className="md:container">
      <div className="flex items-center space-x-4">
        <Image src={IconConstants.competition} alt="competition-dashboard" height={35} />
        <h1 className="text-2xl font-semibold">Competition</h1>
      </div>
      <hr className="my-4 border-gray-600 w-full" />
      {loading ? <LoadingAnimation /> : <h2 className="text-xl font-semibold md:mb-0 mb-3">Partisipasi dalam Kompetisi</h2>}
      <div className="flex lg:flex-row flex-col lg:space-x-3 lg:space-y-0 space-y-3 justify-start items-start md:mb-0 mb-10">
        {!loading &&
          competitionList.map((item, index) => (
            <CardContainer key={index} className="inter-var" containerClassName={"w-full inline"}>
              <CardBody className="flex flex-col w-full h-auto bg-gradient-to-tr from-[#191834] to-[#444ca6] transition-all duration-300 bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-main-primary/[0.8] border-black/[0.1] md:rounded-xl rounded-lg p-6 border">
                <CardItem translateZ="100" className="mt-2 mb-3">
                  <Image src={item.imageSrc} height="1000" width="1000" className="h-16 w-full object-contain rounded-xl" alt={item.category} />
                </CardItem>
                <CardItem translateZ="50" className="text-sm font-semibold text-neutral-600 dark:text-white">
                  {item.category}
                </CardItem>
                {!item.isRegistered && (
                  <CardItem translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    <HoverBorderGradient
                      className="px-7 bg-white text-black font-semibold"
                      href={"/register-competition"}
                      containerClassName="justify-center items-center max-w-fit flex h-10 mt-5 border main-shadow-hover relative rounded-xl"
                    >
                      <span className="text-xs ">Daftar Sekarang</span>
                      <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
                    </HoverBorderGradient>
                  </CardItem>
                )}
                {item.isRegistered && (
                  <CardItem translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    <HoverBorderGradient className="px-7 text-main-primary font-semibold" containerClassName="cursor-default justify-center items-center max-w-fit flex h-10 mt-5 border main-shadow-hover relative rounded-xl">
                      <span className="text-xs ">Terdaftar</span>
                      <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
                    </HoverBorderGradient>
                  </CardItem>
                )}
              </CardBody>
            </CardContainer>
          ))}
      </div>

      {!loading &&
        competitionList
          .filter((item) => item.isRegistered)
          .map((item, index) => (
            <div key={index} className="mb-5">
              <h3 className="font-semibold text-xl my-3">{item.category}</h3>
              <div className="space-y-5 bg-gradient-to-tr from-[#191834] to-[#444ca6] rounded-xl md:p-8 p-5">
                <div className="flex items-center justify-start space-x-3">
                  <h2 className="font-medium">Status : </h2>
                  <p className={`py-2 px-5 rounded-md max-w-fit text-sm cursor-default ${StatusStyles[item.status] || "bg-gray-500"}`}>{item.status}</p>
                </div>
                <div className="bg-[#0F172A] rounded-xl w-full p-5">
                  <h2 className="font-medium text-lg">Bukti Pembayaran</h2>
                  <p className="text-sm mb-5">Silahkan upload bukti pembayaran.</p>
                  <div className="flex space-x-3">
                    <CustomButton
                      icon={<Image className="h-[15px] w-[13px]" src={IconConstants.upload} alt="upload" />}
                      as="button"
                      type={"submit"}
                      containerClassName={"lg:w-[30%] m-0 border-main-primary"}
                      className={"text-sm px-5 bg-gradient-to-r from-transparent to-transparent text-main-primary"}
                      text={"Unggah"}
                    />
                    <CustomButton
                      icon={<Image className="h-[15px] w-[13px]" src={IconConstants.upload} alt="upload" />}
                      as="button"
                      type={"submit"}
                      containerClassName={"lg:w-[30%] m-0 border-main-primary"}
                      className={"text-sm px-5 bg-gradient-to-r from-transparent to-transparent text-main-primary"}
                      text={"Unduh Guidebook"}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Competition;
