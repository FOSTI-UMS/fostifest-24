"use client"
import Dashboard from "@/components/dashboard/dashboard";
import { useState } from "react";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("competition");

  const renderContent = () => {
    switch (activeTab) {
      case "competition":
        return <div>Competition Page</div>;
      case "workshop":
        return <div>Workshop Page</div>;
      case "timeline":
        return <div>Timeline Page</div>;
      case "settings":
        return <div>Settings Page</div>;
      case "logout":
        return <div>Logout Page</div>;
      default:
        return <div>Home Page</div>;
    }
  };

  return (
    <Dashboard activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Dashboard>
  );
};

export default DashboardPage;
