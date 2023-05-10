import { Navbar } from "react-bulma-components";

const Footer = (props) => {
  return (
    <Navbar
      renderAs="footer"
      className="is-fixed-bottom has-text-centered is-spaced is-justify-content-center"
    >
      <Navbar.Item renderAs="p" textAlign={"center"}>
        &copy; Michael Clark, 2023
      </Navbar.Item>
    </Navbar>
  );
};

export default Footer;
