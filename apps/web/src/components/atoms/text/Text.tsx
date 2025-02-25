import React from "react";

interface TextProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "gray" | "white";
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  as?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "a";
  href?: string;
  className?: string;
}

const Text: React.FC<TextProps> = ({
  children,
  variant = "primary",
  size = "base",
  as = "p",
  href,
  className,
}) => {
  const Component = as;
  const colorMap = {
    primary: "var(--primary)",
    secondary: "var(--secondary-500)",
    gray: "var(--gray-100)",
    white: "var(--white)",
  };

  const sizeMap = {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "28px",
    "4xl": "32px",
    "5xl": "36px",
  };

  const style = {
    color: colorMap[variant],
    fontSize: sizeMap[size],
  };

  if (Component === "a" && href) {
    return (
      <a href={href} style={style} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Component style={style} className={className}>
      {children}
    </Component>
  );
};

export default Text;
