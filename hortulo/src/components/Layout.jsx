import { Container } from "react-bulma-components";
import Footer from "./Footer";
import Header from "./Header";

const Layout = (props) => {
  return (
    <div>
      <Header />
      <Container>{props.children}</Container>
      <Footer />
    </div>
  );
};

export default Layout;
