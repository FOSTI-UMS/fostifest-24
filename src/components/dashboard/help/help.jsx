import openWhatsAppPage from "@/app/whatsapp/whatsapp";
import React, { useEffect } from "react";

const Help = () => {
  const handleOpenWhatsApp = () => {
    const formData = {
      name: "",
      instansi: "",
      message: "",
      phoneNumber: "6285727579027",
    };

    openWhatsAppPage(formData);
  };

  useEffect(() => {
    handleOpenWhatsApp();
  }, []);

  return <div></div>;
};

export default Help;
