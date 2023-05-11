import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import { Heading, Navbar } from "react-bulma-components";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  const { address, isConnecting, isConnected } = useAccount();
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
            Home
          </Navbar.Item>
          <Navbar.Item renderAs={NavLink} to={"/garden"}>
            Garden Explorer
          </Navbar.Item>
          {isConnected ? (
            <>
              <Navbar.Item renderAs={NavLink} to={"/garden/" + address}>
                My Garden
              </Navbar.Item>
              <Navbar.Item renderAs={NavLink} to="/mint">
                Mint
              </Navbar.Item>
            </>
          ) : null}
        </Navbar.Container>
        <Navbar.Container align="end">
          <Navbar.Item>
            <ConnectKitButton
              showBalance
              showAvatar={false}
              theme="soft"
              label={isConnecting ? "Connecting..." : "Connect Wallet"}
            />
          </Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
};

export default Header;
