import { Box, Columns, Container, Heading, Hero } from "react-bulma-components";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import useContracts from "../hooks/contracts";
import React, { useEffect, useState } from "react";
import HortuloList from "../components/HortuloList";
import { formatAddress } from "../utils";
import { useMasa } from "../hooks/masa";

const GardenPage = (props) => {
  const { account } = useParams();
  const { tokensByOwner } = useContracts();
  const [tokens, setTokens] = useState([]);
  const [owner, setOwner] = useState("");

  const { data: results } = tokensByOwner(account);

  const masa = useMasa();

  useEffect(() => {
    setTokens(results);
    setOwner(formatAddress(account));
    Promise.all([
      masa?.soulName.loadSoulNames(account),
      masa?.contracts.instances.SoulNameContract.extension(),
    ])
      .then(([soulnames, extension]) => {
        if (soulnames[0]) {
          setOwner(soulnames[0] + extension);
        }
      })
      .catch((err) => console.error(err));
  }, [results]);

  return (
    <Layout>
      <Hero size="fullheight">
        <Hero.Header mt={3}>
          <Columns justifyContent="center">
            <Columns.Column size="one-third">
              <Box>
                <Heading textAlign={"center"}>{owner}</Heading>
              </Box>
            </Columns.Column>
          </Columns>
        </Hero.Header>
        <Hero.Body alignItems="start">
          <Container>
            <HortuloList tokens={tokens} />
          </Container>
        </Hero.Body>
      </Hero>
    </Layout>
  );
};

export default React.memo(GardenPage);
