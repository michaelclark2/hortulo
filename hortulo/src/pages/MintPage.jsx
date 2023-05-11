import { Button, Card, Columns, Heading, Hero } from "react-bulma-components";
import Layout from "../components/Layout";
import useContracts from "../hooks/contracts";
import Flower from "../components/Flower";
import { useEffect, useState } from "react";

const MintPage = (props) => {
  const { mint } = useContracts();

  const [flowerColor, setFlowerColor] = useState("blue");

  useEffect(() => {
    const interval = setInterval(() => {
      const colors = ["blue", "red", "orange", "yellow", "pink", "purple"];
      const index = Math.floor(Math.random() * colors.length);
      const randomColor = colors[index];

      setFlowerColor(randomColor);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <Hero>
        <Hero.Header>
          <Heading textAlign={"center"} textColor="light"></Heading>
        </Hero.Header>
        <Hero.Body>
          <Columns justifyContent="center">
            <Columns.Column className="is-half">
              <Card backgroundColor="light">
                <Card.Header></Card.Header>
                <Card.Content textAlign={"center"}>
                  <Flower className="rotate" color={flowerColor} />
                </Card.Content>
                <Card.Footer textAlign={"center"}>
                  <Card.Footer.Item>
                    <Button
                      size={"large"}
                      color={"danger"}
                      onClick={() => mint()}
                    >
                      Mint
                    </Button>
                  </Card.Footer.Item>
                </Card.Footer>
              </Card>
            </Columns.Column>
          </Columns>
          <Heading textAlign={"center"} textColor="light" mb={4}>
            Start offsetting your own carbon today!
          </Heading>
        </Hero.Body>
      </Hero>
    </Layout>
  );
};

export default MintPage;
