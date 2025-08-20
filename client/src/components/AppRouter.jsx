import { createBrowserRouter } from "react-router-dom";
import  Mindmap  from "../pages/Mindmap";
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
        element: <Mindmap />,
      },
    ],
  },
]);

export default router;
