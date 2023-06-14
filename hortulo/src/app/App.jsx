import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MintPage from "../pages/MintPage";
import GardenPage from "../pages/GardenPage";
import GardenExplorerPage from "../pages/GardenExplorerPage";
import HortuloDetailPage from "../pages/HortuloDetailPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/mint", element: <MintPage /> },
  { path: "/garden/", element: <GardenExplorerPage /> },
  { path: "/garden/:account", element: <GardenPage /> },
  { path: "/hortulo/:tokenId", element: <HortuloDetailPage /> },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
