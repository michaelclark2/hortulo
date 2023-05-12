const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Hortulo", function () {
  this.timeout(50000);

  let hortulo;
  let nct;
  let owner;
  let acc1;
  let acc2;

  const natureCarbonPoolToken = "0xfb60a08855389F3c0A66b29aB9eFa911ed5cbCB5";

  before(async function () {
    const Hortulo = await ethers.getContractFactory("Hortulo");

    const PoolToken = await ethers.getContractAt(
      "IToucanPoolToken",
      natureCarbonPoolToken
    );
    nct = await PoolToken.attach(natureCarbonPoolToken);

    [owner, acc1, acc2] = await ethers.getSigners();
    hortulo = await Hortulo.deploy(natureCarbonPoolToken);
    console.log("deployed to %s", hortulo.address);

    const approval = await nct
      .connect(acc1)
      .approve(hortulo.address, ethers.utils.parseEther("1"));
    await approval.wait();
    console.log("approved");
  });

  it("Should set the right owner", async function () {
    expect(await hortulo.owner()).to.equal(owner.address);
  });

  it("Should mint one NFT", async function () {
    const mint = await hortulo
      .connect(acc1)
      .mint({ value: ethers.utils.parseEther("0") });
    await mint.wait();
    expect(await hortulo.ownerOf(0)).to.be.equal(acc1.address);
  });

  it("Should offset carbon", async function () {
    const offsetCarbon = await hortulo
      .connect(acc1)
      .offsetCarbon(0, ethers.utils.parseEther("1"), {
        gasLimit: 500000,
      });
    expect(await offsetCarbon.wait()).to.not.be.reverted;
  });

  it("Should keep track of retired carbon", async function () {
    expect(await hortulo.getRetiredCarbonAmount(0)).to.be.equal(
      ethers.utils.parseEther("1")
    );
  });

  it("Should return list of tokenIds", async function () {
    const mint = await hortulo
      .connect(acc1)
      .mint({ value: ethers.utils.parseEther("0") });
    await mint.wait();

    expect(await hortulo.tokensByOwner(acc1.address)).to.be.lengthOf(2);
  });
});
