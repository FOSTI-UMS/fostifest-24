import { IconConstants } from "@/constants/iconsConstant";
import Image from "next/image";
import NotRegisteredCard from "../common/notRegisteredCard";
import LoadingAnimation from "@/components/common/ui/loadingAnimation";
import { useUser } from "@/contexts/userContext";

const Workshop = ({}) => {
  const { user, loading } = useUser();

  return (
    <div className="md:container min-h-screen">
      <div className="flex items-center space-x-4">
        <Image src={IconConstants.workshop} alt="workshop-dashboard" height={35} />
        <h1 className="text-2xl font-semibold">Workshop</h1>
      </div>
      <hr className="my-4 border-gray-600 w-full" />
      {loading && <LoadingAnimation />}
      {!loading && user.workshopId == null && <NotRegisteredCard href={"/register-workshop"} />}
    </div>
  );
};

export default Workshop;
