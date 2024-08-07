import { ImageConstants } from "@/constants/images_constant";
import { CardBody, CardContainer, CardItem } from "../../common/ui/threeDCard";
import Image from "next/image";

const cardsData = [
  {
    title: "Competitive Programming",
    description: "Lomba ini menantang peserta untuk memecahkan masalah algoritma yang kompleks dalam batas waktu tertentu, mengasah keterampilan coding dan bersaing dengan programmer lainnya.",
    imageSrc: ImageConstants.py3DLogo,
  },
  {
    title: "Software Development",
    description: "Peserta ditantang untuk mengembangkan aplikasi inovatif yang dapat memecahkan masalah nyata, menunjukkan kemampuan teknis dan kreativitas dalam menciptakan solusi yang efektif.",
    imageSrc: ImageConstants.js3DLogo,
  },
  {
    title: "UI/UX Design",
    description: "Lomba ini fokus pada pembuatan desain antarmuka yang estetis dan mudah digunakan, menunjukkan bakat dalam menciptakan desain yang menarik dan user-friendly.",
    imageSrc: ImageConstants.figma3DLogo,
  },
];

const CompetitionsSection = ({}) => {
  return (
    <div id="competitions" className="mt-10 pt-8 sm:pt-10 overflow-hidden rounded-3xl bg-black bg-opacity-40 mx-[10px] sm:mx-[40px] border-white border-[0.5px]">
      <h1 className="sm:px-10 px-5 sm:mb-0 mb-5 text-[28px] sm:text-[35px]"><span className="text-main-primary">Explore</span> By Category</h1>
      <div className="flex flex-col sm:flex-row custom-scrollbar overflow-x-auto sm:px-10 px-5 gap-0 sm:gap-10">
        {cardsData.map((card, index) => (
          <CardContainer key={index} className="inter-var sm:mb-0 mb-5">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-main-primary/[0.5] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-3xl p-6 border">
              <CardItem translateZ="100" className="mt-2 mb-3">
                <Image src={card.imageSrc} height="1000" width="1000" className="h-32 w-full object-contain rounded-xl group-hover/card:shadow-xl" alt="thumbnail" />
              </CardItem>
              <CardItem translateZ="50" className="text-2xl font-semibold text-neutral-600 dark:text-white">
                {card.title}
              </CardItem>
              <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
                {card.description}
              </CardItem>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  );
};

export default CompetitionsSection;
