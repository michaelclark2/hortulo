import { Heading } from "react-bulma-components";
import Layout from "../components/Layout";

const Home = (props) => {
  return (
    <Layout>
      <div className="Home">
        <Heading textAlign={"center"}>Welcome!</Heading>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium,
          repudiandae amet dolor vero expedita illum accusantium, in
          consequuntur commodi, velit quo unde repellat sunt! Inventore est
          sapiente quam numquam expedita!
        </p>
      </div>
    </Layout>
  );
};

export default Home;
