import { CardBody, CardContainer, CardItem } from "@/components/common/ui/threeDCard";
import { HoverBorderGradient } from "@/components/common/ui/hoverBorderGradient";

const NotRegisteredCard = ({href}) => {
  return (
    <CardContainer className="inter-var" containerClassName={"text-start flex justify-start item-start sm:py-0"}>
      <CardBody className=" bg-gradient-to-tr from-[#191834] to-[#444ca6] transition-all duration-300 bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-main-primary/[0.8] border-black/[0.1] w-auto sm:w-[30rem] h-auto md:rounded-3xl rounded-xl p-6 border">
        <CardItem translateZ="50" className="md:text-2xl text-xl font-semibold text-neutral-600 dark:text-white">
          Silahkan Melakukan Pendaftaran Terlebih Dahulu!
        </CardItem>
        <CardItem translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
          <HoverBorderGradient className="px-7 bg-white  text-black font-semibold" href={href} containerClassName="justify-center items-center max-w-fit flex h-12 mt-5 border main-shadow-hover relative rounded-xl">
            <span>Daftar Sekarang</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
          </HoverBorderGradient>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};

export default NotRegisteredCard;
