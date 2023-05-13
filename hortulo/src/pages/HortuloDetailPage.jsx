import { Hero } from "react-bulma-components";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";

const HortuloDetailPage = (props) => {
  const { tokenId } = useParams();
  return (
    <Layout>
      <Hero size="fullheight">
        <Hero.Header></Hero.Header>
        <Hero.Body>
          <h1>Hortulo Detail #{tokenId}</h1>
        </Hero.Body>
        <Hero.Footer></Hero.Footer>
      </Hero>
    </Layout>
  );
};

export default HortuloDetailPage;
