"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils/utils";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { IconArrowRight } from "@tabler/icons-react";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({ setActive, active, item, children, className }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setActive(item);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      className={`relative ${className}`}
    >
      <motion.p transition={{ duration: 0.3 }} className="flex justify-center items-center cursor-pointer text-black dark:hover:text-main-primary hover:text-main-primary dark:text-white">
        <span className="text-sm ms-1">{item}</span>
        <ChevronDownIcon className={`ml-2 h-4 w-4 transition-transform ${isHovered ? "rotate-180" : ""}`} />
      </motion.p>
      {active !== null && (
        <motion.div initial={{ opacity: 0, scale: 0.85, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={transition}>
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({ setActive, children, className }) => {
  return (
    <nav onMouseLeave={() => setActive(null)} className={className}>
      {children}
    </nav>
  );
};

export const ProductItem = ({ title, description, href, src }) => {
  return (
    <div className="flex competition-items space-x-2 hover:bg-neutral-900 transition-all duration-300 p-3 rounded-lg">
      <Image src={src} width={140} height={70} alt={title} className="flex-shrink-0 rounded-md" />
      <div className="flex flex-col justify-between">
        <div className="flex flex-col">
          <h4 className="text-xl font-bold mb-1 text-black dark:text-white">{title}</h4>
          <p className="text-neutral-700 text-sm max-w-[200px] dark:text-neutral-300">{description}</p>
        </div>
        <Link className="flex border-main-primary rounded-xl border-[0.5px] max-w-fit py-2 px-5 items-center mt-2 text-main-primary dark:text-main-primary" href={href}>
          <span>See Detail</span>
          <IconArrowRight className="ml-1" size={16} />
        </Link>
      </div>
    </div>
  );
};

export const HoveredLink = ({ children, ...rest }) => {
  return (
    <Link {...rest} className={cn("relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 transition-all duration-300 dark:hover:text-main-primary hover:text-main-primary")}>
      {children}
    </Link>
  );
};
