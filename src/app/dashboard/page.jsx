"use client";
import Competition from "@/components/dashboard/competition/competition";
import Dashboard from "@/components/dashboard/dashboard";
import Settings from "@/components/dashboard/settings/settings";
import Timeline from "@/components/dashboard/timeline/timeline";
import Workshop from "@/components/dashboard/workshop/workshop";
import { UserProvider } from "@/store/userContext";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("competition");

  const renderContent = () => {
    switch (activeTab) {
      case "competition":
        return <Competition />;
      case "workshop":
        return <Workshop />;
      case "timeline":
        return <Timeline />;
      case "settings":
        return <Settings />;
      default:
        return <Competition />;
    }
  };

  return (
    <UserProvider>
      <Dashboard activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderContent()}
        <ToastContainer />
      </Dashboard>
    </UserProvider>
  );
};

export default DashboardPage;
