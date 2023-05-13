import {
  Box,
  Button,
  Columns,
  Container,
  Heading,
  Hero,
} from "react-bulma-components";
import Layout from "../components/Layout";
import { Link, useParams } from "react-router-dom";
import useContracts from "../hooks/contracts";
import { useEffect, useState } from "react";
import Flower from "../components/Flower";
import FlowerStem from "../components/FlowerStem";
import { formatAddress } from "../utils";
import { useAccount } from "wagmi";
import AddCarbonForm from "../components/AddCarbonForm";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const HortuloDetailPage = (props) => {
  const { tokenId } = useParams();
  const { address } = useAccount();
  const { getTokenMetadata } = useContracts();
  const [metadata, setMetadata] = useState({});
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const [isShowRetireCarbon, setIsShowRetireCarbon] = useState(false);

  getTokenMetadata(tokenId).then((data) => {
    setMetadata(data);
  });

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
                {owner?.toLowerCase() === address?.toLowerCase() &&
                !isShowRetireCarbon ? (
                  <Button
                    color={"danger"}
                    size={"large"}
                    onClick={(e) => setIsShowRetireCarbon(true)}
                  >
                    Retire Carbon
                  </Button>
                ) : null}
                {isShowRetireCarbon ? (
                  <AddCarbonForm setIsShowForm={setIsShowRetireCarbon} />
                ) : null}
              </Columns.Column>
              <Columns.Column
                display={"flex"}
                invisible={isShowRetireCarbon}
                flexDirection="column"
                alignItems="center"
                justifyContent="end"
                style={{
                  height: height + 400,
                  flexBasis: "unset",
                  overflow: "hidden",
                }}
              >
                <Flower
                  height={100}
                  width={
                    windowDimensions?.width < 700
                      ? windowDimensions?.width - 100
                      : 600
                  }
                  color={color?.value}
                />
                {height > 0 ? (
                  <FlowerStem
                    width={
                      windowDimensions?.width < 700
                        ? windowDimensions?.width - 100
                        : 600
                    }
                    height={height}
                  />
                ) : null}
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
