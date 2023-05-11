import { Container } from "react-bulma-components";
import Footer from "./Footer";
import Header from "./Header";

const Layout = (props) => {
  return (
    <>
      <Header />
      <Container>{props.children}</Container>
      <Footer />
    </>
  );
};

export default Layout;
