import { CardBody, CardContainer, CardItem } from "@/components/common/ui/threeDCard";
import { ImageConstants } from "@/constants/imagesConstant";
import Image from "next/image";

const Timeline = ({}) => {
  return (
    <div className="md:container overflow-hidden">
      <div className="flex items-center space-x-4">
        <Image src={ImageConstants.timeline} alt="timeline-dashboard" height={45} />
        <h1 className="text-2xl font-semibold">Timeline</h1>
      </div>
      <hr className="my-4 border-gray-600 w-full" />
      <CardContainer containerClassName={"sm:py-0 py-0 "} className="flex justify-center max-w-fit ">
        <CardItem className="w-full h-full object-contain rounded-lg border border-gray-600">
          <CardBody className={"w-full h-full object-contain rounded-lg border border-gray-600"}>
            <Image src={ImageConstants.fostifestTimeline} alt="Overlogic Fosti Fostifest" className="w-full h-full object-contain rounded-lg border border-gray-600" />
          </CardBody>
        </CardItem>
      </CardContainer>
    </div>
  );
};

export default Timeline;
