import { Columns, Container, Heading, Hero } from "react-bulma-components";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import useContracts from "../hooks/contracts";
import React, { useEffect, useState } from "react";
import { formatEther } from "ethers/lib/utils.js";
import HortuloImage from "../components/HortuloImage";

const GardenPage = (props) => {
  const { account } = useParams();
  const { tokensByOwner } = useContracts();
  const [tokens, setTokens] = useState([]);

  const { data: results } = tokensByOwner(account);

  useEffect(() => {
    setTokens(results);
  }, [results]);

  console.log(results);

  return (
    <Layout>
      <Hero size="fullheight">
        <Hero.Header></Hero.Header>
        <Hero.Body>
          <Container>
            <Columns>
              {results?.map((tokenId) => (
                <Columns.Column>
                  <HortuloImage tokenId={tokenId} />
                </Columns.Column>
              ))}
            </Columns>
          </Container>
        </Hero.Body>
      </Hero>
    </Layout>
  );
};

export default React.memo(GardenPage);
