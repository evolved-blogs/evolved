import { cn } from "@src/utils/classnames";
import React from "react";

interface BoxProps {
  children: React.ReactNode;
  flex?: boolean;
  bgImage?: string;
  bgColor?: string;
  className?: string;
}

const Box: React.FC<BoxProps> = ({
  children,
  flex = false,
  bgImage,
  bgColor = "var(--background)",
  className = "",
}) => {
  const containerStyles = {
    backgroundImage: bgImage ? `url(${bgImage})` : undefined,
    backgroundColor: bgColor,
    display: flex ? "flex" : "block",
  };

  return (
    <div
      className={cn("w-full p-4 md:p-8 lg:p-12", className)}
      style={containerStyles}
    >
      <div className="max-w-screen-xl mx-auto w-full h-full">{children}</div>
    </div>
  );
};

export default Box;
