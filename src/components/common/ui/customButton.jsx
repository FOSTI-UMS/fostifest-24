"use client";
import { HoverBorderGradient } from "./hoverBorderGradient";

const CustomButton = ({ icon, text, href, as = "Link", type, containerClassName, className, onClick }) => {
  return (
    <HoverBorderGradient
      onClick={onClick}
      href={href}
      containerClassName={`justify-center items-center max-w-fit max-h-fit flex h-12 mt-5 main-shadow-hover font-medium relative text-black dark:text-white rounded-xl ${containerClassName}`}
      className={`px-7 bg-gradient-to-r from-[#2b2c68] to-[#616BDA] ${className}`}
      as={as}
      type={type}
    >
      <span className={`flex items-center ${text === "" ? "space-x-0": "space-x-3"}`}>
        <span>{text}</span> {icon}
      </span>
      <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
    </HoverBorderGradient>
  );
};

export default CustomButton;
