import { Box, Container, Heading, Hero, Section } from "react-bulma-components";
import Layout from "../components/Layout";
import Flower from "../components/Flower";

const HomePage = (props) => {
  return (
    <Layout>
      <Hero size={"fullheight"}>
        <Hero.Header></Hero.Header>
        <Hero.Body>
          <Container>
            <Heading textAlign={"center"}>Welcome to Hortulo!</Heading>
            <Section>
              <Box>
                <Flower
                  className="rotate"
                  width={25}
                  height={25}
                  color={"blue"}
                />
                Hortulo is a NFT project that is designed to evolve and grow
                proportionally to the amount of carbon credits that the user
                retires on the platform.
              </Box>
            </Section>
            <Section>
              <Box>
                The platform works by allowing users to purchase carbon credits
                from various sources, and then use those credits to evolve their
                NFTs. As more carbon credits are retired, the flower depicted in
                the NFT will grow and develop in size and complexity, creating a
                unique and visually stunning representation of the user's
                environmental impact.
                <Flower
                  className="rotate"
                  width={25}
                  height={25}
                  color={"orange"}
                />
              </Box>
            </Section>

            <Section>
              <Box>
                <Flower
                  className="rotate"
                  width={25}
                  height={25}
                  color={"red"}
                />
                Hortulo's unique approach to NFTs offers a new way for users to
                engage with and understand their carbon footprint. By creating a
                tangible and visual representation of their environmental
                efforts, the platform encourages users to take an active role in
                reducing their carbon emissions and making a positive impact on
                the planet.
              </Box>
            </Section>
          </Container>
        </Hero.Body>
        <Hero.Footer></Hero.Footer>
      </Hero>
    </Layout>
  );
};

export default HomePage;
