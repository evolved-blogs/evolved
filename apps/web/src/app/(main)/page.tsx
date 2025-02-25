import React from "react";
import { BlogCard } from "@src/components/common/blog-card";
import { Box } from "@src/components/common/box";

const Home = () => {
  return (
    <Box>
      <BlogCard />
      <BlogCard />
    </Box>
  );
};

export default Home;
