"use client";
import { useState } from "react";
import WorkshopTable from "./workshopTable";
import CompetitiveProgrammingTable from "./competitiveProgrammingTable";
import SoftwareDevelopmentTable from "./softwareDevelopmentTable";
import UiUxDesignTable from "./uiuxDesignTable";
import FostifestLogo from "../common/ui/fostifestLogo";
import ConfirmationModal from "@/components/common/ui/confirmationModal";
import { useAdmin } from "@/store/adminContext";
import CustomButton from "../common/ui/customButton";
import { signOut } from "@/repositories/supabase";
import LoadingAnimation from "../common/ui/loadingAnimation";

export default function AdminTabs() {
  const [activeTab, setActiveTab] = useState("workshop");
  const { loading } = useAdmin();
  const [isConfirming, setIsConfirming] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const logout = () => {
    if (loading) return;
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setIsConfirming(true);
    await signOut();
    setIsConfirming(false);
    window.location.reload();
  };

  return (
    <div className="min-h-screen md:px-8 md:py-8  px-2 py-5">
      <FostifestLogo logoSize={55} textSize="text-[7px]" titleSize="text-xl" />
      <CustomButton as="button" containerClassName={"h-10"} className={"text-xs bg-gradient-to-tr from-red-800 to-red-600"} onClick={() => logout()} text={"Logout Account"} />
      <h1 className="md:text-2xl text-xl font-bold mt-8 md:mb-8 mb-4">Selamat Datang Admin 👋</h1>
      <div>
        <div className="grid lg:grid-cols-4 grid-cols-2 md:gap-4 gap-2 mb-4">
          <button onClick={() => setActiveTab("workshop")} className={`py-2 md:px-4 px-2 md:text-base text-sm rounded-lg ${activeTab === "workshop" ? "bg-gray-500" : "bg-gray-800 text-white"}`}>
            Workshop
          </button>
          <button onClick={() => setActiveTab("competitive_programming")} className={`py-2 md:px-4 px-2 md:text-base text-sm rounded-lg ${activeTab === "competitive_programming" ? "bg-gray-500" : "bg-gray-800 text-white"}`}>
            Competitive Programming
          </button>
          <button onClick={() => setActiveTab("software_dev")} className={`py-2 md:px-4 px-2 md:text-base text-sm rounded-lg ${activeTab === "software_dev" ? "bg-gray-500" : "bg-gray-800 text-white"}`}>
            Software Development
          </button>
          <button onClick={() => setActiveTab("uiux_design")} className={`py-2 md:px-4 px-2 md:text-base text-xs rounded-lg ${activeTab === "uiux_design" ? "bg-gray-500" : "bg-gray-800 text-white"}`}>
            UI/UX Design
          </button>
        </div>

        {activeTab === "workshop" && <WorkshopTable />}
        {activeTab === "competitive_programming" && <CompetitiveProgrammingTable />}
        {activeTab === "software_dev" && <SoftwareDevelopmentTable />}
        {activeTab === "uiux_design" && <UiUxDesignTable />}
      </div>

      {!loading && showModal && (
        <ConfirmationModal
          title={"Konfirmasi Logout"}
          message={"Apakah Anda yakin untuk <strong>Logout</strong>?"}
          onConfirm={handleConfirm}
          onClose={() => setShowModal(false)}
          confirmText="Logout"
          loadingAnimation={isConfirming ? <LoadingAnimation className={"h-6 w-6"} /> : null}
          className={"bg-gradient-to-br from-red-800 to-red-600"}
        />
      )}
    </div>
  );
}
