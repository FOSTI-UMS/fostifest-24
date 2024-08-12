"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ImageConstants } from "@/constants/imagesConstant";
import { Menu, HoveredLink, MenuItem, ProductItem } from "../ui/navbarMenu";
import FostifestLogo from "../ui/fostifestLogo";
import { HoverBorderGradient } from "../ui/hoverBorderGradient";
import { getCurrentUser, signOut } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const Navbar = ({ className }) => {
  const { scrollYProgress } = useScroll();
  const [active, setActive] = useState(null);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null)
  const router = useRouter();
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

  const fecthUser = async () => {
    const user = await getCurrentUser();
    setUser(user.data.user);
  }
  

  const handleSignOut = async () => {
    try {
      await signOut();
      router.refresh()
    } catch (error) {
      toast("Terjadi kesalahan saat keluar", {type: "error"})
    }
  }

  useEffect(()=>{
    fecthUser();
  }, [])

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
          "flex w-full md:max-w-fit fixed top-5 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full bg-black bg-opacity-50  backdrop-filter backdrop-blur-3xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 px-8 sm:px-10 items-center lg:py-0 py-4 lg:justify-normal justify-between  md:space-x-16",
          className
        )}
      >
        <FostifestLogo/>
        <div className="md:block lg:hidden hidden w-[300px]">{""}</div>
        <Menu setActive={setActive} className="hidden lg:flex space-x-6 h-full py-7">
          <HoveredLink href="/">
            <span className="hidden lg:block text-sm">Home</span>
          </HoveredLink>
          <HoveredLink href="#event-details">
            <span className="hidden lg:block text-sm">Event Details</span>
          </HoveredLink>
          <MenuItem className={"hidden lg:block"} setActive={setActive} active={active} item="Competitions">
            <div className="text-sm grid grid-cols-2 gap-10 p-4">
              <ProductItem title="Competitive Programming" src={ImageConstants.py3DLogo} href="#competitions" description="Jelajahi tantangan Competitive Programming." />
              <ProductItem title="Software Development" src={ImageConstants.js3DLogo} href="#competitions" description="Tunjukkan keahlian Anda dalam pengembangan perangkat lunak." />
              <ProductItem title="UI/UX Design" src={ImageConstants.figma3DLogo} href="#competitions" description="Fokus pada pembuatan yang user-friendly." />
            </div>
          </MenuItem>
          <HoveredLink href="#workshop">
            <span className="hidden lg:block text-sm">Workshop</span>
          </HoveredLink>
        </Menu>
        <div className="space-x-3 hidden lg:flex">
          <HoverBorderGradient as="Link" href={user ? "/dashboard" : "/register-workshop"} className="border main-shadow-hover text-sm font-medium relative border-main-primary text-black dark:text-main-primary px-4 py-2 rounded-full">
            <span>{user != null ? user.email : "Register"}</span>
            <span className="absolute main-shadow-hover inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
          </HoverBorderGradient>
          {user
          ? <button onClick={handleSignOut} className="border main-shadow-hover bg-main-primary text-sm font-medium relative border-neutral-200 text-black dark:text-white px-8 py-2 rounded-full" style={{backgroundColor: user ? "red" : "#616BDA"}}>
              <span>{"Logout"}</span>
              <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
            </button>
          : <Link href={"/login"} className="border main-shadow-hover bg-main-primary text-sm font-medium relative border-neutral-200 text-black dark:text-white px-8 py-2 rounded-full">
              <span>{"Login"}</span>
              <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
            </Link>
          }
        </div>
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-md focus:outline-none">
            {menuOpen ? <IconX size={30} /> : <IconMenu2 size={30} />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-black shadow-lg rounded-md lg:hidden">
              <div className="flex flex-col items-center border border-white/[0.2] space-y-4 rounded-xl p-4">
                <HoveredLink href="/">
                  <span className="text-sm">Home</span>
                </HoveredLink>
                <HoveredLink href="#event-details">
                  <span className="text-sm">Event Details</span>
                </HoveredLink>
                <HoveredLink href="#competitions">
                  <span className="text-sm">Competitions</span>
                </HoveredLink>
                <HoveredLink href="#workshop">
                  <span className="text-sm">Workshop</span>
                </HoveredLink>
                <Link href={user ? "/dashboard" : "/register-workshop"} className="w-full border main-shadow-hover text-sm font-medium relative border-main-primary text-black dark:text-main-primary px-4 py-2 rounded-full">
                  <span>{user != null ? user.email : "Register"}</span>
                  <span className="absolute main-shadow-hover inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
                </Link>
                {user 
                ? <button onClick={handleSignOut} className="w-full border main-shadow-hover bg-main-primary text-sm font-medium relative border-neutral-200 text-black dark:text-white px-4 py-2 rounded-full"  style={{backgroundColor: user ? "red" : "#616BDA"}}>
                    <span>Logout</span>
                    <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
                  </button>
                : <Link href={"/login"} className="w-full border main-shadow-hover bg-main-primary text-sm font-medium relative border-neutral-200 text-black dark:text-white px-4 py-2 rounded-full"  style={{backgroundColor: user ? "red" : "#616BDA"}}>
                    <span>{"Login"}</span>
                    <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
                  </Link>
                }
                
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};
