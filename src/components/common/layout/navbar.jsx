"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { IconHome, IconMessage, IconUser, IconMenu2, IconX } from "@tabler/icons-react"; // Import IconMenu2 and IconX
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ImageConstants } from "@/constants/images_constant";
import { Menu, HoveredLink, MenuItem, ProductItem } from "../ui/navbarMenu";

export const Navbar = ({ className }) => {
  const { scrollYProgress } = useScroll();
  const [active, setActive] = useState(null);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false); // State for menu toggle

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious();

      if (direction < 0) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex w-full sm:max-w-fit fixed top-5 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 px-8 sm:px-10 items-center justify-between sm:py-0 py-3 sm:justify-center  md:space-x-16",
          className
        )}
      >
        <Image src={ImageConstants.fostifestLogo} height={60} width={130} />
        <Menu setActive={setActive} className="hidden md:flex space-x-6 h-full py-7">
          <HoveredLink href="/">
            <span className="hidden sm:block text-sm">Home</span>
          </HoveredLink>
          <MenuItem className={"hidden sm:block"} setActive={setActive} active={active} item="Competitions">
            <div className="text-sm grid grid-cols-2 gap-10 p-4">
              <ProductItem title="Competitive Programming" src={ImageConstants.py3DLogo} href="/" description="Prepare for tech interviews like never before." />
              <ProductItem title="Software Development" src={ImageConstants.js3DLogo} href="/" description="Production ready Tailwind css components for your next project" />
              <ProductItem title="UI/UX Design" src={ImageConstants.figma3DLogo} href="/" description="Never write from scratch again. Go from idea to blog in minutes." />
            </div>
          </MenuItem>
          <HoveredLink href="/">
            <span className="hidden sm:block text-sm">Event Details</span>
          </HoveredLink>
          <HoveredLink href="/">
            <span className="hidden sm:block text-sm">Partnership</span>
          </HoveredLink>
        </Menu>
        <div className="space-x-3 hidden md:block">
          <button className="border main-shadow-hover text-sm font-medium relative border-main-primary text-black dark:text-main-primary px-4 py-2 rounded-full">
            <span>Register</span>
            <span className="absolute main-shadow-hover inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
          </button>
          <button className="border main-shadow-hover bg-main-primary text-sm font-medium relative border-neutral-200 text-black dark:text-white px-4 py-2 rounded-full">
            <span>Login Now</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
          </button>
        </div>
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-md focus:outline-none">
            {menuOpen ? <IconX size={30} /> : <IconMenu2 size={30} />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-black shadow-lg rounded-md md:hidden">
              <div className="flex flex-col items-center border border-white/[0.2] space-y-4 rounded-xl p-4">
                <HoveredLink href="/">
                  <span className="text-sm">Home</span>
                </HoveredLink>
                <HoveredLink href="/">
                  <span className="text-sm">Competitions</span>
                </HoveredLink>
                <HoveredLink href="/">
                  <span className="text-sm">Event Details</span>
                </HoveredLink>
                <HoveredLink href="/">
                  <span className="text-sm">Partnership</span>
                </HoveredLink>
                <button className="w-full border main-shadow-hover text-sm font-medium relative border-main-primary text-black dark:text-main-primary px-4 py-2 rounded-full">
                  <span>Register</span>
                  <span className="absolute main-shadow-hover inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
                </button>
                <button className="w-full border main-shadow-hover bg-main-primary text-sm font-medium relative border-neutral-200 text-black dark:text-white px-4 py-2 rounded-full">
                  <span>Login Now</span>
                  <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};
