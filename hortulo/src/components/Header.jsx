import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import { Heading, Navbar } from "react-bulma-components";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  const { isConnecting } = useAccount();
  return (
    <Navbar>
      <Navbar.Brand>
        <Navbar.Item>
          <Heading>Hortulo</Heading>
        </Navbar.Item>
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container>
          <Navbar.Item renderAs={NavLink} to="/">
            Mint
          </Navbar.Item>
          <Navbar.Item href="#">My Garden</Navbar.Item>
          <Navbar.Item href="#">Garden Explorer</Navbar.Item>
        </Navbar.Container>
        <Navbar.Container align="end">
          <Navbar.Item>
            <ConnectKitButton
              label={isConnecting ? "Connecting..." : "Connect"}
            />
          </Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
};

export default Header;
