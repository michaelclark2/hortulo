import { Box, Columns, Container, Heading, Hero } from "react-bulma-components";
import Layout from "../components/Layout";
import { Link, useParams } from "react-router-dom";
import useContracts from "../hooks/contracts";
import { useState } from "react";
import Flower from "../components/Flower";
import FlowerStem from "../components/FlowerStem";
import { formatAddress } from "../utils";

const HortuloDetailPage = (props) => {
  const { tokenId } = useParams();
  const { getTokenMetadata } = useContracts();
  const [metadata, setMetadata] = useState({});

  getTokenMetadata(tokenId).then((data) => {
    setMetadata(data);
  });

  const color = metadata?.attributes?.find((a) => a.trait_type === "color");
  const name = metadata?.name;
  const owner = metadata?.owner;
  const retiredCarbonAmount = metadata?.retiredCarbonAmount;

  const height = (retiredCarbonAmount * 100) | 0;

  return (
    <Layout>
      <Hero size="fullheight">
        <Hero.Header></Hero.Header>
        <Hero.Body alignItems="start" style={{ overflow: "hidden" }}>
          <Container>
            <Columns multiline={false} flexDirection="column">
              <Columns.Column>
                <Box textAlign="center">
                  <Heading>{name}</Heading>
                  <p>
                    Owned by{" "}
                    <Link to={"/garden/" + owner}>{formatAddress(owner)}</Link>
                  </p>
                  <p>
                    Retired {retiredCarbonAmount} tons of CO<sup>2</sup>
                  </p>
                </Box>
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
