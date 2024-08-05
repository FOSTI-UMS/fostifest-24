import { ImageConstants } from "@/constants/images_constant";

const HeaderSection = ({}) => {
  return <div className="min-h-screen bg-center bg-cover" style={{ backgroundImage: `url(${ImageConstants.bgHeader.src})`, filter: "brightness(0.7)" }}></div>;
};

export default HeaderSection;
