"use client";
import { IconConstants } from "@/constants/iconsConstant";
import Image from "next/image";
import EditProfile from "./editProfile";
import DeleteAccount from "./deleteAccount";
import { useUser } from "@/contexts/userContext";
import LoadingAnimation from "@/components/common/ui/loadingAnimation";

const Settings = ({}) => {
  const { loading } = useUser();
  return (
    <div className="md:container">
      <div className="flex items-center space-x-4">
        <Image src={IconConstants.settings} alt="settings-dashboard" height={35} />
        <h1 className="text-2xl font-semibold">Settings</h1>
      </div>
      <hr className="my-4 border-gray-600 w-full" />
      {loading ? (
        <LoadingAnimation />
      ) : (
        <>
          <EditProfile />
          <DeleteAccount />
        </>
      )}
    </div>
  );
};

export default Settings;
