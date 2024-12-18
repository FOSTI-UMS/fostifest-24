import openWhatsAppPage from "@/app/whatsapp/whatsapp";
import CustomButton from "@/components/common/ui/customButton";
import { MediaPartnerConstant } from "@/constants/mediaPartnerConstant";
import { SponsorConstant } from "@/constants/sponsorConstant";
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
    <div id="partner-ship" className="flex flex-col justify-center items-center mt-[60px]">
      <h1 className="text-4xl font-semibold mb-10">
        <span className="text-main-primary">Our</span> Sponsors
      </h1>
      <div className="p-5 mb-10 gap-x-5 grid md:grid-cols-2 grid-cols-2 justify-between text-center items-center">
        <Image src={SponsorConstant[8]} height={40} alt={SponsorConstant[8]} className="mx-auto object-contain" />
        <Image src={SponsorConstant[4]} height={90} alt={SponsorConstant[4]} className="mx-auto object-contain" />
      </div>
      <div className="p-5 gap-y-10 grid md:grid-cols-4 grid-cols-3 justify-between text-center items-center">
        <Image src={SponsorConstant[2]} height={25} alt={SponsorConstant[2] + " Overlogic ID"} className="mx-auto object-contain" />
        <Image src={SponsorConstant[1]} height={60} alt={SponsorConstant[1]} className="mx-auto object-contain" />
        <Image src={SponsorConstant[0]} height={70} alt={SponsorConstant[0]} className="mx-auto object-contain" />
        <Image src={SponsorConstant[3]} height={70} alt={SponsorConstant[3]} className="mx-auto object-contain" />
        <Image src={SponsorConstant[5]} height={80} alt={SponsorConstant[5]} className="mx-auto object-contain" />
        <Image src={SponsorConstant[6]} height={40} alt={SponsorConstant[6]} className="mx-auto object-contain" />
        <Image src={SponsorConstant[7]} height={65} alt={SponsorConstant[7]} className="mx-auto object-contain" />
        <Image src={SponsorConstant[9]} height={80} alt={SponsorConstant[7]} className="mx-auto object-contain" />
      </div>
      {/* <CustomButton containerClassName={"mt-8 mb-14"} className={"py-3"} onClick={handleOpenWhatsApp} as="submit" type={"button"} text={"Become our sponsor"} /> */}
      <h1 className="text-4xl font-semibold mb-10 mt-8">
        <span className="text-main-primary">Media</span> Partners
      </h1>
      <div className="gap-10 grid md:grid-cols-5 grid-cols-3 justify-between text-center items-center">
        {MediaPartnerConstant.map((item, index) => (
          <Image key={index} src={item} height={75} width={75} alt={item + " Overlogic ID"} className="mx-auto object-contain" />
        ))}
      </div>
    </div>
  );
};

export default PartnerShipSection;
