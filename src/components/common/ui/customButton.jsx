import Link from "next/link";

const CustomButton = ({ text, href }) => {
  return (
    <Link href={href} className="justify-center items-center max-w-fit flex h-12 mt-5 border main-shadow-hover bg-gradient-to-r from-[#2b2c68] to-[#616BDA] font-medium relative text-black dark:text-white px-7 rounded-xl">
      <span>{text}</span>
      <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
    </Link>
  );
};

export default CustomButton;
