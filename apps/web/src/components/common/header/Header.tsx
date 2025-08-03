"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Search } from "@src/components/atoms/searchInput";
import ThemeSwitchButton from "@src/components/common/theme-switch-button/ThemeSwitchButton";
import { usePathname, useRouter } from "next/navigation";
import { Urls } from "@src/enum";
import { getCookie, setCookie } from "@src/utils/cookies";
import { Avatar } from "@src/components/atoms/avatar";
import { Dropdown } from "@src/components/atoms/drop-down";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { control } = useForm();
  const router = useRouter();
  const pathname = usePathname();
  const isBlogPage =
    pathname.startsWith("/blogs") || pathname.startsWith("/create-blog");

  const token = getCookie("token");
  const user = getCookie("user");
  console.log("user", user);
  const { avatar } = user ? JSON.parse(user) : {};
  const handleLogin = () => {
    router.push(Urls.Login);
  };

  const handleRegister = () => {
    router.push(Urls.CreateAccount);
  };

  const handleOpenEditor = () => {
    router.push(Urls.CreateBlog);
  };

  const handleNavigateHome = () => {
    router.push(Urls.Home);
  };

  const handleLogout = () => {
    setCookie("token", "", -1);
    setCookie("user", "", -1);
    router.push(Urls.Login);
  };
  return (
    <header className="fixed top-0 left-0 w-full bg-white/30 backdrop-blur-lg shadow-md z-50">
      <motion.div
        className="flex items-center justify-between max-w-screen-xl mx-auto px-4"
        animate={{
          paddingTop: isBlogPage ? 12 : 32,
          paddingBottom: isBlogPage ? 12 : 32,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
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
            onClick={handleNavigateHome}
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

        {token ? (
          <div className="flex items-center space-x-4">
            <div
              className="text-subtitle cursor-pointer"
              onClick={handleOpenEditor}
            >
              🖋️
            </div>
            {/* <div
              className="cursor-pointer relative "
              onClick={() => setIsOpen(!isOpen)}
            >
              <Avatar src={avatar} size="md" />
              {isOpen && (
                
              )}
            </div> */}
            <Dropdown
              label="view Profile"
              items={[
                {
                  label: "Profile",
                  onClick: () => router.push(Urls.ProfileView),
                },
                {
                  label: "Create Blog",
                  onClick: () => router.push(Urls.CreateBlog),
                },
                {
                  label: "Logout",
                  onClick: handleLogout,
                },
              ]}
            />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden md:flex items-center space-x-4"
          >
            <button
              onClick={handleLogin}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-full font-semibold shadow-md transition-all hover:shadow-lg hover:scale-105"
            >
              Login
            </button>
            <button
              onClick={handleRegister}
              className="bg-gray-700 text-white px-5 py-2 rounded-full font-semibold shadow-md transition-all hover:bg-blue-600"
            >
              Register
            </button>
            {/* <ThemeSwitchButton /> */}
          </motion.div>
        )}
      </motion.div>
    </header>
  );
};

export default Header;
