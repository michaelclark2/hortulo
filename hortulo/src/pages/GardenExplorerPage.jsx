import {
  Hero,
  Form,
  Columns,
  Container,
  Button,
  Message,
} from "react-bulma-components";
import Layout from "../components/Layout";
import { useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { useMasa } from "../hooks/masa";
import { useAccount } from "wagmi";

const GardenExplorerPage = (props) => {
  const [addressToSearch, setAddressToSearch] = useState("");
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const masa = useMasa();

  const tryToNavigateToGarden = async (e) => {
    e.preventDefault();
    if (!ethers.utils.isAddress(addressToSearch)) {
      const address = await masa?.soulName.resolve(addressToSearch);
      if (address) {
        navigate("/garden/" + address);
        setHasError(false);
        setError("");
      } else {
        setHasError(true);
        setError(addressToSearch + " is not associated with an address!");
        return;
      }
      setHasError(true);
      setError("Please enter a valid address!");
      return;
    }
    navigate("/garden/" + addressToSearch);
    setHasError(false);
  };

  return (
    <Layout>
      <Hero size={"fullheight"}>
        <Hero.Header></Hero.Header>
        <Hero.Body>
          <Container>
            <Columns justifyContent="center">
              <Columns.Column size={"two-thirds"}>
                <Form.Field
                  kind="addon"
                  renderAs="form"
                  onSubmit={tryToNavigateToGarden}
                >
                  <Form.Control textAlign={"center"}>
                    <Form.Label size={"large"}>
                      Search by address {isConnected ? "or .celo soulname" : ""}
                    </Form.Label>
                    {hasError ? (
                      <Message color={"danger"}>
                        <Message.Header></Message.Header>
                        <Message.Body>{error}</Message.Body>
                      </Message>
                    ) : (
                      <></>
                    )}
                    <Form.Input
                      size={"large"}
                      placeholder={
                        isConnected ? "username.celo" : "0x1234...5678"
                      }
                      textAlign={"center"}
                      value={addressToSearch}
                      onChange={(e) => {
                        setAddressToSearch(e.target.value);
                        setHasError(false);
                      }}
                    />

                    <Form.Field.Body invisible={!addressToSearch}>
                      <Form.Field>
                        <Button
                          my={3}
                          type="submit"
                          size={"large"}
                          color={"danger"}
                        >
                          Go
                        </Button>
                      </Form.Field>
                    </Form.Field.Body>
                  </Form.Control>
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
