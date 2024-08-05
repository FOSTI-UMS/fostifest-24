import { Navbar } from "@/components/common/layout/navbar";
import HeaderSection from "@/components/home/header/header";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeaderSection />
      <div className="min-h-screen"></div>
    </>
  );
}
