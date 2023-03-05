import "@ethersproject/shims";

import { Buffer } from "buffer";
import { ethers } from "ethers";
global.Buffer = global.Buffer || Buffer;

import UnseenNFTABI from './unseenNFT.abi.json';

const providerUrl = "https://rpc.sepolia.org"; // Or your desired provider url
const UNSEEN_NFT_ADDRESS = "0x23d51C41E1E33939438e9B30f8E13931C8E39a9b";
const UNSEEN_NFT = new ethers.Contract(UNSEEN_NFT_ADDRESS, UnseenNFTABI);

const getChainId = async () => {
  try {
    const ethersProvider = ethers.getDefaultProvider(providerUrl);
    const networkDetails = await ethersProvider.getNetwork();
    return networkDetails;
  } catch (error) {
    return error;
  }
};

const getAccounts = async (key) => {
  try {
    const wallet = new ethers.Wallet(key);
    const address = await wallet.address;
    return address;
  } catch (error) {
    return error;
  }
};

const getBalance = async (key) => {
  try {
    const ethersProvider = ethers.getDefaultProvider(providerUrl);
    const wallet = new ethers.Wallet(key, ethersProvider);
    const balance = await wallet.getBalance();

    return balance;
  } catch (error) {
    return error;
  }
};

const sendTransaction = async (key) => {
  try {
    const ethersProvider = ethers.getDefaultProvider(providerUrl);
    const wallet = new ethers.Wallet(key, ethersProvider);

    const destination = "0x40e1c367Eca34250cAF1bc8330E9EddfD403fC56";

    // Convert 1 ether to wei
    const amount = ethers.utils.parseEther("0.001");

    // Submit transaction to the blockchain
    const tx = await wallet.sendTransaction({
      to: destination,
      value: amount,
      maxPriorityFeePerGas: "5000000000", // Max priority fee per gas
      maxFeePerGas: "6000000000000", // Max fee per gas
    });

    return tx;
  } catch (error) {
    return error;
  }
};

const signMessage = async (key) => {
  try {
    const ethersProvider = ethers.getDefaultProvider(providerUrl);
    const wallet = new ethers.Wallet(key, ethersProvider);

    const originalMessage = "YOUR_MESSAGE";

    // Sign the message
    const signedMessage = await wallet.signMessage(originalMessage);

    return signedMessage;
  } catch (error) {
    return error;
  }
};

const mintNFTRPC = async (key, uri) => {
  try {
    const ethersProvider = ethers.getDefaultProvider(providerUrl);
    const wallet = new ethers.Wallet(key, ethersProvider);

    const unseenNFT = UNSEEN_NFT.connect(wallet);
    const tx = await unseenNFT.mintNFT(ethers.utils.hexlify(ethers.utils.toUtf8Bytes(uri)));
    return tx;
  } catch(e) {
    return e;
  }
}

const fetchNFT = async (key) => {
    const ethersProvider = ethers.getDefaultProvider(providerUrl);
    const wallet = new ethers.Wallet(key, ethersProvider);

    const unseenNFT = UNSEEN_NFT.connect(wallet);
    console.log('Fetching address: ', wallet.address);
    const num = await unseenNFT.balanceOf(wallet.address);
    const numNFT = parseInt(num.toString());

    console.log('numNFT: ', numNFT);
    return numNFT;
}

export default {
  getChainId,
  getAccounts,
  getBalance,
  sendTransaction,
  signMessage,
  mintNFTRPC,
  fetchNFT,
};
