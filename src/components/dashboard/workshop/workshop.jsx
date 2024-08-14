import { IconConstants } from "@/constants/iconsConstant";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/common/ui/threeDCard";
import { HoverBorderGradient } from "@/components/common/ui/hoverBorderGradient";

const Workshop = ({}) => {
  return (
    <div className="md:container min-h-screen">
      <div className="flex items-center space-x-4">
        <Image src={IconConstants.workshop} alt="workshop-dashboard" height={35} />
        <h1 className="text-2xl font-semibold">Workshop</h1>
      </div>
      <hr className="my-4 border-gray-600 w-full" />
      <CardContainer className="inter-var" containerClassName={"text-start flex justify-start item-start sm:py-0"}>
        <CardBody className=" bg-gradient-to-tr from-[#191834] to-[#444ca6] transition-all duration-300 bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-main-primary/[0.8] border-black/[0.1] w-auto sm:w-[30rem] h-auto md:rounded-3xl rounded-xl p-6 border">
          <CardItem translateZ="50" className="md:text-2xl text-xl font-semibold text-neutral-600 dark:text-white">
            Silahkan Melakukan Pendaftaran Terlebih Dahulu!
          </CardItem>
          <CardItem translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
            <HoverBorderGradient className="px-7 bg-white  text-black font-semibold" href={"/register-workshop"} containerClassName="justify-center items-center max-w-fit flex h-12 mt-5 border main-shadow-hover relative rounded-xl">
              <span>Daftar Sekarang</span>
              <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
            </HoverBorderGradient>
          </CardItem>
        </CardBody>
      </CardContainer>
    </div>
  );
};

export default Workshop;
