require('dotenv').config();
const contract = require("../artifacts/contracts/TechnoTrove.sol/TechnoTrove.json");
const ethers = require('ethers');

// Get Alchemy API Key
const API_KEY = process.env.API_KEY;

// Define an Alchemy Provider
const provider = new ethers.AlchemyProvider('sepolia', API_KEY)

// Create a signer
const privateKey = process.env.PRIVATE_KEY
const signer = new ethers.Wallet(privateKey, provider)

// Get contract ABI and address
const abi = contract.abi
const contractAddress = '0x630923461788B4366d203a17B9DBb93E638BAbA6'

// Create a contract instance
const technoTroveContract = new ethers.Contract(contractAddress, abi, signer)

// Get the NFT Metadata IPFS URL
const tokenUri = "https://gateway.pinata.cloud/ipfs/QmPgqV9RBprZR28iMqqL5BjviBcemZoAJGX4rkdXUXu7jJ"

// Call mintNFT function
const mintNFT = async () => {
    let technoTxn = await technoTroveContract.mintNFT(signer.address, tokenUri)
    await technoTxn.wait()
    console.log(`NFT Minted! Check it out at: https://sepolia.etherscan.io/tx/${technoTxn.hash}`)
}

mintNFT()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });