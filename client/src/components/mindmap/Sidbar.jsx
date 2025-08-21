import React, { useState } from "react";
import { motion } from "framer-motion";

const Sidebar = ({ mindmaps, onLoadMindmap, currentMindmap }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-80"
      }`}
    >
    
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && <h2 className="text-lg font-semibold text-gray-800">Your Mindmaps</h2>}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 hover:bg-gray-100 rounded-md">
          <svg
            className={`w-5 h-5 transition-transform ${isCollapsed ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>


      <div className="flex-1 overflow-y-auto">
        {!isCollapsed && (
          <div className="p-4">
            {mindmaps.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">📝</div>
                <p className="text-gray-500 text-sm">No mindmaps yet</p>
                <p className="text-gray-400 text-xs">Create your first one!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {mindmaps.map((mindmap) => (
                  <motion.button
                    key={mindmap._id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onLoadMindmap(mindmap._id)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      currentMindmap?._id === mindmap._id
                        ? "bg-blue-50 border-blue-200 text-blue-900"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <div className="font-medium text-sm mb-1 truncate">{mindmap.title}</div>
                    <div className="text-xs text-gray-500 mb-2 line-clamp-2">{mindmap.description}</div>
                    <div className="text-xs text-gray-400">{formatDate(mindmap.updatedAt)}</div>
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Sidebar;
