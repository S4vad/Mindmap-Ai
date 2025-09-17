import { createBrowserRouter } from "react-router-dom";
import MindmapApp from "../pages/Mindmap";
import App from "../App";
import { Home } from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index:true,
        element: <Home />,
      },
      {
        path: "mindmap",
        element: <MindmapApp />,
      },
    ],
  },
]);

export default router;
