import { Box, Button, Form, Icon, Image } from "react-bulma-components";
import { useAccount } from "wagmi";
import useContracts from "../hooks/contracts";
import { useState } from "react";
import { formatEther } from "ethers/lib/utils.js";
import NCTSymbol from "../assets/asset_NCT.png";

const AddCarbonForm = ({ setIsShowForm }) => {
  const { address } = useAccount();
  const { getNCTTokenBalance, checkAllowanceNCT, approveNCT } = useContracts();
  const [NCTBalance, setNCTBalance] = useState(0);
  const [NCTAllowance, setNCTAllowance] = useState(0);
  const [amountToRetire, setAmountToRetire] = useState("");
  const [needsApproval, setNeedsApproval] = useState(true);

  getNCTTokenBalance().then((balance) => {
    setNCTBalance(formatEther(balance) * 1);
  });

  checkAllowanceNCT().then((allowance) => {
    setNCTAllowance(formatEther(allowance));
  });

  const handleFormChange = (e) => {
    const amount = e.target.value * 1;
    setAmountToRetire(amount);
    console.log(amount, NCTAllowance, NCTBalance);
    if (amount <= NCTAllowance && amount > 0) {
      setNeedsApproval(false);
    } else {
      setNeedsApproval(true);
    }
  };

  const handleApproval = (e) => {
    approveNCT(amountToRetire.toString()).then(() => {
      setNeedsApproval(false);
    });
  };

  return (
    <Box textAlign={"center"} m={"auto"}>
      <small>{Math.round(NCTBalance)} NCT available</small>
      <Form.Field kind="addon">
        <Form.Control
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Form.Input
            className="is-vertical-centered"
            size={"large"}
            type="number"
            textAlign={"center"}
            value={amountToRetire}
            onChange={handleFormChange}
            mb={2}
            style={{ width: "4em" }}
          />
          <Icon renderAs="img" src={NCTSymbol} />
        </Form.Control>
        <Form.Control>
          {needsApproval ? (
            <Button mr={2} color="danger" onClick={handleApproval}>
              Approve
            </Button>
          ) : (
            <Button mr={2} color="danger">
              Confirm
            </Button>
          )}
          <Button color="warning" onClick={() => setIsShowForm(false)}>
            Cancel
          </Button>
          <p>{NCTAllowance}</p>
        </Form.Control>
      </Form.Field>
    </Box>
  );
};

export default AddCarbonForm;
