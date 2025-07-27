"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const levels = [
  { id: 1, title: "1", status: "completed" },
  { id: 2, title: "2", status: "unlocked" },
  { id: 3, title: "3", status: "locked" },
  { id: 4, title: "4", status: "locked" },
  { id: 5, title: "5", status: "locked" },
  { id: 6, title: "6", status: "locked" },
];

export default function LevelSelectorPage() {
  const router = useRouter();

  return (
    <div className="p-6 mt-32 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-16 text-center tracking-tight text-gray-900"
      >
        Choose Your Level
      </motion.h1>

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-12 max-w-5xl mx-auto px-4">
        {levels.map((level, index) => {
          const isLocked = level.status === "locked";
          const isCompleted = level.status === "completed";
          const isUnlocked = level.status === "unlocked";

          const bgColor = isCompleted
            ? "bg-green-500 text-white border-green-600"
            : isUnlocked
              ? "bg-white text-blue-600 border-blue-500"
              : "bg-gray-200 text-gray-400 border-gray-300";

          const hoverEffect =
            isUnlocked || isCompleted
              ? "hover:bg-blue-50 cursor-pointer"
              : "cursor-not-allowed";

          const showLine = index < levels.length - 1;

          return (
            <div key={level.id} className="flex flex-col items-center relative">
              <div className="relative flex items-center">
                {/* Level circle */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-semibold border ${bgColor} ${hoverEffect} z-10`}
                  onClick={() => {
                    if (!isLocked) router.push(`/code/${level.id}`);
                  }}
                >
                  {isCompleted ? "✓" : isLocked ? "🔒" : level.title}
                </div>

                {/* Connector line */}
                {showLine && (
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-6 sm:w-10 h-0.5 bg-gray-300 z-0 ml-2"></div>
                )}
              </div>

              <div className="mt-2 text-sm font-medium text-gray-700">
                Level {level.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
