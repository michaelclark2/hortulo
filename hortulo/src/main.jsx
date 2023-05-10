import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.jsx";
import "./index.css";
import "bulma/css/bulma.min.css";
import { WagmiConfig, createClient } from "wagmi";
import { celo, celoAlfajores } from "wagmi/chains";
import { ConnectKitProvider, getDefaultClient } from "connectkit";

const alchemyId = import.meta.env.ALCHEMY_ID;

const client = createClient(
  getDefaultClient({
    appName: "Hortulo",
    alchemyId,
    chains: [celoAlfajores, celo],
  })
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <App />
      </ConnectKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
