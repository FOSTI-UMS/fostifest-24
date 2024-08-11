import { ImageConstants } from "@/constants/imagesConstant";
import Image from "next/image";
import { CardContainer, CardBody, CardItem } from "@/components/common/ui/threeDCard";
import Link from "next/link";
import { IconConstants } from "@/constants/iconsConstant";
import CustomButton from "@/components/common/ui/customButton";

const linkYT = "https://www.youtube.com/@vipcodestudio";
const channelYT = "VIP CODE STUDIO";

const WorkShopSection = () => {
  return (
    <div id="workshop" className="md:container container-none my-[60px] flex flex-col lg:flex-row lg:pe-8 mb-5 justify-center items-center">
      <CardContainer containerClassName="relative justify-center items-center flex lg:w-1/2 md:w-full">
        <CardBody className="sm:block absolute hidden bottom-[-20px] md:left-[58%] top-8 transform -translate-x-1/2 w-full">
          <CardItem className="bg-main-tertiary bg-opacity-45 rounded-ss-[100px] rounded-ee-[100px] md:rounded-ss-[160px] md:rounded-ee-[120px] lg:h-[450px] lg:w-[450px] md:h-[350px] md:w-[350px] h-[300px] w-[300px]"></CardItem>
        </CardBody>
        <CardBody className="bg-gradient-to-tr from-[#191834] to-[#3d4492] relative rounded-ss-[100px] rounded-ee-[100px] md:rounded-ss-[160px] md:rounded-ee-[120px] overflow-hidden lg:h-[450px] lg:w-[450px] md:h-[350px] md:w-[350px] h-[300px] w-[300px]">
          <Image src={ImageConstants.speaker} alt="speaker" />
          <Link target="blank" href={linkYT} className="flex gap-2 absolute bottom-0 left-0 px-5 py-1 bg-white text-main-primary rounded-se-md">
            <Image src={IconConstants.youtube} width={20} alt="youtube-logo" />
            <p className="font-semibold text-sm">{channelYT}</p>
          </Link>
        </CardBody>
      </CardContainer>
      <div className="flex-col justify-center items-center lg:w-1/2 w-full rounded-2xl md:p-8 p-5 ">
        <h1 className="title-section-span md:text-[2.8rem] text-3xl font-semibold leading-tight">
          Workshop <span className="text-main-primary">Creating</span> a Real-Time Chat <span className="text-main-primary">Application</span> With Vue.js
        </h1>
        <p className="text-gray-400 mt-3 text-justify" data-aos="fade-up">
          Workshop oleh{" "}
          <span className="font-bold">
            Avip Syaifullah <span className="font-normal">yang memiliki channel youtube</span>{" "}
            <Link target="blank" href={linkYT}>
              {channelYT}
            </Link>{" "}
          </span>{" "}
          membahas Framework Vue.js dan pembuatan aplikasi web chatting real-time. Materi mencakup desain responsif dengan CSS Grid atau Tailwind CSS, serta tips optimalisasi performa aplikasi Vue.js. Peserta akan mendapatkan demonstrasi
          praktis pembuatan website secara interaktif.
        </p>
        <CustomButton href={"/register-workshop"} text={"Join Workshop"}/>
      </div>
    </div>
  );
};

export default WorkShopSection;
