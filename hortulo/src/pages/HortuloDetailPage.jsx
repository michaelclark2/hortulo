import { Box, Columns, Container, Hero } from "react-bulma-components";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import useContracts from "../hooks/contracts";
import { useState } from "react";
import Flower from "../components/Flower";
import FlowerStem from "../components/FlowerStem";

const HortuloDetailPage = (props) => {
  const { tokenId } = useParams();
  const { getTokenMetadata } = useContracts();
  const [metadata, setMetadata] = useState({});

  getTokenMetadata(tokenId).then((data) => {
    setMetadata(data);
  });

  const color = metadata?.attributes?.find((a) => a.trait_type === "color");
  const name = metadata?.name;
  const retiredCarbonAmount = metadata?.retiredCarbonAmount;

  const height = (retiredCarbonAmount * 100) | 0;

  return (
    <Layout>
      <Hero size="fullheight">
        <Hero.Header></Hero.Header>
        <Hero.Body alignItems="start">
          <Container>
            <Columns multiline={false} flexDirection="column">
              <Columns.Column>
                <Box>{name}</Box>
              </Columns.Column>
              <Columns.Column
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="end"
                style={{
                  height: height + 500,
                  flexBasis: "unset",
                  overflow: "hidden",
                }}
              >
                <Flower height={100} width={600} color={color?.value} />
                {height > 0 ? <FlowerStem height={height} /> : null}
              </Columns.Column>
            </Columns>
          </Container>
        </Hero.Body>
        <Hero.Footer></Hero.Footer>
      </Hero>
    </Layout>
  );
};

export default HortuloDetailPage;
