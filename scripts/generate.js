const hre = require("hardhat");
const fs = require("fs");
require("dotenv").config({ path: ".env" });

const generateHortulo = (index) => {
  return {
    name: "Hortulo #" + index,
    description: "A carbon offset NFT",
    attributes: [
      {
        trait_type: "color",
        value: randomColor(),
      },
      {
        trait_type: "shape",
        value: randomShape(),
      },
      {
        trait_type: "leaf_shape",
        value: randomLeafShape(),
      },
    ],
  };
};

const randomColor = () => {
  const colors = ["red", "white", "yellow", "blue", "orange", "purple", "pink"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const randomShape = () => {
  const shapes = ["cup", "star", "tubular", "bell"];
  return shapes[Math.floor(Math.random() * shapes.length)];
};

const randomLeafShape = () => {
  const shapes = ["oval", "round", "heart", "triangle", "none"];
  return shapes[Math.floor(Math.random() * shapes.length)];
};

async function main() {
  for (let index = 0; index < 10000; index++) {
    const body = generateHortulo(index + 1);
    const basePath = "metadata/";
    const stream = fs.createWriteStream(basePath + String(index + 1) + ".json");
    stream.write(JSON.stringify(body));
    stream.on("finish", () => {
      console.log(body);
    });
    stream.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
