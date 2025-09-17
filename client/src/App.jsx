import { Outlet } from "react-router-dom";
import { Nav } from "./components/Nav";
import { MindmapProvider } from "./context/MindmapContext";
import { Toaster } from "react-hot-toast"; 

function App() {
  return (
    <div className="w-full min-h-screen">
      <MindmapProvider>
        <Nav />
        <Outlet />
        <Toaster position="top-right" reverseOrder={false} /> 
      </MindmapProvider>
    </div>
  );
}

export default App;
