import { useAccount } from "wagmi";
import "./App.css";
import { ConnectKitButton } from "connectkit";
import { Button, Heading } from "react-bulma-components";

function App() {
  const { address, isConnecting, isDisconnected } = useAccount();
  return (
    <div className="App">
      <Heading>Hortulo</Heading>
      {address ? (
        <div>Connected to {address}</div>
      ) : (
        <ConnectKitButton>Connect wallet</ConnectKitButton>
      )}
    </div>
  );
}

export default App;
