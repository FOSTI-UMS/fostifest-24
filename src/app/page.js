"use client";
import { Navbar } from "@/components/common/layout/navbar";
import HeaderSection from "@/components/home/header/header";
import EventDetailsSection from "@/components/home/eventDetails/eventDetails";
import ContactUsSection from "@/components/home/contactUs/contactUs";
import CompetitionsSection from "@/components/home/competitions/competitions";
import PosterCarousel from "@/components/home/posterCarousel/posterCarousel";
import WorkShopSection from "@/components/home/workshop/workshop";
import PartnerShipSection from "@/components/home/partnerShip/partnerShip";
import Footer from "@/components/common/layout/footer";
import { UserProvider } from "@/store/userContext";

export default function Home() {
  return (
    <UserProvider>
      <Navbar />
      <HeaderSection />
      <PosterCarousel />
      <EventDetailsSection />
      <CompetitionsSection />
      <WorkShopSection />
      <ContactUsSection />
      <PartnerShipSection />
      <Footer />
    </UserProvider>
  );
}
