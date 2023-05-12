// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./interface/IToucanPoolToken.sol";
import "./interface/IToucanCarbonOffsets.sol";

contract Hortulo is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    string public baseURI;
    uint256 public cost = 0 ether;
    IToucanPoolToken public natureCarbonPoolToken;
    // tokenId => carbon tons
    mapping(uint256 => uint256) public retirements;

    constructor(
        IToucanPoolToken _natureCarbonPoolToken
    ) ERC721("Hortulo", "HORTULO") {
        setBaseURI(
            "https://ipfs.io/ipfs/QmZd7KPShj34GaqzUNSLVgWF7AYkvgRdktwhoFF5uJ1FQr/"
        );
        natureCarbonPoolToken = IToucanPoolToken(_natureCarbonPoolToken);
    }

    function mint() public payable {
        require(msg.value >= cost, "Insufficient balance");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function offsetCarbon(uint256 _tokenId, uint256 _amount) external virtual {
        require(
            this.ownerOf(_tokenId) == msg.sender,
            "You don't own this token"
        );
        require(_exists(_tokenId), "TokenId does not exist");
        require(
            natureCarbonPoolToken.balanceOf(msg.sender) >= _amount,
            "insufficient balance of NCT"
        );
        require(
            natureCarbonPoolToken.transferFrom(
                msg.sender,
                address(this),
                _amount
            ),
            "transfer failed"
        );

        (
            address[] memory tco2s,
            uint256[] memory amounts
        ) = natureCarbonPoolToken.redeemAuto2(_amount);

        for (uint i = 0; i < tco2s.length; i++) {
            IToucanCarbonOffsets(tco2s[i]).retire(amounts[i]);
            retirements[_tokenId] += amounts[i];
        }
    }

    function tokensByOwner(
        address _owner
    ) public view returns (uint256[] memory) {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint i = 0; i < tokenIds.length; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    function setCost(uint256 _newCost) public onlyOwner {
        cost = _newCost;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function getRetiredCarbonAmount(
        uint256 _tokenId
    ) public view returns (uint256) {
        return retirements[_tokenId];
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
