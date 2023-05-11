import { Button, Heading } from "react-bulma-components";
import Layout from "../components/Layout";
import useContracts from "../providers/contracts";

const MintPage = (props) => {
  const { mint } = useContracts();

  return (
    <Layout>
      <div className="Mint">
        <Heading>Minting Page</Heading>
        <Button onClick={() => mint()}>Mint</Button>
      </div>
    </Layout>
  );
};

export default MintPage;
