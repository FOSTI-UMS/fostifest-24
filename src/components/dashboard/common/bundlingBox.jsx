import CustomButton from "@/components/common/ui/customButton";
import { CardBody, CardContainer, CardItem } from "@/components/common/ui/threeDCard";
import { ImageConstants } from "@/constants/imagesConstant";
import { useUser } from "@/store/userContext";
import Image from "next/image";

const BundlingBox = ({ onClick }) => {
  const { loading } = useUser();

  return (
    <>
      {!loading && (
        <div className="mb-5">
          <h2 className="text-xl mt-5 font-semibold mb-3">Paket Bundling</h2>
          <CardContainer className="inter-var" containerClassName={"text-start flex justify-start item-start sm:py-0"}>
            <CardBody className=" bg-gradient-to-tr from-[#191834] to-[#444ca6] transition-all duration-300 bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-main-primary/[0.8] border-black/[0.1] w-auto sm:w-[30rem] h-auto md:rounded-3xl rounded-xl p-6 border">
              <CardItem translateZ="50" className="flex space-x-3 md:text-2xl text-xl font-semibold text-neutral-600 dark:text-white">
                <Image src={ImageConstants.bundling} alt="Overlogic Universe" className="h-14 w-14" />
                <h1>Workshop + 1 Kategori Lomba</h1>
              </CardItem>
              <CardItem translateZ="50" className="mt-3 md:text-2xl text-xl font-semibold text-neutral-600 dark:text-white">
                <h1 className="text-lg font-normal"> Hanya Rp 100.000,00 !!!</h1>
              </CardItem>
              <CardItem translateZ="60" className="text-neutral-500 text-sm max-w-sm dark:text-neutral-300">
                <CustomButton as="button" onClick={onClick} text={"Daftar Sekarang"} className="px-7 bg-gradient-to-t from-white to-white  text-black font-semibold" />
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
      )}
    </>
  );
};

export default BundlingBox;
