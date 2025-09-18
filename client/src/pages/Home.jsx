import React, { useEffect, useState } from "react";
import {
  Brain,
  Lightbulb,
  Network,
  ArrowRight,
  Play,
  Zap,
  Text,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Card1 from "../components/cards/Card1";
import Card2 from "../components/cards/Card2";
import Card3 from "../components/cards/Card3";
import Card4 from "../components/cards/Card4";
import { motion } from "framer-motion";

export const Home = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-50 via-white  to-white  w-full mt-1  relative px-12 sm:px-0 pb-20 sm:pb-0">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94],
          staggerChildren: 0.2,
          delayChildren: 0.3,
        }}
        className="mx-auto text-center flex flex-col gap-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="lg:text-[70px] md:text-[45px] text-[29px] font-bold text-center"
        >
          Turn Your Thoughts into <br></br>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "backOut" }}
            className="bg-gradient-to-r from-blue-700 to-[#a71cc0] bg-clip-text text-transparent"
          >
            Intelligent Mind Maps
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-sm sm:text-md md:text-lg  lg:text-xl"
        >
          Share your thoughts and watch AI transform scattered ideas into
          organized,{!isMobile && <br></br>}interactive mind maps. Perfect for students,
          researchers, and creative minds.
        </motion.p>

        {/*cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="flex justify-center gap-3"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5, x: -50, y: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.8, ease: "backOut" },
              x: { duration: 0.8, delay: 0.8, ease: "backOut" },
            }}
            whileHover={{
              scale: 1.1,
              y: -10,
              transition: { duration: 0.3, ease: "easeOut", delay: 0 },
            }}
            className="flex flex-col items-center "
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
              <Lightbulb className="sm:w-10 w-8 h-8 sm:h-10 text-white" />
            </div>
            <h3 className="mt-4 text-md md:text-lg font-semibold">Think</h3>
            <p className="text-gray-500 text-xs md:text-sm">Spark your ideas</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [0, 15, 0],
            }}
            transition={{
              opacity: { duration: 0.5, delay: 1 },
              scale: { duration: 0.5, delay: 1 },
              x: {
                duration: 2.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: 1.2,
              },
            }}
          >
            <ArrowRight className="mt-8 text-blue-500" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              opacity: { duration: 0.8, delay: 1.2, ease: "backOut" },
              y: { duration: 0.8, delay: 1.2, ease: "backOut" },
            }}
            className="flex flex-col items-center "
            whileHover={{
              scale: 1.1,
              y: -10,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20  rounded-2xl bg-gradient-to-tr from-violet-500 to-violet-700 flex items-center justify-center shadow-lg">
              <Brain className="sm:w-10 w-8 h-8 sm:h-10 text-white" />
            </div>
            <h3 className="mt-4 text-sm md:text-lg font-semibold">AI Analyzes</h3>
            <p className="text-gray-500 text-xs md:text-sm">Processes intelligently</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [0, 15, 0],
            }}
            transition={{
              opacity: { duration: 0.5, delay: 1.2 },
              scale: { duration: 0.5, delay: 1.2 },
              x: {
                duration: 2.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: 1.4,
              },
            }}
          >
            <ArrowRight className="mt-8 text-violet-500" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{
              opacity: { duration: 0.8, delay: 1.2, ease: "backOut" },
              x: { duration: 0.8, delay: 1.2, ease: "backOut" },
            }}
            whileHover={{
              scale: 1.1,
              y: -10,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            className="flex flex-col items-center "
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg">
              <Network className="sm:w-10 w-8 h-8 sm:h-10 text-white" />
            </div>
            <h3 className="mt-4 text-sm md:text-lg font-semibold">MindMap Appears</h3>
            <p className="text-gray-500 text-xs md:text-sm">Visualize beautifully</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/mindmap"
              className="bg-gradient-to-r from-blue-500 to-purple-600 flex mx-auto rounded-[50px] justify-center gap-6 items-center px-4 py-3 md:px-8 md:py-5 text-lg md:text-xl lg:text-2xl text-white font-semibold transition-transform duration-300 hover:scale-105"
            >
              <Play />

              <p>Start your visual journy</p>
            </Link>
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="mt-5 text-sm text-gray-500"
          >
            No signup required <span className="mx-2">•</span>
            Start creating immediately <span className="mx-2">•</span>
            Export anywhere
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="mt-3 flex items-center justify-center gap-8 flex-wrap text-sm text-gray-700"
          >
            <motion.span
              className="flex items-center gap-2"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <motion.span
                className="inline-block h-2 w-2 rounded-full bg-green-500"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              ></motion.span>
              AI-Powered
            </motion.span>

            <motion.span
              className="flex items-center gap-2"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="h-4 w-4" />
              </motion.div>
              Real-time
            </motion.span>

            <motion.span
              className="flex items-center gap-2"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Text className="h-4 w-4" />
              </motion.div>
              text-First
            </motion.span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* cards */}
      <div className="  gap-6 mt-10 xl:mt-0 grid grid-col-1 md:grid-cols-2 xl:block  ">
        <motion.div
          onClick={() => navigate("/mindmap")}
          initial={{ opacity: 0, x: -100, rotate: -10 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{
            opacity: { duration: 1.2, delay: 2, ease: "backOut" },
            x: { duration: 1.2, delay: 2, ease: "backOut" },
            rotate: { duration: 0.2, delay: 0 },
          }}
          whileHover={{
            scale: 1.05,
            rotate: 2,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
          className="xl:absolute xl:top-32 xl:left-14   place-items-center md:place-items-end"
        >
          <Card1 />
        </motion.div>

        <motion.div
          onClick={() => navigate("/mindmap")}
          initial={{ opacity: 0, x: -100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            opacity: { duration: 1.2, delay: 2, ease: "backOut" },
            x: { duration: 1.2, delay: 2, ease: "backOut" },
            rotate: { duration: 0.2, delay: 0 },
          }}
          whileHover={{
            scale: 1.05,
            y: -10,
            transition: { duration: 0.3 },
          }}
          className="xl:absolute xl:bottom-10 xl:left-24  place-items-center md:place-items-start"
        >
          <Card3 />
        </motion.div>

        <motion.div
          onClick={() => navigate("/mindmap")}
          initial={{ opacity: 0, x: 100, rotate: 10 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{
            opacity: { duration: 1.2, delay: 2, ease: "backOut" },
            x: { duration: 1.2, delay: 2, ease: "backOut" },
            rotate: { duration: 0.2, delay: 0 },
          }}
          whileHover={{
            scale: 1.05,
            rotate: -2,
            transition: { duration: 0.3 },
          }}
          className="xl:absolute xl:top-32 xl:right-8  place-items-center md:place-items-end"
        >
          <Card2 />
        </motion.div>

        <motion.div
          onClick={() => navigate("/mindmap")}
          initial={{ opacity: 0, x: 100, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          transition={{
            opacity: { duration: 1.2, delay: 2, ease: "backOut" },
            x: { duration: 1.2, delay: 2, ease: "backOut" },
            rotate: { duration: 0.2, delay: 0 },
          }}
          whileHover={{
            scale: 1.05,
            x: -10,
            transition: { duration: 0.3 },
          }}
          className="xl:absolute xl:bottom-12 xl:right-24 place-items-center md:place-items-start"
        >
          <Card4 />
        </motion.div>
      </div>

      <div className="fixed bottom-3 right-4 text-sm text-gray-500 opacity-70 select-none pointer-events-none">
        Made by <span className="font-semibold">Savad</span>
      </div>
    </div>
  );
};
