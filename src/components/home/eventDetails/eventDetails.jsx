import { ImageConstants } from "@/constants/imagesConstant";
import Image from "next/image";

const EventDetailsSection = () => {
  return (
      <div id="event-details"
        className="bg-gradient-to-br from-[#13668f]  to-[#4d002a] text-white max-w-6xl mx-auto md:rounded-3xl md:px-10 px-5 py-10 relative mt-[60px]"
      >
        <div className="relative flex flex-col md:flex-row items-center justify-center">
          <div className="relative w-full md:w-1/2 flex justify-center">
            <div className="relative md:w-[300px] md:h-[300px] w-[180px] h-[180px]  overflow-hidden">
              <Image
                src={ImageConstants.fostifestLogo2}
                width={300}
                height={300}
                alt="Event Image"
                className="absolute inset-0 w-full h-full object-cover rounded-lg z-10 shadow-lg"
              />
            </div>
            <Image
              src={ImageConstants.fostifestLogo2}
              width={300}
              height={300}
              alt="Event Image Shadow"
              className="rounded-lg absolute top-[-15px] left-[16px] md:opacity-30 opacity-20 z-0 md:w-[300px] md:h-[300px] w-[180px] h-[180px] "
            />
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0 text-center md:text-left">
            <h2 className="md:text-4xl text-3xl font-bold mb-4">About FOSTIFEST</h2>
            <p className="md:text-base text-sm mb-6 text-justify">  
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
        <section className="mt-12">
          <div className="text-center">
            <h2 className="md:text-4xl text-3xl mb-5 font-bold text-white">
            Let&#39;s Check <br /> Our Timeline
            </h2>
          </div>
          <div className="flex justify-center">
            {/* <Image
              src="/images/timeline-poster.png"
              width={300}
              height={300}
              alt="Timeline Image"
              className="w-11/12 max-w-4xl mx-auto"
            /> */}
            <h1 className="text-xl font-medium">Coming Soon!</h1>
          </div>
        </section>
      </div>
  );
};

export default EventDetailsSection;
