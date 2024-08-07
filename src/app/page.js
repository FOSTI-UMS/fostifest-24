import { Navbar } from "@/components/common/layout/navbar";
import HeaderSection from "@/components/home/header/header";
import ContactUsSection from "@/components/home/contactUs/contactUs";
import CompetitionsSection from "@/components/home/competitions/competitions";
import PosterCarousel from "@/components/home/posterCarousel/posterCarousel";
import WorkShopSection from "@/components/home/workshop/workshop";
import PartnerShipSection from "@/components/home/partnerShip/partnerShip";
import Footer from "@/components/common/layout/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeaderSection />
      <PosterCarousel />
      <CompetitionsSection/>
      <WorkShopSection/>
      <ContactUsSection />
      <PartnerShipSection />
      <Footer/>
    </>
  );
}
