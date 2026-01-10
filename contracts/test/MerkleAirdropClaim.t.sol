// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { MerkleAirdropClaim } from "../src/MerkleAirdropClaim.sol";

contract MerkleAirdropClaimTest {
    event Claimed(address indexed account, uint256 amount);

    function testClaimSingleLeaf() external {
        uint256 amount = 1000;
        bytes32 root = keccak256(abi.encodePacked(address(this), amount));
        MerkleAirdropClaim claimContract = new MerkleAirdropClaim(root);

        bytes32[] memory proof = new bytes32[](0);
        claimContract.claim(proof, amount);

        require(claimContract.claimed(address(this)), "Claim not recorded");
    }

    function testDoubleClaimReverts() external {
        uint256 amount = 555;
        bytes32 root = keccak256(abi.encodePacked(address(this), amount));
        MerkleAirdropClaim claimContract = new MerkleAirdropClaim(root);

        bytes32[] memory proof = new bytes32[](0);
        claimContract.claim(proof, amount);

        (bool success, ) = address(claimContract).call(
            abi.encodeWithSelector(MerkleAirdropClaim.claim.selector, proof, amount)
        );
        require(!success, "Expected revert on double claim");
    }

    function testPauseBlocksClaim() external {
        uint256 amount = 777;
        bytes32 root = keccak256(abi.encodePacked(address(this), amount));
        MerkleAirdropClaim claimContract = new MerkleAirdropClaim(root);

        claimContract.pause();

        bytes32[] memory proof = new bytes32[](0);
        (bool success, ) = address(claimContract).call(
            abi.encodeWithSelector(MerkleAirdropClaim.claim.selector, proof, amount)
        );
        require(!success, "Expected revert while paused");

        claimContract.unpause();
        claimContract.claim(proof, amount);
        require(claimContract.claimed(address(this)), "Claim not recorded after unpause");
    }

    function testInvalidProofReverts() external {
        uint256 amount = 123;
        bytes32 root = keccak256(abi.encodePacked(address(this), amount));
        MerkleAirdropClaim claimContract = new MerkleAirdropClaim(root);

        bytes32[] memory proof = new bytes32[](0);
        (bool success, ) = address(claimContract).call(
            abi.encodeWithSelector(MerkleAirdropClaim.claim.selector, proof, amount + 1)
        );
        require(!success, "Expected revert for invalid proof");
    }
}
