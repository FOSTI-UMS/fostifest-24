import { CardContainer, CardBody, CardItem } from "@/components/common/ui/threeDCard";
import Image from "next/image";
import { ImageConstants } from "@/constants/imagesConstant";

const EventDetailsSection = () => {
  return (
    <div
      id="event-details"
      className="md:container container-none mx-auto flex flex-col items-center justify-center max-w-6xl  md:rounded-3xl md:px-10 px-5 py-10  mt-[60px]"
    >
      <div className=" relative flex flex-col lg:flex-row items-center justify-center">
        <CardContainer containerClassName="relative justify-center items-center flex lg:w-1/2 md:w-full">
          <CardBody className="relative lg:w-[300px] lg:h-[300px] md:w-[200px] md:h-[200px] w-[180px] h-[180px] overflow-hidden">
            <CardItem className="relative w-full h-full">
              <Image
                src={ImageConstants.fostifestLogo2}
                width={300}
                height={300}
                alt="Event Image"
                className="absolute inset-0 w-full h-full object-cover rounded-lg z-10 shadow-lg"
              />
            </CardItem>
          </CardBody>
          <Image
            src={ImageConstants.fostifestLogo2}
            width={300}
            height={300}
            alt="Event Image Shadow"
            className="rounded-lg -z-10 absolute md:left-[-1/2] -top-5 transform -translate-x-1/3 md:opacity-30 opacity-20 lg:w-[300px] lg:h-[300px] md:w-[200px] md:h-[200px] w-[180px] h-[180px]"
          />
        </CardContainer>

        <div className="w-full lg:w-1/2 mt-8 md:mt-0 text-center lg:text-left">
          <h2 className="md:text-4xl text-3xl font-bold mb-4">About FOSTIFEST</h2>
          <p className="md:text-base text-gray-400 text-sm mb-6 text-justify md:mx-5 lg:mx-0">
            <strong>FOSTIFEST</strong> adalah acara teknologi oleh FOSTI UMS dengan tema
            "Designing the Future: Creative Tech for The Digital Age". Acara
            ini mencakup workshop tentang pembuatan aplikasi chat dengan
            Vue.js, serta kompetisi di keamanan digital, hackathon,
            pemrograman, dan desain UI/UX. Penutup acara meliputi diskusi,
            tanya jawab, dan pengumuman pemenang. FOSTIFEST bertujuan
            meningkatkan keterampilan teknis, mendorong kreativitas, dan
            memperluas peluang karir di teknologi digital.
          </p>
        </div>
      </div>

      {/* Timeline section*/}
      <section className="md:mt-12 mt-5">
        <div className="text-center">
          <h2 className="md:text-4xl text-2xl mb-5 font-bold text-white">
            <span className="text-main-primary">FOSTIFEST</span> Timeline
          </h2>
        </div>
        <div className="flex justify-center">
          <h1 className="md:text-2xl cursor-default md:mt-5  text-xl text-black bg-[#dedede] rounded-2xl md:py-5 py-3 md:px-[80px] px-8">
            Coming Soon!
          </h1>
        </div>
      </section>
    </div>
  );
};

export default EventDetailsSection;
