"use client";
import Image from "next/image";
import EditProfile from "./editProfile";
import { useUser } from "@/store/userContext";
import LoadingAnimation from "@/components/common/ui/loadingAnimation";
import { ImageConstants } from "@/constants/imagesConstant";

const Settings = ({}) => {
  const { loading, updateEnd, now } = useUser();
  return (
    <div className="md:container">
      <div className="flex items-center space-x-4">
        <Image src={ImageConstants.settings} alt="settings-dashboard" height={35} />
        <h1 className="text-2xl font-semibold">Settings</h1>
      </div>
      <hr className="my-4 border-gray-600 w-full" />
      {loading ? (
        <LoadingAnimation />
      ) : (
        <>
          {now <= updateEnd && (
            <>
              <EditProfile />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Settings;
