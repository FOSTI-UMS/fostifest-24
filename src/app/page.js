import { Navbar } from "@/components/common/layout/navbar";
import HeaderSection from "@/components/home/header/header";
import ContactUsSection from "@/components/home/contactUs/contactUs";
import CompetitionsSection from "@/components/home/competitions/competitions";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeaderSection />
      <CompetitionsSection />
      <ContactUsSection />
    </>
  );
}
