import React from "react";
import Box from "@src/components/common/box/Box";
import Text from "@src/components/atoms/text/Text";
import ThemeSwitchButton from "@src/components/common/theme-switch-button/ThemeSwitchButton";
import Image from "next/image";

const Header = () => {
  return (
    <Box flex={true} bgColor="var(--background)" className="!p-2">
      <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/assets/dark_logo.png"
            alt="Logo"
            width={100}
            height={100}
          />
        </div>

        {/* Navigation Menu */}
        <nav className="flex space-x-4">
          <Text variant="primary" size="base" as="a" href="#">
            Home
          </Text>
          <Text variant="primary" size="base" as="a" href="#">
            About
          </Text>
          <Text variant="primary" size="base" as="a" href="#">
            Services
          </Text>
          <Text variant="primary" size="base" as="a" href="#">
            Contact
          </Text>
        </nav>

        {/* Theme Switch Button */}
        <ThemeSwitchButton />
      </div>
    </Box>
  );
};

export default Header;
