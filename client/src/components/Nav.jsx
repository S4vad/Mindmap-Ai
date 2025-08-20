import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Nav = () => {
  const [currentMindmap] = useState(false);
  const [mindmap] = useState(false);

  return (
    <div className="w-full px-24 pt-4 ">
      <header className="bg-white">
        <div className="flex justify-between items-center ">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">MindMap AI</h1>
          </motion.div>

          <div className="flex items-center space-x-4">
            {currentMindmap && (
              <>
                <button
                  // onClick={saveMindmap}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
                <button
                  // onClick={exportMindmap}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Export
                </button>
              </>
            )}
            {mindmap ? (
              // onClick={createNewMindmap}
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                New Mindmap
              </button>
            ) : (
              <Link to="/mindmap" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:bg-purple-200 transition-colors">

                Get Started
              </Link>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};
