import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MindmapContext } from "../context/MindmapContext";
import { exportElementToPdf } from "../utils/exportPdf";
import toast from "react-hot-toast";

export const Nav = () => {
  const {
    showCanvas,
    setShowCanvas,
    startNewMindmap,
    setShowInput,
    showInput,
    setCurrentTitle,
    setCurrentText
  } = useContext(MindmapContext);

  const location = useLocation();
  const isMindmapPage = location.pathname === "/mindmap";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogoClick = () => {
    if (showCanvas) {
      setShowInput(true);
    }
    setShowCanvas(false);
    setIsMobileMenuOpen(false);
  };

  const handleExport = () => {
    toast.promise(exportElementToPdf("mindmap-canvas-area", "mindmap.pdf"), {
      loading: "Exporting mindmap...",
      success: "Mindmap exported successfully 🎉",
      error: "Failed to export mindmap ❌",
    });
    setIsMobileMenuOpen(false);
  };

  const handleNewMindmap = () => {
    startNewMindmap();
    setIsMobileMenuOpen(false);
    setCurrentText("")
    setCurrentTitle("")
  };

  return (
    <div className="w-full px-4 py-4 sm:px-6 sm:py-6 md:px-24 md:py-4">
      <header className="bg-white">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link
              to="/"
              onClick={handleLogoClick}
              className="flex items-center space-x-2 sm:space-x-3"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">
                  AI
                </span>
              </div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                MindMap AI
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-3 md:space-x-4">
            {showCanvas && (
              <div className="flex items-center space-x-2 md:space-x-3">
                <button
                  onClick={handleExport}
                  className="px-3 py-2 md:px-4 md:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-1 md:space-x-2 font-medium text-sm md:text-base"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="hidden md:inline">Export PDF</span>
                  <span className="md:hidden">PDF</span>
                </button>
              </div>
            )}
            {isMindmapPage && (showCanvas || showInput) ? (
              <button
                onClick={handleNewMindmap}
                className="px-3 py-2 md:px-4 md:py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm md:text-base"
              >
                <span className="hidden md:inline">New Mindmap</span>
                <span className="md:hidden">New</span>
              </button>
            ) : (
              <Link
                to="/mindmap"
                className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:bg-purple-200 transition-colors text-sm md:text-base"
              >
                Get Started
              </Link>
            )}
          </div>

          <div className="sm:hidden relative">
            {showCanvas ? (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isMobileMenuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            ) : (
              <Link
                to="/mindmap"
                className="w-full px-3  text-sm sm:text-md py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:bg-purple-200 transition-colors text-center font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            )}

            {isMobileMenuOpen && (
              <div className="w-30 z-50 sm:hidden absolute top-1 right-12 pb-4 border-t  border-gray-200 transition-all duration-300  ">
                <div className="flex flex-col space-y-3 ">
                  {showCanvas && (
                    <>
                      <button
                        onClick={handleExport}
                        className="w-full px-2 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2 font-medium"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <span>Export PDF</span>
                      </button>
                      <button
                        onClick={handleNewMindmap}
                        className="w-full px-2 py-2  text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                      >
                        New Mindmap
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};
