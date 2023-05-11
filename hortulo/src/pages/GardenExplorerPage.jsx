import {
  Hero,
  Form,
  Columns,
  Container,
  Button,
  Content,
  Heading,
} from "react-bulma-components";
import Layout from "../components/Layout";

const GardenExplorerPage = (props) => {
  return (
    <Layout>
      <Hero size={"fullheight"}>
        <Hero.Header></Hero.Header>
        <Hero.Body>
          <Container>
            <Columns justifyContent="center">
              <Columns.Column size={"half"}>
                <Form.Field>
                  <Form.Field.Body justifyContent="center">
                    <Form.Control textAlign={"center"}>
                      <Form.Label>Search by Address</Form.Label>
                      <Form.Input
                        size={"large"}
                        placeholder="0x0000...0000"
                        textAlign={"center"}
                      />
                    </Form.Control>
                    <Form.Control>
                      <Button color={"danger"} style={{ width: "100%" }}>
                        Search
                      </Button>
                    </Form.Control>
                  </Form.Field.Body>
                </Form.Field>
              </Columns.Column>
            </Columns>
          </Container>
        </Hero.Body>
        <Hero.Footer></Hero.Footer>
      </Hero>
    </Layout>
  );
};

export default GardenExplorerPage;
