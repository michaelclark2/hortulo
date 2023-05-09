import { useState } from "react";
import "./App.css";
import { Heading } from "react-bulma-components";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Heading>Hortulo</Heading>
    </div>
  );
}

export default App;
