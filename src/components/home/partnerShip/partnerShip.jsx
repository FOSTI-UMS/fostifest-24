import openWhatsAppPage from "@/app/whatsapp/whatsapp";
import CustomButton from "@/components/common/ui/customButton";
import { MediaPartnerConstant } from "@/constants/mediaPartnerConstant";
import Image from "next/image";

const PartnerShipSection = ({}) => {
  const handleOpenWhatsApp = () => {
    const formData = {
      name: "",
      instansi: "",
      message: "",
      phoneNumber: "6285945054692",
    };

    openWhatsAppPage(formData);
  };

  return (
    <div id="partner-ship" className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-semibold">
        <span className="text-main-primary">Our</span> Sponsors
      </h1>
      <CustomButton containerClassName={"mt-8 mb-14"} onClick={handleOpenWhatsApp} as="submit" type={"button"} text={"Become our sponsor"} />
      <h1 className="text-4xl font-semibold mb-10">
        <span className="text-main-primary">Media</span> Partners
      </h1>
      <div className="space-x-5 grid grid-cols-4  justify-center text-center items-center">
        {MediaPartnerConstant.map((item, index) => (
          <Image key={index} src={item} height={180} width={180} alt={item} className="mx-auto w-[75px] h-[75px] object-contain" />
        ))}
      </div>
    </div>
  );
};

export default PartnerShipSection;
