import Image from "next/image";
import { ImageConstants } from "../constants/imagesConstant";
import { HoverBorderGradient } from "@/components/common/ui/hoverBorderGradient";

const NotFound = ({}) => {
  return (
    <div className={"flex flex-col items-center justify-center h-screen overflow-hidden"}>
      <h1 className="text-9xl">404</h1>
      <h3 className="text-xl">Page Not Found</h3>
      <div className="flex mt-4 space-x-2 items-center">
        <p className="text-sm">Powered by</p>
        <Image src={ImageConstants.overlogicLogo} alt={"Overlogic"} width={40} />
      </div>
      <HoverBorderGradient
        href={"/"}
        containerClassName={`justify-center items-center max-w-fit max-h-fit flex h-11 mt-5 main-shadow-hover font-medium relative text-black dark:text-white rounded-xl`}
        className={`px-7 bg-gradient-to-r from-[#2b2c68] to-[#616BDA]`}
      >
        <span className={`text-sm flex items-center`}>Kembali ke Halaman Utama</span>
        <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
      </HoverBorderGradient>
    </div>
  );
};

export default NotFound;
