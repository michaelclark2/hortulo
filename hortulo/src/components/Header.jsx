import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import { Heading, Navbar } from "react-bulma-components";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Header = (props) => {
  const { address, isConnecting, isConnected } = useAccount();
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  return (
    <Navbar>
      <Navbar.Brand>
        <Navbar.Item>
          <NavLink to="/">
            <Heading>Hortulo</Heading>
          </NavLink>
        </Navbar.Item>
        <Navbar.Burger onClick={() => setIsBurgerActive(!isBurgerActive)} />
      </Navbar.Brand>
      <Navbar.Menu className={isBurgerActive ? "is-active" : ""}>
        <Navbar.Container>
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
      </Navbar.Menu>
      <Navbar.Container align="end" mobile={{ textAlign: "center" }}>
        <Navbar.Item>
          <ConnectKitButton
            showBalance
            showAvatar={false}
            theme="soft"
            label={isConnecting ? "Connecting..." : "Connect Wallet"}
            options={{ avoidLayoutShift: false }}
          />
        </Navbar.Item>
      </Navbar.Container>
    </Navbar>
  );
};

export default Header;
