import { ImageConstants } from "@/constants/imagesConstant";
import Image from "next/image";

const FostifestLogo = ({textSize = "text-[6px]", titleSize="text-xs", logoSize=40}) => {
  return (
    <div className="flex gap-2">
      <Image className="object-contain" src={ImageConstants.fostifestLogo2} height={logoSize} width={logoSize} alt="logo-fostifest" />
      <div>
        <h1 className={`font-semibold ${titleSize} mb-[-2px]`}>FOSTIFEST</h1>
        <p className={`${textSize} font-light mb-[-1px]`}>Forum Open Source</p>
        <p className={`${textSize} font-light mb-[-1px]`}>Teknik Informatika</p>
        <p className={`${textSize} font-light mb-[-1px]`}>Festival</p>
      </div>
    </div>
  );
};

export default FostifestLogo;
