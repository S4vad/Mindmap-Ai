import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const MindmapContext = createContext();

export const MindmapProvider = ({ children }) => {
  const [showCanvas, setShowCanvas] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const [currentText, setCurrentText] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [mindmap, setMindmap] = useState(null);
  const location = useLocation();

  const startNewMindmap = () => {
    setCurrentText("");
    setCurrentTitle("");
    setShowInput(true);
    setShowCanvas(false);
  };

  useEffect(() => {
    if (location.pathname !== "/mindmap") {
      setShowCanvas(false);
      setShowInput(true)
    }
  }, [location.pathname]);
  return (
    <MindmapContext.Provider
      value={{
        showCanvas,
        setShowCanvas,
        showInput,
        setShowInput,
        currentText,
        setCurrentText,
        currentTitle,
        setCurrentTitle,
        mindmap,
        setMindmap,
        startNewMindmap,
      }}
    >
      {children}
    </MindmapContext.Provider>
  );
};
