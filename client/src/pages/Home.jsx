import React from "react";
import {
  Brain,
  Lightbulb,
  Network,
  ArrowRight,
  Play,
  Zap,
  Text,
} from "lucide-react";
import { Link } from "react-router-dom";
import Card1 from "../components/cards/Card1";
import Card2 from "../components/cards/card2";
import Card3 from "../components/cards/Card3";
import Card4 from "../components/cards/Card4";

export const Home = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 via-white to-white w-full mt-4 relative">
      <div className="mx-auto text-center flex flex-col gap-6">
        <h1 className="text-[70px] font-bold text-center  ">
          Turn Your Thoughts into <br></br>
          <span className="bg-gradient-to-r from-blue-700 to-[#a71cc0]  bg-clip-text text-transparent">
            Intelligent Mind Maps
          </span>
        </h1>
        <p className="text-xl">
          Share your thoughts and watch AI transform scattered ideas into
          organized,<br></br>interactive mind maps. Perfect for students,
          researchers, and creative minds.
        </p>

        <div className="flex  justify-center gap-3">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
              <Lightbulb className="w-10 h-10 text-white" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Think</h3>
            <p className="text-gray-500 text-sm">Spark your ideas</p>
          </div>

          {/* Arrow */}
          <ArrowRight className="text-4xl mt-8">→</ArrowRight>

          {/* Step 2: AI Analyzes */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">AI Analyzes</h3>
            <p className="text-gray-500 text-sm">Processes intelligently</p>
          </div>

          {/* Arrow */}
          <ArrowRight className="text-4xl mt-8">→</ArrowRight>

          {/* Step 3: MindMap Appears */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-green-700 to-emerald-400 flex items-center justify-center shadow-lg">
              <Network className="w-10 h-10 text-white" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">MindMap Appears</h3>
            <p className="text-gray-500 text-sm">Visualize beautifully</p>
          </div>
        </div>
        <div>
        
          <button>
            <Link
              to="/mindmap"
              className="bg-gradient-to-r from-blue-500 to-purple-600 flex mx-auto rounded-[50px] justify-center  gap-6 items-center px-8 py-5 text-2xl text-white font-semibold"
            >
              <Play />
              <p>Start your visual journy</p>
              <ArrowRight />
            </Link>
          </button>

          <p className="mt-5 text-sm text-gray-500">
            No signup required <span className="mx-2">•</span>
            Start creating immediately <span className="mx-2">•</span>
            Voice-powered AI
          </p>

          {/* Line 2: badges with icons */}
          <div className="mt-3 flex items-center justify-center gap-8 flex-wrap text-sm text-gray-700">
            <span className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>
              AI-Powered
            </span>

            <span className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Real-time
            </span>

            <span className="flex items-center gap-2">
              <Text className="h-4 w-4" />
              text-First
            </span>
          </div>
        </div>
      </div>
      <div className="absolute top-32 left-14 ">
        <Card1 />
      </div>
      <div className="absolute bottom-10 left-24">
        <Card3 />
      </div>
      <div className="absolute top-32 right-8">
        <Card2 />
      </div>
      <div className="absolute bottom-12 right-24">
        <Card4 />
      </div>
      <div className="fixed bottom-3 right-4 text-sm text-gray-500 opacity-70 select-none pointer-events-none">
        Developed by <span className="font-semibold">Savad</span>
      </div>
    </div>
  );
};
