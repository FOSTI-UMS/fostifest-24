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
      <div className="gap-3 grid md:grid-cols-4 grid-cols-3 justify-between text-center items-center">
        {MediaPartnerConstant.map((item, index) => (
          <Image key={index} src={item} height={100} width={100} alt={item} className="mx-auto object-contain" />
        ))}
      </div>
    </div>
  );
};

export default PartnerShipSection;
