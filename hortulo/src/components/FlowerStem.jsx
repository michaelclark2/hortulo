import { useEffect, useRef } from "react";
import flower from "../assets/flower.svg";

export const FlowerStem = ({ width, height }) => {
  const canvasRef = useRef();

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx?.reset();
      ctx.fillStyle = "green";
      ctx?.fillRect(width / 2 - 5, 0, 10, height);
    }
  }, [width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default FlowerStem;
