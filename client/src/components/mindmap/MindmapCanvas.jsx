import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";

export const MindmapCanvas = ({ mindmap, title }) => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [showTitle, setShowTitle] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastPanOffset, setLastPanOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [viewBox, setViewBox] = useState("0 0 1000 1000");
  const svgRef = useRef(null);
  const containerRef = useRef(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Responsive dimensions
  const nodeWidth = isMobile ? 100 : 180;
  const nodeHeight = isMobile ? 30 : 50;
  const nodeRx = isMobile ? 6 : 8;
  const fontSize = isMobile ? 11 : 14;
  const maxLabelLength = isMobile ? 12 : 25;

  // Loading state
  if (!mindmap || !mindmap.nodes || mindmap.nodes.length === 0) {
    return (
      <div className="h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div
            className={`${
              isMobile ? "w-16 h-16" : "w-20 h-20"
            } bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
          >
            <svg
              className={`${isMobile ? "w-8 h-8" : "w-10 h-10"} text-gray-400`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3
            className={`${
              isMobile ? "text-lg" : "text-xl"
            } font-semibold text-gray-900 mb-2`}
          >
            Ready for Your Mindmap
          </h3>
          <p className={`${isMobile ? "text-sm" : "text-base"} text-gray-600`}>
            Generate your mindmap to visualize it here
          </p>
        </div>
      </div>
    );
  }

  // Calculate bounds and viewBox
  const calculateViewBox = useCallback(() => {
    if (!mindmap.nodes || mindmap.nodes.length === 0) return "0 0 1000 1000";

    const bounds = mindmap.nodes.reduce(
      (acc, node) => {
        const x = node.position?.x || 0;
        const y = node.position?.y || 0;
        return {
          minX: Math.min(acc.minX, x),
          maxX: Math.max(acc.maxX, x + nodeWidth),
          minY: Math.min(acc.minY, y),
          maxY: Math.max(acc.maxY, y + nodeHeight),
        };
      },
      { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity }
    );

    const padding = isMobile ? 50 : 100;
    const width = bounds.maxX - bounds.minX + padding * 2;
    const height = bounds.maxY - bounds.minY + padding * 2;
    const x = bounds.minX - padding;
    const y = bounds.minY - padding;

    console.log("Calculated viewBox:", { x, y, width, height, bounds });
    return `${x} ${y} ${width} ${height}`;
  }, [mindmap.nodes, nodeWidth, nodeHeight, isMobile]);

  // Update viewBox when mindmap changes
  useEffect(() => {
    const newViewBox = calculateViewBox();
    setViewBox(newViewBox);

    // Reset zoom and pan for mobile
    if (isMobile) {
      setZoom(1);
      setPanOffset({ x: 0, y: 0 });
    } else {
      setZoom(0.7);
      setPanOffset({ x: 0, y: 0 });
    }
  }, [calculateViewBox, isMobile]);

  // Fit to screen
  const fitToScreen = useCallback(() => {
    setZoom(isMobile ? 1 : 0.7);
    setPanOffset({ x: 0, y: 0 });

    // Update viewBox to fit content
    const newViewBox = calculateViewBox();
    setViewBox(newViewBox);
  }, [calculateViewBox, isMobile]);

  // Event handlers
  const handlePointerDown = useCallback(
    (e) => {
      // Don't drag when clicking on nodes
      if (e.target.tagName === "rect" && e.target.getAttribute("data-node"))
        return;

      setIsDragging(true);
      const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
      const clientY = e.clientY || e.touches?.[0]?.clientY || 0;
      setDragStart({ x: clientX, y: clientY });
      setLastPanOffset(panOffset);
      e.preventDefault();
    },
    [panOffset]
  );

  const handlePointerMove = useCallback(
    (e) => {
      if (!isDragging) return;

      const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
      const clientY = e.clientY || e.touches?.[0]?.clientY || 0;

      const deltaX = clientX - dragStart.x;
      const deltaY = clientY - dragStart.y;

      setPanOffset({
        x: lastPanOffset.x + deltaX,
        y: lastPanOffset.y + deltaY,
      });
    },
    [isDragging, dragStart, lastPanOffset]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Zoom handlers
  const handleWheel = useCallback(
    (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const minZoom = 0.3;
      const maxZoom = isMobile ? 2 : 3;
      setZoom((prev) => Math.min(Math.max(prev * delta, minZoom), maxZoom));
    },
    [isMobile]
  );

  const handleZoomIn = () => {
    const maxZoom = isMobile ? 2 : 3;
    setZoom((prev) => Math.min(prev * 1.2, maxZoom));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev * 0.8, 0.3));
  };

  // Prevent default touch behaviors
  const handleTouchStart = useCallback((e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
    }
  }, []);

  return (
    <div
      className="w-full bg-gray-50 relative overflow-hidden"
      style={{ height: "auto", minHeight: "90vh" }}
    >
      {/* Controls - Fixed position */}
      <div
        className={`fixed ${
          isMobile ? "top-20 right-4" : "top-24 right-6"
        } z-30 flex flex-col space-y-2`}
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-1.5">
          <div className="flex space-x-1">
            <button
              onClick={handleZoomIn}
              className={`${
                isMobile ? "p-1.5" : "p-2"
              } hover:bg-gray-100 rounded transition-colors`}
              title="Zoom In"
            >
              <svg
                className={`${
                  isMobile ? "w-3.5 h-3.5" : "w-4 h-4"
                } text-gray-600`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
            <button
              onClick={handleZoomOut}
              className={`${
                isMobile ? "p-1.5" : "p-2"
              } hover:bg-gray-100 rounded transition-colors`}
              title="Zoom Out"
            >
              <svg
                className={`${
                  isMobile ? "w-3.5 h-3.5" : "w-4 h-4"
                } text-gray-600`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 12H6"
                />
              </svg>
            </button>
            <div className="border-l border-gray-200 mx-1"></div>
            <button
              onClick={fitToScreen}
              className={`${
                isMobile ? "p-1.5" : "p-2"
              } hover:bg-gray-100 rounded transition-colors`}
              title="Fit to Screen"
            >
              <svg
                className={`${
                  isMobile ? "w-3.5 h-3.5" : "w-4 h-4"
                } text-gray-600`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 px-2 py-1.5 text-xs text-gray-600 text-center">
          {Math.round(zoom * 100)}%
        </div>
      </div>

      {/* Title - Fixed position */}
      {showTitle && (
        <div
          className={`fixed ${
            isMobile
              ? "top-20 left-4 right-44 max-w-[calc(100vw-5rem)]"
              : "top-24 left-6 w-80"
          } rounded-lg shadow-lg z-30 bg-white/95 backdrop-blur-sm border border-gray-200`}
        >
          <div
            className={`flex items-center justify-between ${
              isMobile ? "px-3 py-2" : "px-4 py-3"
            }`}
          >
            <div className="min-w-0 flex-1">
              <h1
                className={`${
                  isMobile ? "text-sm" : "text-lg"
                } font-semibold text-gray-900 truncate`}
              >
                {title || "Mindmap"}
              </h1>
              {!isMobile && (
                <p className="text-sm text-gray-500">
                  {mindmap.nodes?.length || 0} concepts •{" "}
                  {mindmap.edges?.length || 0} connections
                </p>
              )}
            </div>
            <button
              onClick={() => setShowTitle(false)}
              className={`flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600 transition-colors ${
                isMobile ? "text-lg" : "text-xl"
              }`}
              title="Close"
            >
              <IoCloseOutline />
            </button>
          </div>
        </div>
      )}

      {/* SVG Canvas */}
      <div
        id="mindmap-canvas-area"
        className="absolute inset-0"
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        onWheel={handleWheel}
        style={{ touchAction: "none" }}
      >
        <svg
          ref={svgRef}
          className="w-full h-full"
          viewBox={viewBox}
          preserveAspectRatio="xMidYMid meet"
          style={{
            cursor: isDragging ? "grabbing" : "grab",
            transform: `scale(${zoom}) translate(${panOffset.x}px, ${panOffset.y}px)`,
            transformOrigin: "center center",
            transition: isDragging ? "none" : "transform 0.2s ease-out",
          }}
        >
          {/* Definitions */}
          <defs>
            {/* Grid patterns */}
            <pattern
              id="smallGrid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="#f1f5f9"
                strokeWidth="0.5"
              />
            </pattern>
            <pattern
              id="grid"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <rect width="100" height="100" fill="url(#smallGrid)" />
              <path
                d="M 100 0 L 0 0 0 100"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="1"
              />
            </pattern>

            {/* Gradients */}
            <linearGradient
              id="nodeGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f8fafc" />
            </linearGradient>
            <linearGradient
              id="centralGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>

            {/* Shadow filter */}
            <filter
              id="nodeShadow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1" />
            </filter>
          </defs>

          {/* Background grid */}
          <rect width="100%" height="100%" fill="url(#grid)" opacity="0.5" />

          {/* Connections */}
          {mindmap.edges?.map((edge) => {
            const sourceNode = mindmap.nodes.find((n) => n.id === edge.source);
            const targetNode = mindmap.nodes.find((n) => n.id === edge.target);
            if (!sourceNode || !targetNode) return null;

            const x1 = (sourceNode.position?.x || 0) + nodeWidth / 2;
            const y1 = (sourceNode.position?.y || 0) + nodeHeight / 2;
            const x2 = (targetNode.position?.x || 0) + nodeWidth / 2;
            const y2 = (targetNode.position?.y || 0) + nodeHeight / 2;

            return (
              <line
                key={edge.id || `${edge.source}-${edge.target}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={edge.type === "main" ? "#3b82f6" : "#94a3b8"}
                strokeWidth={edge.type === "main" ? 2 : 1.5}
                strokeDasharray={edge.type === "sub" ? "5,3" : "none"}
                strokeLinecap="round"
                opacity="0.8"
              />
            );
          })}

          {/* Nodes */}
          {mindmap.nodes?.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            const isCentral = node.type === "central";
            const x = node.position?.x || 0;
            const y = node.position?.y || 0;

            return (
              <g key={node.id}>
                <rect
                  x={x}
                  y={y}
                  width={nodeWidth}
                  height={nodeHeight}
                  rx={nodeRx}
                  fill={
                    isSelected
                      ? "#8b5cf6"
                      : isCentral
                      ? "url(#centralGradient)"
                      : "url(#nodeGradient)"
                  }
                  stroke={
                    isCentral ? "#1e40af" : isSelected ? "#7c3aed" : "#d1d5db"
                  }
                  strokeWidth={isCentral ? 2 : isSelected ? 2 : 1}
                  filter="url(#nodeShadow)"
                  className="cursor-pointer transition-all duration-200 hover:stroke-blue-400 hover:stroke-2"
                  data-node="true"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedNode(selectedNode?.id === node.id ? null : node);
                  }}
                />
                <text
                  x={x + nodeWidth / 2}
                  y={y + nodeHeight / 2 + 4}
                  textAnchor="middle"
                  className="select-none pointer-events-none font-medium"
                  style={{
                    fontSize: `${fontSize}px`,
                    fill: isSelected || isCentral ? "white" : "#374151",
                  }}
                >
                  {(node.data?.label || node.label || "Untitled").length >
                  maxLabelLength
                    ? (node.data?.label || node.label || "Untitled").substring(
                        0,
                        maxLabelLength - 3
                      ) + "..."
                    : node.data?.label || node.label || "Untitled"}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Node Details Panel */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{
              opacity: 0,
              y: isMobile ? "100%" : 0,
              x: isMobile ? 0 : 400,
            }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{
              opacity: 0,
              y: isMobile ? "100%" : 0,
              x: isMobile ? 0 : 400,
            }}
            className={`absolute ${
              isMobile
                ? "bottom-4 left-4 right-4 max-h-[60vh] rounded-xl"
                : "top-6 right-6 w-80 rounded-xl mt-20"
            } bg-white/95 backdrop-blur-sm shadow-xl border border-white/20 z-50`}
          >
            <div
              className={`${
                isMobile ? "p-4" : "p-6"
              } max-h-full overflow-y-auto`}
            >
              <div className="flex items-start justify-between mb-4">
                <h3
                  className={`${
                    isMobile ? "text-base" : "text-lg"
                  } font-bold text-gray-900`}
                >
                  Node Details
                </h3>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                >
                  <IoCloseOutline className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Title
                  </label>
                  <p className="text-gray-900 font-semibold mt-1">
                    {selectedNode.data?.label ||
                      selectedNode.label ||
                      "Untitled"}
                  </p>
                </div>

                {(selectedNode.data?.description ||
                  selectedNode.description) && (
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Description
                    </label>
                    <p className="text-gray-700 mt-1 text-sm leading-relaxed">
                      {selectedNode.data?.description ||
                        selectedNode.description}
                    </p>
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Category
                  </label>
                  <div className="mt-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {selectedNode.data?.category ||
                        selectedNode.category ||
                        "General"}
                    </span>
                  </div>
                </div>

                {selectedNode.type === "central" && (
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Type
                    </label>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Central Topic
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
