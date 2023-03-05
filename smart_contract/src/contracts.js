import { ethers } from "ethers";
import UnseenCoinABI from "../abi/unseenCoin.abi.json";
import UnseenPoolABI from "../abi/unseenPool.abi.json";
import UnseenNFTABI from "../abi/unseenNFT.abi.json";

export const UNSEEN_COIN_ADDRESS = "0x5BEf262a8fa0f56e47e73a2af654b55D21641343";
export const UNSEEN_COIN = new ethers.Contract(UNSEEN_COIN_ADDRESS, UnseenCoinABI);

export const UNSEEN_POOL_ADDRESS = "0xd6b805bBa3d65e42E13Febf1A4FC6f6aba48d372";
export const UNSEEN_POOL = new ethers.Contract(UNSEEN_POOL_ADDRESS, UnseenPoolABI);

export const UNSEEN_NFT_ADDRESS = "0x23d51C41E1E33939438e9B30f8E13931C8E39a9b";
export const UNSEEN_NFT = new ethers.Contract(UNSEEN_NFT_ADDRESS, UnseenNFTABI);