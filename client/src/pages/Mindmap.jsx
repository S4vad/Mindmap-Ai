import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TextInput from "../components/mindmap/TextInput";
import Sidebar from "../components/mindmap/Sidbar";
import MindmapCanvas from "../components/mindmap/MindmapCanvas";
import { apiCall, API_URL } from "../utils/api";

function Mindmap() {
  const [mindmaps, setMindmaps] = useState([]);
  const [currentMindmap, setCurrentMindmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    loadMindmaps();
  }, []);

  const loadMindmaps = async () => {
    try {
      const data = await apiCall(`${API_URL}/mindmaps`);
      setMindmaps(data);
    } catch (error) {
      console.error("Error loading mindmaps:", error);
    }
  };

  const generateMindmap = async (text, title) => {
    setLoading(true);
    try {
      const aiResponse = await apiCall(`${API_URL}/ai/generate-mindmap`, {
        method: "POST",
        body: JSON.stringify({ text }),
      });

      const { nodes: newNodes, edges: newEdges } = aiResponse;
      const mindmapData = {
        title: title || "Untitled Mindmap",
        description: text.substring(0, 100) + "...",
        nodes: newNodes,
        edges: newEdges,
        originalText: text,
      };

      const savedMindmap = await apiCall(`${API_URL}/mindmaps`, {
        method: "POST",
        body: JSON.stringify(mindmapData),
      });

      setCurrentMindmap(savedMindmap);
      setNodes(newNodes);
      setEdges(newEdges);
      setShowInput(false);
      loadMindmaps();
    } catch (error) {
      console.error("Error generating mindmap:", error);
      alert("Error generating mindmap. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadMindmap = async (mindmapId) => {
    try {
      const mindmap = await apiCall(`${API_URL}/mindmaps/${mindmapId}`);
      setCurrentMindmap(mindmap);
      setNodes(mindmap.nodes || []);
      setEdges(mindmap.edges || []);
      setShowInput(false);
    } catch (error) {
      console.error("Error loading mindmap:", error);
    }
  };

  const saveMindmap = async () => {
    if (!currentMindmap) return;
    try {
      const updatedData = { ...currentMindmap, nodes, edges };
      await apiCall(`${API_URL}/mindmaps/${currentMindmap._id}`, {
        method: "PUT",
        body: JSON.stringify(updatedData),
      });
      alert("Mindmap saved successfully!");
    } catch (error) {
      console.error("Error saving mindmap:", error);
      alert("Error saving mindmap.");
    }
  };

  const createNewMindmap = () => {
    setCurrentMindmap(null);
    setNodes([]);
    setEdges([]);
    setShowInput(true);
  };

  const exportMindmap = () => {
    if (!currentMindmap) return;
    const dataStr = JSON.stringify({ title: currentMindmap.title, nodes, edges }, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${currentMindmap.title || "mindmap"}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
     

      <div className="flex h-screen">
    
        <Sidebar mindmaps={mindmaps} onLoadMindmap={loadMindmap} currentMindmap={currentMindmap} />


        <div className="flex-1 flex flex-col">
          {showInput ? (
            <div className="flex-1 flex items-center justify-center">
              <TextInput onGenerate={generateMindmap} loading={loading} />
            </div>
          ) : (
            <div className="flex-1">
              <MindmapCanvas nodes={nodes} edges={edges} onNodesChange={setNodes} onEdgesChange={setEdges} mindmap={currentMindmap} />
            </div>
          )}
        </div>
      </div>


      {loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-gray-700">Generating mindmap with AI...</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Mindmap;
