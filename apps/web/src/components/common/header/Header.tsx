"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Search } from "@src/components/atoms/searchInput";
import ThemeSwitchButton from "@src/components/common/theme-switch-button/ThemeSwitchButton";
import { usePathname,useRouter } from "next/navigation";
import { Urls } from "@src/enum";

const Header = () => {
  const { control } = useForm();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isBlogPage = pathname.startsWith("/blogs");

  const handleLogin = () => {
    router.push(Urls.Login);
  }

  const handleRegister = () => {
    router.push(Urls.CreateAccount);
  }
  return (
    <header className="fixed top-0 left-0 w-full bg-white/30 backdrop-blur-lg shadow-md z-50">
       <motion.div
      className="flex items-center justify-between max-w-screen-xl mx-auto px-4"
      animate={{ paddingTop: isBlogPage ? 12 : 32, paddingBottom: isBlogPage ? 12 : 32 }} // Adjust padding
      transition={{ duration: 0.4, ease: "easeInOut" }} // Smooth animation
    >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/assets/evolved_new.png"
            alt="Logo"
            width={140}
            height={40}
            className="cursor-pointer"
          />
        </motion.div>

      

        <motion.div className="relative  rounded-full p-[2px] overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 rounded-full"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
          />

          <Search
            control={control}
            name="search"
            className="relative w-full bg-white rounded-full  border-[2px] border-transparent focus:ring-2 focus:ring-blue-400 transition-all shadow-sm"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hidden md:flex items-center space-x-4"
        >
          <button onClick={handleLogin} className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-full font-semibold shadow-md transition-all hover:shadow-lg hover:scale-105">
            Login
          </button>
          <button onClick={handleRegister} className="bg-gray-700 text-white px-5 py-2 rounded-full font-semibold shadow-md transition-all hover:bg-blue-600">
            Register
          </button>
          {/* <ThemeSwitchButton /> */}
        </motion.div>

        {/* Mobile Menu Button */}
        {/* <button
          className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-200 transition"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button> */}
      </motion.div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden mt-4 space-y-4 text-center bg-white p-4 rounded-lg shadow-md"
        >
          <Search
            control={control}
            name="search"
            className="w-full border rounded-lg p-2"
          />
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg">
            Login
          </button>
          <button className="w-full bg-gray-700 text-white py-2 rounded-lg">
            Register
          </button>
          <ThemeSwitchButton />
        </motion.div>
      )}
    </header>
  );
};

export default Header;
