"use client";
import React, { useState } from "react";
import openWhatsAppPage from "@/app/whatsapp/whatsapp";

const ContactUsSection = ({}) => {
  const [formData, setFormData] = useState({
    name: "",
    instansi: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    openWhatsAppPage(formData);
  };
  return (
    <div className="container mt-20 mb-20 p-10">
      <div className="flex flex-row">
        <div className="flex flex-col w-full m-10">
          <h2 className="text-5xl font-semibold mb-10">
            Contact Us. It's Easy.
          </h2>
          <p className="mr-10">
            Leverage agile frameworks to provide a robust synopsis for high
            level overviews. Iterative approaches to corporate strategy foster
            collaborative.
          </p>
        </div>
        <div className="flex flex-col w-full m-10">
          <form class="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John David"
                className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label
                htmlFor="instansi"
                className="block text-sm font-medium text-white"
              >
                Instansi
              </label>
              <input
                type="text"
                id="instansi"
                value={formData.instansi}
                onChange={handleChange}
                placeholder="Universitas Muhammadiyah Surakarta"
                className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-white"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Briefly tell us about your project and your current goals. How can we help you?"
                className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              ></textarea>
            </div>
            <button
              type="submit"
              style={{ backgroundColor: "#616BDA" }}
              className="text-white px-4 py-3  rounded-md "
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsSection;
