"use client";
import { useEffect } from "react";

const WhatsAppPage = () => {
  useEffect(() => {
    const message = encodeURIComponent("halo kak");

    const phoneNumber = "no-hp-cp";

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    window.location.href = whatsappUrl;
  }, []);

  return null;
};

export default WhatsAppPage;
