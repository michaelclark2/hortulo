import { ConnectKitButton } from "connectkit";
import { Heading } from "react-bulma-components";

const Header = (props) => {
  return (
    <div className="Header">
      <Heading>Hortulo</Heading>
      <ConnectKitButton />
    </div>
  );
};

export default Header;
