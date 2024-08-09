"use client";
import { HoverBorderGradient } from "./hoverBorderGradient";

const CustomButton = ({ text, href, as="a", type}) => {
  return (
    <HoverBorderGradient
      href={href}
      containerClassName="justify-center items-center max-w-fit max-h-fit flex h-12 mt-5 main-shadow-hover font-medium relative text-black dark:text-white rounded-xl"
      className="px-7 bg-gradient-to-r from-[#2b2c68] to-[#616BDA]"
      as={as}
      type={type}
    >
      <span>{text}</span>
      <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
    </HoverBorderGradient>
  );
};

export default CustomButton;
