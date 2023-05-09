import { useCelo } from "@celo/react-celo";
import "./App.css";
import { Button, Heading } from "react-bulma-components";

function App() {
  const { connect, address } = useCelo();
  return (
    <div className="App">
      <Heading>Hortulo</Heading>
      {address ? (
        <div>Connected to {address}</div>
      ) : (
        <Button onClick={connect}>Connect wallet</Button>
      )}
    </div>
  );
}

export default App;
