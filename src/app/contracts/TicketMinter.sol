// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EventTicket is ERC721, Ownable {
    uint256 private _tokenCounter;
    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC721("Event Tickets", "TICKET") Ownable(msg.sender) {
        _tokenCounter = 0;
    }

    function safeMint(address to, string memory uri) public {
        uint256 tokenId = _tokenCounter;
        _tokenCounter += 1;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function _setTokenURI(uint256 tokenId, string memory uri) internal {
        _tokenURIs[tokenId] = uri;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }
}