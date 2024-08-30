import { CardBody, CardContainer, CardItem } from "@/components/common/ui/threeDCard";
import CustomButton from "@/components/common/ui/customButton";
import Image from "next/image";
import { ImageConstants } from "@/constants/imagesConstant";

const NotRegisteredCard = ({ onClick }) => {
  return (
    <CardContainer className="inter-var" containerClassName={" text-start flex justify-start item-start sm:py-0"}>
      <CardBody className="w-full bg-gradient-to-tr from-[#191834] to-[#444ca6] transition-all duration-300 bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-main-primary/[0.8] border-black/[0.1] sm:w-[30rem] h-auto md:rounded-3xl rounded-xl p-6 border">
        <CardItem translateZ="50" className="space-x-3 mb-3 flex items-center md:text-2xl text-xl font-semibold text-neutral-600 dark:text-white">
          <Image src={ImageConstants.workshop} alt="overlogic universe" className="h-12 w-12" />
          <h1>Workshop</h1>
        </CardItem>
        <CardItem translateZ="50" className="md:text-2xl text-xl font-semibold text-neutral-600 dark:text-white">
          <h1 className="text-lg font-normal">Rp 70.000,00</h1>
        </CardItem>
        <CardItem translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
          <CustomButton as="button" onClick={onClick} text={"Daftar Sekarang"} className="px-7 bg-gradient-to-t from-white to-white  text-black font-semibold" />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};

export default NotRegisteredCard;
