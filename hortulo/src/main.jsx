import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.jsx";
import "./index.css";
import "bulma/css/bulma.min.css";

import { CeloProvider } from "@celo/react-celo";
import "@celo/react-celo/lib/styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CeloProvider
      dapp={{
        name: "Hortulo",
        description: "Carbon offsets for mere mortals",
        url: "https://hortulo.world",
      }}
    >
      <App />
    </CeloProvider>
  </React.StrictMode>
);
