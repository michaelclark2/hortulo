import { useAccount } from "wagmi";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MintPage from "../pages/MintPage";
import GardenPage from "../pages/GardenPage";
import GardenExplorerPage from "../pages/GardenExplorerPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/mint", element: <MintPage /> },
  { path: "/garden/", element: <GardenExplorerPage /> },
  { path: "/garden/:account", element: <GardenPage /> },
]);

function App() {
  const { address, isConnecting, isDisconnected } = useAccount();
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
