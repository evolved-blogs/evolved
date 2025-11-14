import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      {/* <Header /> */}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
