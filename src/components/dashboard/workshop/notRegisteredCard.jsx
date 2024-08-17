import { CardBody, CardContainer, CardItem } from "@/components/common/ui/threeDCard";
import CustomButton from "@/components/common/ui/customButton";

const NotRegisteredCard = ({onClick}) => {

  return (
    <CardContainer className="inter-var" containerClassName={"text-start flex justify-start item-start sm:py-0"}>
      <CardBody className=" bg-gradient-to-tr from-[#191834] to-[#444ca6] transition-all duration-300 bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-main-primary/[0.8] border-black/[0.1] w-auto sm:w-[30rem] h-auto md:rounded-3xl rounded-xl p-6 border">
        <CardItem translateZ="50" className="md:text-2xl text-xl font-semibold text-neutral-600 dark:text-white">
          Silahkan Melakukan Pendaftaran Terlebih Dahulu!
        </CardItem>
        <CardItem translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
          <CustomButton as="button" onClick={onClick} text={"Daftar Sekarang"} className="px-7 bg-gradient-to-t from-white to-white  text-black font-semibold" />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};

export default NotRegisteredCard;
