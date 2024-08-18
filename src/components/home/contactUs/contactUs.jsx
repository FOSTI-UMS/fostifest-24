"use client";
import React, { useState } from "react";
import openWhatsAppPage from "@/app/whatsapp/whatsapp";
import CustomButton from "@/components/common/ui/customButton";

const ContactUsSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    instansi: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      name: formData.name ? "" : "Nama Lengkap wajib diisi.",
      message: formData.message ? "" : "Pesan wajib diisi.",
    };

    if (newErrors.name || newErrors.message) {
      setErrors(newErrors);
      return;
    }

    openWhatsAppPage(formData);
    setFormData({
      name: "",
      instansi: "",
      message: "",
    });
    setErrors({ name: "", message: "" });
  };

  return (
    <div className="md:container container-none lg:p-[80px] p-5 sm:mb-0 mb-[60px]">
      <div className="flex lg:flex-row flex-col md:mx-5">
        <div className="flex flex-col w-full ">
          <h2 className="text-3xl md:text-5xl font-semibold mb-3">Contact Us. It&rsquo;s Easy.</h2>
          <p className="text-gray-300 lg:mr-10 lg:text-start text-justify lg:mb-0 mb-6">
            Punya pertanyaan atau butuh bantuan? Tim admin kami yang berdedikasi siap membantu Anda! Jika Anda memerlukan informasi lebih lanjut, memiliki pertanyaan khusus, jangan ragu untuk menghubungi kami. Cukup isi formulir ini.
          </p>
        </div>
        <div className="flex flex-col w-full">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white">
                Nama Lengkap
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="cth: Joko Donta"
                className={`text-black mt-1 text-sm block w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#616BDA]"
                }`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="instansi" className="block text-sm font-medium text-white">
                Instansi (opsional)
              </label>
              <input
                type="text"
                id="instansi"
                value={formData.instansi}
                onChange={handleChange}
                placeholder="cth: Universitas Muhammadiyah Surakarta"
                className="text-black mt-1 text-sm block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#616BDA]"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white">
                Pesan
              </label>
              <textarea
                id="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="cth: Halo kak, saya ingin bertanya mengenai workshop..."
                className={`text-black mt-1 text-sm block w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  errors.message ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#616BDA]"
                }`}
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>
            <CustomButton as="button" type="submit" text={"Send Message"} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsSection;
