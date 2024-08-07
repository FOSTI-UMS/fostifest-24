import { ImageConstants } from "@/constants/imagesConstant";
import { CardBody, CardContainer, CardItem } from "../../common/ui/threeDCard";
import Image from "next/image";
import CustomButton from "@/components/common/ui/customButton";

const cardsData = [
  {
    title: "Competitive Programming",
    description:
      "Lomba Software Development melibatkan pembuatan, pengujian, dan pemeliharaan aplikasi atau sistem perangkat lunak. Proses ini mencakup berbagai tahapan untuk menghasilkan perangkat lunak yang sesuai dengan kebutuhan pengguna dan berfungsi dengan baik.",
    imageSrc: ImageConstants.py3DLogo,
  },
  {
    title: "Software Development",
    description:
      "Lomba pemrograman menguji kemampuan peserta dalam memecahkan masalah algoritma dan pemrograman dalam waktu terbatas. Peserta menggunakan bahasa pemrograman seperti C++, Java, Python, dan lainnya. Bentukan lomba bisa berupa website, labcode, atau HackerRank.",
    imageSrc: ImageConstants.js3DLogo,
  },
  {
    title: "UI/UX Design",
    description:
      "Lomba desain UI/UX menantang peserta untuk merancang antarmuka pengguna dan pengalaman pengguna yang intuitif, menarik, dan fungsional untuk aplikasi atau situs web. Tema UI/UX: <b>Smart City: Software Innovations for Social Impact.</b> Bentukan lomba termasuk mendesain UI/UX aplikasi atau situs web.",
    imageSrc: ImageConstants.figma3DLogo,
  },
];

const CompetitionsSection = () => {
  return (
    <div id="competitions" className="mt-10 pt-8 sm:mt-[80px] overflow-hidden rounded-3xl bg-black bg-opacity-40 mx-[10px] sm:mx-[40px] border-white border-[0.5px]">
      <h1 className="font-medium sm:px-10 px-5 sm:mb-0 mb-5 text-[28px] sm:text-[35px]">
        <span className="text-main-primary ">Explore</span> By Category
      </h1>
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
                <span dangerouslySetInnerHTML={{ __html: card.description }} />
              </CardItem>
              <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
                <CustomButton href={"/"} text={"Regist Now"} />
              </CardItem>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  );
};

export default CompetitionsSection;
