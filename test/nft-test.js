const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Hortulo", function () {
  this.timeout(50000);

  let myNFT;
  let owner;
  let acc1;
  let acc2;

  this.beforeEach(async function () {
    const Hortulo = await ethers.getContractFactory("Hortulo");
    [owner, acc1, acc2] = await ethers.getSigners();

    myNFT = await Hortulo.deploy();
  });

  it("Should set the right owner", async function () {
    expect(await myNFT.owner()).to.equal(owner.address);
  });

  it("Should mint one NFT", async function () {
    expect(await myNFT.balanceOf(acc1.address)).to.equal(0);

    const tx = await myNFT.connect(owner).safeMint(acc1.address);
    await tx.wait();

    expect(await myNFT.balanceOf(acc1.address)).to.equal(1);
  });
});
