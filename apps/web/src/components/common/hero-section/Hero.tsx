import { motion } from "framer-motion";

const Hero = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const firstSpanVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const secondSpanVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.5, staggerChildren: 0.05 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: [10, -5, 0],
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

    const getStarted = () => {
        console.log("Get Started");
        if (window.scrollY === 0) {
          window.scrollTo(0, window.innerHeight-40);
        }
     }

  return (
    <motion.div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center px-6">
      <motion.h1
        className="text-7xl font-bold font-sans drop-shadow-lg flex text-center  flex-wrap justify-center md:text-5xl lg:text-7xl"
        initial="hidden"
        animate="visible"
        variants={textVariants}
      >
        <motion.span
          className="text-slate-100 mr-2"
          variants={firstSpanVariants}
          initial="hidden"
          animate="visible"
        >
          {"Get Involved with ".split("").map((letter, index) => (
            <motion.span key={index} variants={letterVariants}>
              {letter}
            </motion.span>
          ))}
        </motion.span>

        <motion.span
          className="text-orange-300"
          variants={secondSpanVariants}
          initial="hidden"
          animate="visible"
        >
          {" Evolved Blogs".split("").map((letter, index) => (
            <motion.span key={index} variants={letterVariants}>
              {letter}
            </motion.span>
          ))}
        </motion.span>
      </motion.h1>

      <motion.p
        className="text-lg mt-2 opacity-80"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        You Learn, You Share, You Evolve
      </motion.p>

      <motion.button
        className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow-md hover:bg-gray-200 transition"
        whileHover={{
          scale: 1.1,
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{ scale: 0.9 }}
        onClick={getStarted}
      >
        Get Started
      </motion.button>
    </motion.div>
  );
};

export default Hero;
