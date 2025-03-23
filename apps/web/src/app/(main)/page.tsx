"use client";

import React, { useEffect } from "react";
import { Box } from "@src/components/common/box";

import { Variants, motion } from "framer-motion";
import { getBlogs } from "@src/services";
import { BlogCard } from "@src/components/common/blog-card";

const Home = () => {

  const [posts, setPosts] = React.useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getBlogs();
      console.log("response", response);
      setPosts(response);
    };
    fetchPosts();
  }, []);

  console.log("post",posts)

  const handleAnimation = (index:number) => {
    const durations = [1,1.3,1.5]
    const cardVariants: Variants = {
      offscreen: {
        y: 300,
      },
      onscreen: {
        y: 20,
        rotate: 0,
        transition: {
          type: "spring",
          bounce: 0.3,
          duration : durations[index% 3]
        },
    
      },
    };
    return cardVariants
  }
  return (
    <Box>
      <div >
      <h1 className="text-2xl font-bold md:my-3">LatestPost</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4  gap-3 ">
        {posts.map((post,index) => {
          const { CardImage, badge, description, footerAvatar, id, title } =
            post || {};

          const handleAnimate = ()=> {
            return handleAnimation(index)
          }
          return (
            <motion.div
              key={id}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true,amount:0.8}}
            >
              <motion.div
                variants={handleAnimate()}
              >
              <BlogCard title={title} description={description} cardImage={CardImage} footerAvatar={footerAvatar} ></BlogCard>
                {/* <Card
                  title={title}
                  description={description}
                  badge={badge}
                  cardImage={CardImage}
                  footerAvatar={footerAvatar}
                /> */}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
    </Box>
  );
};

export default Home;

