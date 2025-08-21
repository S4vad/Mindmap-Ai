import React, { useState } from "react";
import { motion } from "framer-motion";

const MindmapCanvas = ({ nodes, edges, onNodesChange, onEdgesChange, mindmap }) => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleNodeClick = (node) => {
    setSelectedNode(selectedNode?.id === node.id ? null : node);
  };

  const addNode = () => {
    const newNode = {
      id: `node-${Date.now()}`,
      data: { label: "New Concept" },
      position: { x: Math.random() * 400 + 200, y: Math.random() * 300 + 150 },
      type: "default",
    };
    onNodesChange([...nodes, newNode]);
  };

  const deleteNode = (nodeId) => {
    const updatedNodes = nodes.filter((node) => node.id !== nodeId);
    const updatedEdges = edges.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId
    );
    onNodesChange(updatedNodes);
    onEdgesChange(updatedEdges);
    setSelectedNode(null);
  };

  const updateNodeLabel = (nodeId, label) => {
    const updatedNodes = nodes.map((node) =>
      node.id === nodeId ? { ...node, data: { ...node.data, label } } : node
    );
    onNodesChange(updatedNodes);
  };

  return (
    <div className="h-full bg-gray-50 relative overflow-hidden">
      {/* Title */}
      {mindmap && (
        <div className="absolute top-4 left-4 z-10">
          <h2 className="text-2xl font-bold text-gray-800 bg-white px-4 py-2 rounded-lg shadow-sm">
            {mindmap.title}
          </h2>
        </div>
      )}

      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        <button onClick={addNode} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm">
          Add Node
        </button>
        <button onClick={() => setZoom(zoom * 1.2)} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 shadow-sm">
          Zoom In
        </button>
        <button onClick={() => setZoom(zoom * 0.8)} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 shadow-sm">
          Zoom Out
        </button>
      </div>

      {/* SVG Canvas */}
      <svg
        className="w-full h-full"
        style={{
          transform: `scale(${zoom}) translate(${panOffset.x}px, ${panOffset.y}px)`,
        }}
      >
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Edges */}
        {edges.map((edge) => {
          const sourceNode = nodes.find((n) => n.id === edge.source);
          const targetNode = nodes.find((n) => n.id === edge.target);
          if (!sourceNode || !targetNode) return null;
          return (
            <line
              key={edge.id}
              x1={sourceNode.position.x + 75}
              y1={sourceNode.position.y + 25}
              x2={targetNode.position.x + 75}
              y2={targetNode.position.y + 25}
              stroke="#6b7280"
              strokeWidth="2"
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            <rect
              x={node.position.x}
              y={node.position.y}
              width="150"
              height="50"
              rx="8"
              fill={selectedNode?.id === node.id ? "#3b82f6" : "#ffffff"}
              stroke={selectedNode?.id === node.id ? "#1d4ed8" : "#d1d5db"}
              strokeWidth="2"
              className="cursor-pointer hover:fill-blue-50"
              onClick={() => handleNodeClick(node)}
            />
            <text
              x={node.position.x + 75}
              y={node.position.y + 30}
              textAnchor="middle"
              className="text-sm font-medium select-none pointer-events-none"
              fill={selectedNode?.id === node.id ? "white" : "#374151"}
            >
              {node.data.label.length > 20 ? node.data.label.substring(0, 20) + "..." : node.data.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Node Editor */}
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-20 right-4 w-80 bg-white rounded-lg shadow-lg p-6 z-20"
        >
          <h3 className="text-lg font-semibold mb-4">Edit Node</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
              <input
                type="text"
                value={selectedNode.data.label}
                onChange={(e) => updateNodeLabel(selectedNode.id, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-2">
              <button onClick={() => setSelectedNode(null)} className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                Close
              </button>
              <button onClick={() => deleteNode(selectedNode.id)} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MindmapCanvas;
