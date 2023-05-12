import { Box, Columns, Container, Heading, Hero } from "react-bulma-components";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import useContracts from "../hooks/contracts";
import React, { useEffect, useState } from "react";
import HortuloList from "../components/HortuloList";
import { formatAddress } from "../utils";

const GardenPage = (props) => {
  const { account } = useParams();
  const { tokensByOwner } = useContracts();
  const [tokens, setTokens] = useState([]);

  const { data: results } = tokensByOwner(account);

  useEffect(() => {
    setTokens(results);
  }, [results]);

  return (
    <Layout>
      <Hero size="fullheight">
        <Hero.Header mt={3}>
          <Columns justifyContent="center">
            <Columns.Column size="one-third">
              <Box>
                <Heading textAlign={"center"}>{formatAddress(account)}</Heading>
              </Box>
            </Columns.Column>
          </Columns>
        </Hero.Header>
        <Hero.Body alignItems="start">
          <Container>
            <HortuloList address={account} tokens={tokens} />
          </Container>
        </Hero.Body>
      </Hero>
    </Layout>
  );
};

export default React.memo(GardenPage);
