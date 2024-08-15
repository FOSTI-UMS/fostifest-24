"use client";
import { useState } from "react";
import { IconConstants } from "@/constants/iconsConstant";
import { ImageConstants } from "@/constants/imagesConstant";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/userContext";

const Dashboard = ({ children, activeTab, setActiveTab }) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, loading } = useUser();


  const logout = async () => {
    await signOut();
    router.replace("/");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { name: "Competition", icon: IconConstants.competition, key: "competition" },
    { name: "Workshop", icon: IconConstants.workshop, key: "workshop" },
    { name: "Timeline", icon: IconConstants.timeline, key: "timeline" },
    { name: "Settings", icon: IconConstants.settings, key: "settings" },
  ];

  return (
    <div className="relative flex min-h-screen">
      <aside
        className={`bg-[#0f172a] text-white w-64 p-4 m-2 rounded-xl fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-96"
        } transition-transform duration-300 z-30 lg:relative lg:translate-x-0 lg:w-72`}
      >
        <div className="mb-8 flex items-center space-x-3">
          <Image src={ImageConstants.fostifestLogo2} alt="fostifest-logo-dashboard" width={40} />
          <h1 className="text-xl font-semibold">FOSTIFEST</h1>
        </div>
        <nav className="flex flex-col items-center md:items-start w-full">
          <ul className="space-y-5 w-full">
            {menuItems.map((item) => (
              <div key={item.key}>
                <li>
                  <button
                    className={`hover:bg-[#3a3f5f] transition-all duration-300 w-full text-left py-2 px-3 flex items-center space-x-4 rounded-full ${
                      activeTab === item.key ? "bg-[#3a3f5f]" : ""
                    }`}
                    onClick={() => handleTabChange(item.key)}
                  >
                    <span>
                      <Image src={item.icon} alt={item.key} width={20} />
                    </span>
                    <span>{item.name}</span>
                  </button>
                </li>
                {item.key === "timeline" && <hr className="my-4 border-gray-600 w-full" />}
              </div>
            ))}
          </ul>
          <div className="mt-auto w-full">
            <button
              className={`w-full text-left ms-1 p-2 flex items-center space-x-4 text-sm mt-2`}
              onClick={() => logout()}
            >
              <Image src={IconConstants.logout} alt="logout-dashboard" width={15} />
              <span className="text-[#CC8889]">Logout Account</span>
            </button>
          </div>
          <div className="absolute bottom-3 left-0 items-center p-3 w-full">
            <hr className="my-4 border-gray-600 w-full" />
            <Link
              className={`border hover:bg-gray-800 border-main-primary mb-5 transition-all duration-300 w-full text-center md:text-left py-2 px-3 flex items-center space-x-4 rounded-2xl`}
              href={"/"}
            >
              <span>
                <Image src={IconConstants.home} alt={"home"} width={20} />
              </span>
              <span className="text-main-primary">Back to Main Page</span>
            </Link>
            <div className="flex items-center space-x-3 mx-2">
              <Image src={ImageConstants.fostifestLogo2} alt="fostifest-logo-dashboard" width={35} />
              <div className="flex flex-col">
                <h1 className="text-[#A3A7AC] text-xs">Selamat Datang 👋</h1>
                <h1 className="font-medium text-sm">{!loading && user.leaderName}</h1>
              </div>
            </div>
          </div>
        </nav>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <main
        className={`flex-1 p-6 text-white transition-all duration-300`}
      >
        {children}
      </main>

      <button
        onClick={toggleSidebar}
        className="fixed bottom-5 h-[60px] w-[60px] right-5 z-30 lg:hidden bg-[#0f172a] text-white py-2 px-5 rounded-full flex items-center justify-center"
      >
        {isSidebarOpen ? (
          <Image height={25} src={IconConstants.arrowBack} alt="dashboard-arrow-back" />
        ) : (
          <Image height={25} src={IconConstants.arrowForward} alt="dashboard-arrow-forward" />
        )}
      </button>
    </div>
  );
};

export default Dashboard;
