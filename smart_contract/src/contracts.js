import { ethers } from "ethers";
import AtaTokenABI from "../abi/ataToken.abi.json";
import StakingAbi from "../abi/staking.abi.json";
import TrialTokenABI from "../abi/trialToken.abi.json";
import MyTimeControlABI from "../abi/myTimelockControl.json";
import GovernorABI from "../abi/myGovernor.json";
import UnseenCoinABI from "../abi/unseenCoin.abi.json";
import UnseenPoolABI from "../abi/unseenPool.abi.json";
import UnseenNFTABI from "../abi/unseenNFT.abi.json";

export const ATA_TOKEN_ADDRESS = "0x5E8F49F4062d3a163cED98261396821ae2996596";
export const ATA_TOKEN = new ethers.Contract(ATA_TOKEN_ADDRESS, AtaTokenABI);

export const STAKING_ADDRESS = "0xAC1BdE0464D932bf1097A9492dCa8c3144194890";
export const STAKING_CONTRACT = new ethers.Contract(
  STAKING_ADDRESS,
  StakingAbi
);

export const TRIAL_TOKEN_ADDRESS = "0xa548D639Da7633EA05293B2fda586c4DF0bB94Ba";
export const TRIAL_TOKEN = new ethers.Contract(TRIAL_TOKEN_ADDRESS, TrialTokenABI);

export const MY_TIME_CONTROL_ADDRESS = "0xac289eB3f52ACD973CFcC73dCC10830d0309CefF";
export const MY_TIME_CONTROL = new ethers.Contract(MY_TIME_CONTROL_ADDRESS, MyTimeControlABI);

export const GOVERNOR_ADDRESS = "0x596F4bc879f57B670647AaD01A4f111E93E59B4a";
export const GOVERNOR = new ethers.Contract(GOVERNOR_ADDRESS, GovernorABI);

export const UNSEEN_COIN_ADDRESS = "0x5BEf262a8fa0f56e47e73a2af654b55D21641343";
export const UNSEEN_COIN = new ethers.Contract(UNSEEN_COIN_ADDRESS, UnseenCoinABI);

export const UNSEEN_POOL_ADDRESS = "0xd6b805bBa3d65e42E13Febf1A4FC6f6aba48d372";
export const UNSEEN_POOL = new ethers.Contract(UNSEEN_POOL_ADDRESS, UnseenPoolABI);

export const UNSEEN_NFT_ADDRESS = "0x23d51C41E1E33939438e9B30f8E13931C8E39a9b";
export const UNSEEN_NFT = new ethers.Contract(UNSEEN_NFT_ADDRESS, UnseenNFTABI);