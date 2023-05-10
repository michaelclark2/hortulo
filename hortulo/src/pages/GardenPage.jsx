import { useEffect } from "react";
import { Heading } from "react-bulma-components";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

const GardenPage = (props) => {
  const { account } = useParams();
  return (
    <Layout>
      <div className="GardenPage">
        <Heading>Garden</Heading>
        <p>{account}</p>
      </div>
    </Layout>
  );
};

export default GardenPage;
