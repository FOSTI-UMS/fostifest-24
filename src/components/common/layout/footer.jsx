import { IconConstants } from "@/constants/iconsConstant";
import FostifestLogo from "../ui/fostifestLogo";
import Image from "next/image";
import Link from "next/link";

const socialMedia = [
  { icon: IconConstants.youtubeGrey, link: "https://www.youtube.com/@fostiums", alt: "YouTube" },
  { icon: IconConstants.tiktok, link: "https://www.tiktok.com/@fosti.ums", alt: "TikTok" },
  { icon: IconConstants.github, link: "https://github.com/FOSTI-UMS", alt: "GitHub" },
  { icon: IconConstants.linkedIn, link: "https://www.linkedin.com/company/fostiums/", alt: "LinkedIn" },
  { icon: IconConstants.instagram, link: "https://www.instagram.com/fostifest/", alt: "Instagram" },
];

const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-[100px]">
      <FostifestLogo />
      <h3 className="text-sm font-medium text-[#68769F] my-5">Our Social Media</h3>
      <div className="flex gap-10">
        {socialMedia.map(({ icon, link, alt }, index) => (
          <Link href={link} key={index} target="_blank" rel="noopener noreferrer">
            <Image src={icon} alt={alt} width={24} height={24} />
          </Link>
        ))}
      </div>
      <p className="mt-10 text-sm mb-5">© All rights reserved - 2024 | FOSTI UMS</p>
    </div>
  );
};

export default Footer;
