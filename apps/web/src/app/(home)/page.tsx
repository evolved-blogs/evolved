"use client";

import React, { useEffect, useState } from "react";
import { Box } from "@src/components/common/box";
import { Variants, motion } from "framer-motion";
import { getBlogs } from "@src/services";
import { BlogCard } from "@src/components/common/blog-card";
import { useRouter } from "next/navigation";
import { Hero } from "@src/components/common/hero-section";
import Header from "@src/components/common/header/Header";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [showHeader, setShowHeader] = useState(false);
  const [heroHeight, setHeroHeight] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getBlogs();
      setPosts(response);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    // Ensure we're on the client side
    if (typeof window === 'undefined') return;
    
    const hero = document.getElementById("hero-section");
    if (hero) {
      setHeroHeight(hero.offsetHeight);
    }

    const handleScroll = () => {
      console.log("scrolling");
      if (window.scrollY > heroHeight-80) {
        console.log("show header");
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [heroHeight]); 

  const handleAnimation = (index: number) => {
    const durations = [1, 1.3, 1.5];
    const cardVariants: Variants = {
      offscreen: { y: 300 },
      onscreen: {
        y: 20,
        rotate: 0,
        transition: {
          type: "spring",
          bounce: 0.3,
          duration: durations[index % 3],
        },
      },
    };
    return cardVariants;
  };

  return (
    <div>
      <motion.div
        className={`fixed top-0 left-0 w-full bg-white shadow-md p-4 z-50 transition-all duration-500 ${
          showHeader ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: showHeader ? 1 : 0, y: showHeader ? 0 : -20 }}
      >
        <Header></Header>
      </motion.div>

      <div id="hero-section">
        <Hero />
      </div>

      <Box>
        <div>
          <h1 className="text-2xl font-bold md:my-3">Latest Posts</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {posts.map((post, index) => {
              const { thumbnail, author, description, slug, status, title } = post || {};
              const { firstName, avatar } = author || {};

              const handleOnClick = () => router.push(`/blogs/${slug}`);

              return (
                <motion.div
                  key={index}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.8 }}
                >
                  <motion.div variants={handleAnimation(index)}>
                    <BlogCard
                      title={title}
                      description={description}
                      cardImage={thumbnail}
                      badge={status}
                      authorName={firstName}
                      footerAvatar={avatar}
                      onClick={handleOnClick}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Home;
