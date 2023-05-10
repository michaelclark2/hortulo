import { useAccount } from "wagmi";
import "./App.css";
import Header from "../components/Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";

const router = createBrowserRouter([{ path: "/", element: <Home /> }]);

function App() {
  const { address, isConnecting, isDisconnected } = useAccount();
  return (
    <div className="App">
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
