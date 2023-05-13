import { Box, Button, Form, Icon } from "react-bulma-components";
import { useContractWrite } from "wagmi";
import useContracts from "../hooks/contracts";
import { useState } from "react";
import { formatEther, parseEther } from "ethers/lib/utils.js";
import NCTSymbol from "../assets/asset_NCT.png";
import { Contracts } from "../utils/constants";
import HortuloABI from "../contracts/Hortulo.json";

const AddCarbonForm = ({ setIsShowForm, tokenId }) => {
  const { getNCTTokenBalance, checkAllowanceNCT, approveNCT } = useContracts();
  const [NCTBalance, setNCTBalance] = useState(0);
  const [NCTAllowance, setNCTAllowance] = useState(0);
  const [amountToRetire, setAmountToRetire] = useState("0");
  const [needsApproval, setNeedsApproval] = useState(true);

  getNCTTokenBalance().then((balance) => {
    setNCTBalance(formatEther(balance) * 1);
  });

  checkAllowanceNCT().then((allowance) => {
    setNCTAllowance(formatEther(allowance));
  });

  const { write: sendOffsetCarbon } = useContractWrite({
    address: Contracts.HORTULO_ADDRESS,
    abi: HortuloABI.abi,
    functionName: "offsetCarbon",
    args: [tokenId, parseEther(amountToRetire.toString() || "0")],
  });

  const handleFormChange = (e) => {
    const amount = e.target.value * 1;
    setAmountToRetire(amount);
    console.log(amount, NCTAllowance * 1, NCTBalance);
    if (amount <= NCTAllowance * 1 && amount > 0) {
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

  const handleOffsetCarbon = (e) => {
    sendOffsetCarbon();
    setIsShowForm(false);
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
            <Button mr={2} color="danger" onClick={handleOffsetCarbon}>
              Confirm
            </Button>
          )}
          <Button color="warning" onClick={() => setIsShowForm(false)}>
            Cancel
          </Button>
        </Form.Control>
      </Form.Field>
    </Box>
  );
};

export default AddCarbonForm;
