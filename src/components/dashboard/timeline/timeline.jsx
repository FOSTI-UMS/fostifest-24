import { IconConstants } from "@/constants/iconsConstant";
import Image from "next/image";

const Timeline = ({}) => {
  return (
    <div className="md:container">
      <div className="flex items-center space-x-4">
        <Image src={IconConstants.timeline} alt="timeline-dashboard" height={35} />
        <h1 className="text-2xl font-semibold">Timeline</h1>
      </div>
      <hr className="my-4 border-gray-600 w-full" />
      <div className="text-center text-xl mt-5">Coming Soon!</div>
    </div>
  );
};

export default Timeline;
