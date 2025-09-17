import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import TextInputForm from "../components/mindmap/TextInput";
import { MindmapCanvas } from "../components/mindmap/MindmapCanvas";
import { MindmapContext } from "../context/MindmapContext";

// Configure API
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

const MindmapApp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    setShowCanvas,
    showInput,
    setShowInput,
    currentText,
    setCurrentText,
    currentTitle,
    setCurrentTitle,
    mindmap,
    setMindmap,
  } = useContext(MindmapContext);

  const generateMindmap = async (text, title) => {
    if (!text || text.trim().length < 10) {
      setError("Please enter at least 10 characters");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/generate-mindmap", {
        text: text.trim(),
        title: title?.trim() || "My Mindmap",
      });

      if (response.data.success) {
        setMindmap(response.data.mindmap);
        setCurrentText(text);
        setCurrentTitle(title || "My Mindmap");
        setShowInput(false);
        setShowCanvas(true);
      }
    } catch (error) {
      console.error("Error generating mindmap:", error);
      setShowInput(true);
      setError(error.response?.data?.error || "Failed to generate mindmap");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="max-w-4xl mx-auto mt-4 px-4"
          >
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-red-600 mr-3">⚠️</span>
                <span className="text-red-700">{error}</span>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-600 hover:text-red-800 font-bold"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main>
        <AnimatePresence mode="wait">
          {showInput ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-7xl mx-auto px-4 py-4"
            >
              <TextInputForm onGenerate={generateMindmap} loading={loading} />
            </motion.div>
          ) : (
            <motion.div
              key="mindmap"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full "
            >
              <MindmapCanvas mindmap={mindmap} title={currentTitle} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2"
          >
            <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md mx-auto text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-3 sm:border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                Creating Your Mindmap
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                AI is analyzing your text and building connections...
              </p>
              <div className="bg-gray-100 rounded-full h-2 mb-2">
                <div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full animate-pulse"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <p className="text-xs sm:text-sm text-gray-500">
                This usually takes 10-30 seconds
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              Transform any text into beautiful, interactive mindmaps
            </p>
            <p className="text-sm">
              Powered by advanced AI • No signup required • Export anywhere
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MindmapApp;
