import { CardContainer, CardBody, CardItem } from "@/components/common/ui/threeDCard";
import Image from "next/image";
import { ImageConstants } from "@/constants/imagesConstant";
import { useUser } from "@/store/userContext";

const EventDetailsSection = () => {
  const { sectionRefs } = useUser();

  return (
    <section ref={sectionRefs.eventDetails} id="event-details" className="md:container container-none mx-auto flex flex-col items-center justify-center max-w-6xl  md:rounded-3xl md:px-10 px-5 py-10  mt-[50px]">
      <div className=" relative flex flex-col lg:flex-row items-center justify-center">
        <CardContainer containerClassName="relative justify-center items-center flex lg:w-1/2 md:w-full">
          <CardBody className="relative lg:w-[300px] lg:h-[300px] md:w-[200px] md:h-[200px] w-[180px] h-[180px] overflow-hidden">
            <CardItem className="relative w-full h-full">
              <Image src={ImageConstants.fostifestLogo2} width={300} height={300} alt="Fostifest Overlogic" className="absolute inset-0 w-full h-full object-cover rounded-lg z-10 shadow-lg" />
            </CardItem>
          </CardBody>
          <Image
            src={ImageConstants.fostifestLogo2}
            width={300}
            height={300}
            alt="Fostifest Overlogic Shadow"
            className="rounded-lg -z-10 absolute md:left-[-1/2] -top-5 transform -translate-x-1/3 md:opacity-30 opacity-20 lg:w-[300px] lg:h-[300px] md:w-[200px] md:h-[200px] w-[180px] h-[180px]"
          />
        </CardContainer>

        <div className="w-full lg:w-1/2 mt-8 md:mt-0 text-center lg:text-left">
          <h2 className="md:text-4xl text-3xl font-bold mb-4">About FOSTIFEST</h2>
          <p className="md:text-base text-gray-300 text-sm mb-6 text-justify md:mx-5 lg:mx-0">
            <strong>FOSTIFEST</strong> adalah kegiatan tahunan yang diselenggarakan oleh Forum Open Source Teknik Informatika (FOSTI) UMS. FOSTIFEST 2024 mengusung tema &quot;Designing the Future: Creative Tech for The Digital Age&quot;.
            Acara ini mencakup workshop tentang pembuatan aplikasi chat dengan Vue.js, serta kompetisi pada kategori Competitive Programming, Software Development dan UI/UX Design. FOSTIFEST bertujuan meningkatkan keterampilan teknis,
            mendorong kreativitas, dan memperluas peluang karir di teknologi digital.
          </p>
        </div>
      </div>

      <section className="md:mt-12 mt-5">
        <div className="text-center">
          <h2 className="md:text-4xl text-2xl mb-5 font-bold text-white">
            <span className="text-main-primary">FOSTIFEST</span> Timeline
          </h2>
        </div>
        {/* <h1 className="md:text-2xl cursor-default md:mt-5 select-none text-xl text-black bg-[#dedede] rounded-2xl md:py-5 py-3 md:px-[80px] px-8">Coming Soon!</h1> */}
        <CardContainer className="flex justify-center max-w-fit">
          <CardItem className="w-full h-full object-contain rounded-lg border border-gray-600">
            <CardBody className={"w-full h-full object-contain rounded-lg border border-gray-600"}>
              <Image src={ImageConstants.fostifestTimeline} alt="Overlogic Fosti Fostifest" className="w-full h-full object-contain rounded-lg border border-gray-600" />
            </CardBody>
          </CardItem>
        </CardContainer>
      </section>
    </section>
  );
};

export default EventDetailsSection;
