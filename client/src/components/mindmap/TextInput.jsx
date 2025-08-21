import React, { useState } from "react";
import { motion } from "framer-motion";

const TextInput = ({ onGenerate, loading }) => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onGenerate(text, title);
    }
  };

  const exampleTexts = [
    "Machine learning is a subset of artificial intelligence that focuses on algorithms that can learn from data. It includes supervised learning, unsupervised learning, and reinforcement learning approaches.",
    "Climate change affects global weather patterns, ocean temperatures, ice cap melting, and biodiversity. It's caused by greenhouse gas emissions from human activities like fossil fuel burning.",
    "The human brain contains neurons that communicate through synapses. Memory formation involves encoding, storage, and retrieval processes in different brain regions like the hippocampus.",
  ];

  const loadExample = (example) => {
    setText(example);
    setTitle("Example Mindmap");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto pb-6 flex items-start  gap-6 "
    >
      <div className="bg-white rounded-xl shadow-lg p-8 flex-2">
        <h2 className="text-3xl font-bold text-center mb-2">
          Create Your AI Mindmap
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Paste any text and watch AI transform it into a beautiful mindmap
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mindmap Title (Optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title for your mindmap"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Text *
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your text here..."
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !text.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? "Generating..." : "Generate Mindmap with AI ✨"}
          </button>
        </form>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-8 flex-1">
          <h3 className="text-lg font-semibold mb-4">Try an Example:</h3>
          <div className="space-y-2">
            {exampleTexts.map((example, index) => (
              <button
                key={index}
                onClick={() => loadExample(example)}
                className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors"
              >
                {example.substring(0, 80)}...
              </button>
            ))}
          </div>
        </div>
    </motion.div>
  );
};

export default TextInput;
