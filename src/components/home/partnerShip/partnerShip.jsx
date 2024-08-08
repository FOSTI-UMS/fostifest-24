import CustomButton from "@/components/common/ui/customButton";

const PartnerShipSection = ({}) => {
  return (
    <div id="partner-ship" className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-semibold">
        <span className="text-main-primary">Our</span> Sponsors
      </h1>
      <div className="h-5"></div>
      <CustomButton href={"/"} text={"Become our sponsor"}/>
    </div>
  );
};

export default PartnerShipSection;
