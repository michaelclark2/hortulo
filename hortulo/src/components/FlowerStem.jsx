import { useEffect, useRef } from "react";
import flower from "../assets/flower.svg";

export const FlowerStem = ({ height }) => {
  const canvasRef = useRef();

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx?.reset();
      ctx.fillStyle = "green";
      ctx?.fillRect(295, 0, 10, height);
    }
  }, [height]);

  return <canvas ref={canvasRef} width="600" height={height} />;
};

export default FlowerStem;
