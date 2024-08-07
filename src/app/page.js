import { Navbar } from "@/components/common/layout/navbar";
import HeaderSection from "@/components/home/header/header";
import ContactUsSection from "@/components/home/contactUs/contactUs";
import PosterCarousel from "@/components/home/posterCarousel/posterCarousel";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeaderSection />
      <PosterCarousel />
      <ContactUsSection />
    </>
  );
}
