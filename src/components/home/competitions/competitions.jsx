import { ImageConstants } from "@/constants/imagesConstant";
import { CardBody, CardContainer, CardItem } from "../../common/ui/threeDCard";
import Image from "next/image";
import { HoverBorderGradient } from "@/components/common/ui/hoverBorderGradient";
import { CompetitionCategoriesConstant } from "@/constants/competitionCategoriesConstant";
import { useUser } from "@/store/userContext";
import CustomButton from "@/components/common/ui/customButton";
import { IconConstants } from "@/constants/iconsConstant";

const cardsData = [
  {
    title: CompetitionCategoriesConstant.cp,
    description:
      "Lomba <strong>Competitive Programming</strong> menguji kemampuan peserta dalam memecahkan masalah algoritma dan pemrograman dalam waktu terbatas. Peserta menggunakan bahasa pemrograman seperti C/C++, Java, Python, dan lainnya. Bentukan lomba bisa berupa leetcode, atau HackerRank.",
    imageSrc: ImageConstants.py3DLogo,
  },
  {
    title: CompetitionCategoriesConstant.sd,
    description:
      "Lomba <strong>Software Development</strong> melibatkan pembuatan, pengujian, dan pemeliharaan aplikasi atau sistem perangkat lunak. Proses ini mencakup berbagai tahapan untuk menghasilkan perangkat lunak yang sesuai dengan kebutuhan pengguna dan berfungsi dengan baik.",
    imageSrc: ImageConstants.js3DLogo,
  },
  {
    title: CompetitionCategoriesConstant.ud,
    description:
      "Lomba <strong>UI/UX Design</strong> menantang peserta untuk merancang antarmuka pengguna dan pengalaman pengguna yang intuitif, menarik, dan fungsional untuk aplikasi atau situs web. Tema UI/UX: <b>Smart City: Software Innovations for Social Impact.</b> Bentukan lomba termasuk mendesain UI/UX aplikasi atau situs web.",
    imageSrc: ImageConstants.figma3DLogo,
  },
];

const CompetitionsSection = () => {
  const { registrationEnd, now, loading, session, sectionRefs } = useUser();
  return (
    <section ref={sectionRefs.competitions} id="competitions" className="md:container container-none">
      <div className=" pt-8 sm:mt-[40px] overflow-hidden rounded-3xl bg-black bg-opacity-40  sm:border-[#686868] border-transparent border-[0.01px]">
        <h1 className="font-semibold sm:px-10 px-5 sm:mb-0 mb-5 text-[28px] sm:text-[35px]">
          <span className="text-main-primary ">Explore</span> By Category
        </h1>
        <div className="flex flex-col sm:flex-row custom-scrollbar overflow-x-auto sm:px-10 px-3 gap-0 sm:gap-10">
          {cardsData.map((card, index) => (
            <CardContainer key={index} className="inter-var sm:mb-0 mb-5 ">
              <CardBody className=" bg-gradient-to-tr from-[#191834] to-[#444ca6] transition-all duration-300 bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-main-primary/[0.8] border-black/[0.1] w-auto sm:w-[30rem] h-auto md:rounded-3xl rounded-xl p-6 border">
                <CardItem translateZ="100" className="mt-2 mb-3">
                  <Image src={card.imageSrc} height="1000" width="1000" className="h-32 w-full object-contain rounded-xl" alt="thumbnail" />
                </CardItem>
                <CardItem translateZ="50" className="text-2xl font-semibold text-neutral-600 dark:text-white">
                  {card.title}
                </CardItem>
                <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
                  <span dangerouslySetInnerHTML={{ __html: card.description }} />
                </CardItem>
                <div className="flex items-center mt-2">
                  {!loading && !session && now <= registrationEnd && (
                    <CardItem translateZ="60" className="me-3 text-neutral-500 text-sm max-w-sm  dark:text-neutral-300">
                      <HoverBorderGradient className="md:px-7 px-5 bg-white whitespace-nowrap  text-black font-semibold" href={"/register"} containerClassName="justify-center items-center max-w-fit flex h-12 mt-5 border main-shadow-hover relative rounded-xl">
                        <span>Register Now </span>
                        <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
                      </HoverBorderGradient>
                    </CardItem>
                  )}
                  <CardItem translateZ="60" className="text-neutral-500 text-sm max-w-sm dark:text-neutral-300">
                    <CustomButton
                      icon={<Image className="md:block hidden h-[19px] w-[19px]" src={IconConstants.download} alt="download" />}
                      href={"/"}
                      containerClassName={" border-main-primary mb-0"}
                      className={"text-sm px-5 bg-gradient-to-r from-transparent to-transparent text-main-primary"}
                      text={`Guidebook`}
                    />
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompetitionsSection;
