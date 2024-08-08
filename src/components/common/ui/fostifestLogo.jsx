import { ImageConstants } from "@/constants/imagesConstant";
import Image from "next/image";

const FostifestLogo = ({}) => {
  return (
    <div className="flex gap-2">
      <Image className="object-contain" src={ImageConstants.fostifestLogo2} height={45} width={45} alt="logo-fostifest-footer" />
      <div>
        <h1 className="font-semibold text-sm mb-[-2px]">FOSTIFEST</h1>
        <p className="text-[6px] font-light mb-[-1px]">Forum Open Source</p>
        <p className="text-[6px] font-light mb-[-1px]">Teknik Informatika</p>
        <p className="text-[6px] font-light mb-[-1px]">Festival</p>
      </div>
    </div>
  );
};

export default FostifestLogo;
