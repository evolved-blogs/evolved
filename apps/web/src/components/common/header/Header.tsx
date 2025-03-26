"use client";

import React from "react";
import Box from "@src/components/common/box/Box";
import ThemeSwitchButton from "@src/components/common/theme-switch-button/ThemeSwitchButton";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Search } from "@src/components/atoms/searchInput";


const Header = () => {
  const { control } = useForm();
  return (
    <Box flex={true} bgColor="var(--background)" className="!p-2">
      <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
        <div className="flex items-center">
          <Image
            src="/assets/dark_logo.png"
            alt="Logo"
            className="mt-[-73px] mb-[-63px]"
            width={150}
            height={150}
          />
        </div>

        <div className="flex items-center space-x-4">
          <Search control={control} name="search"></Search>
          <button
            type="submit"
            className=" bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 font-semibold"
          >
            Login
          </button>
          <button
            type="submit"
            className=" bg-slate-600 text-white p-2 rounded-md hover:bg-blue-600 font-semibold"
          >
            Register
          </button>
        <ThemeSwitchButton />
        </div>
      </div>
    </Box>
  );
};

export default Header;
