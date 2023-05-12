import { Box, Columns } from "react-bulma-components";
import HortuloImage from "./HortuloImage";

const HortuloList = ({ tokens, address }) => {
  return (
    <Columns justifyContent="center">
      {tokens.map((tokenId) => (
        <Columns.Column size={"one-fifth"} key={tokenId}>
          <Box>
            <HortuloImage tokenId={tokenId} />
          </Box>
        </Columns.Column>
      ))}
    </Columns>
  );
};

export default HortuloList;
