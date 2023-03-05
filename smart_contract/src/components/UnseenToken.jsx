import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { UNSEEN_COIN, UNSEEN_COIN_ADDRESS, UNSEEN_POOL, UNSEEN_POOL_ADDRESS, UNSEEN_NFT } from "../contracts";

const getBalance = async (account, provider) => {
  const unseenCoin = UNSEEN_COIN.connect(provider);
  const balance = await unseenCoin.balanceOf(account);
  return [ethers.utils.formatEther(balance)];
};

const getPoolw2p = async (account, provider) => {
  const unseenPool = UNSEEN_POOL.connect(provider);
  const poolw2p = await unseenPool.w2p_supply();
  return [ethers.utils.formatEther(poolw2p)];
}

const getPoolw3p = async (account, provider) => {
  const unseenPool = UNSEEN_POOL.connect(provider);
  const poolw3p = await unseenPool.w3p_supply();
  return [ethers.utils.formatEther(poolw3p)];
}

const getSourceW2p = async (account, provider) => {
  const unseenPool = UNSEEN_POOL.connect(provider);
  const poolw2p = await unseenPool.source_token_in_w2p();
  return [ethers.utils.formatEther(poolw2p)];
}

const getSourceW3p = async (account, provider) => {
  const unseenPool = UNSEEN_POOL.connect(provider);
  const poolw3p = await unseenPool.source_token_in_w3p();
  console.log('Source 3p:', poolw3p);
  return [ethers.utils.formatEther(poolw3p)];
}

const getCurW3pValue =  async (account, provider) => {
  const unseenPool = UNSEEN_POOL.connect(provider);
  const poolw3p = await unseenPool.w3p_supply();
  const sourcew3p = await unseenPool.source_token_in_w3p();
  return [ethers.utils.formatEther(sourcew3p) / ethers.utils.formatEther(poolw3p)];
}


const approveTo = async (account, provider, to, value) => {
  const signer = provider.getSigner(account);
  const unseenCoin = UNSEEN_COIN.connect(signer);
  const tx = await unseenCoin.increaseAllowance(to, ethers.utils.parseEther(value));
  const successful = await tx.wait();
  return successful.status == 1;
};

const depositeToPool = async (account, provider, source, w2p) => {
  const signer = provider.getSigner(account);
  const unseenPool = UNSEEN_POOL.connect(signer);
  const tx = await unseenPool.deposit(ethers.utils.parseEther(source), ethers.utils.parseEther(w2p));
  const successful = await tx.wait();
  return successful.status == 1;
};

const convertInPool = async (account, provider, payloads) => {
  const signer = provider.getSigner(account);
  const unseenPool = UNSEEN_POOL.connect(signer);
  const tx = await unseenPool.convert(payloads.map((item) => { return {'to': item.to, 'amount': ethers.utils.parseEther(item.amount)}}));
  const successful = await tx.wait();
  return successful.status == 1;
};

const redeemInPool = async (account, provider, amount) => {
  const signer = provider.getSigner(account);
  const unseenPool = UNSEEN_POOL.connect(signer);
  const poolw3p = await unseenPool.w3p_supply();
  const sourcew3p = await unseenPool.source_token_in_w3p();
  const tx = await unseenPool.redeem(ethers.utils.parseEther(amount), ethers.utils.parseEther((amount * ethers.utils.formatEther(sourcew3p) / ethers.utils.formatEther(poolw3p)).toString()));
  const successful = await tx.wait();
  return successful.status == 1;
};

const mintNFT = async (account, provider) => {
  const signer = provider.getSigner(account);
  const unseenNFT = UNSEEN_NFT.connect(signer);
  const tx = await unseenNFT.mintNFT('ABC');
  const successful = await tx.wait();
  return successful.status == 1;
};

// const getAllNFT = async (account, provider) => {
//   const unseenNFT = UNSEEN_NFT.connect(provider);
//   const poolw3p = await unseenNFT.w3p_supply();
// }


const addUnseenTokenToMetaMask = async () => {
  if (!window.ethereum) {
    return false;
  }
  try {
    const added = await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: UNSEEN_COIN_ADDRESS,
          symbol: "USN",
          decimals: 18,
        },
      },
    });
    return added;
  } catch (error) {
    return false;
  }
};

const UnseenCoin = ({ account, provider }) => {
  const [balance, setBalance] = useState("");
  const [poolw2p, setpoolw2p] = useState("");
  const [poolw3p, setpoolw3p] = useState("");
  const [poolsourcew2p, setpoolsourcew2p] = useState("");
  const [poolsourcew3p, setpoolsourcew3p] = useState("");
  const [poolw3pvalue, setpoolw3pvalue] = useState("");
  const [transferAddress, setTransferAddress] = useState("");
  const [transferValue, setTransferValue] = useState(0);
  const [transferSuccessful, setTransferSuccessful] = useState(null);
  const [sourceDepositValue, setSourceDepositValue] = useState(0);
  const [w2pDepositValue, setW2pDepositValue] = useState(0);
  const [depositSuccessful, setDepositSuccessful] = useState(null);
  const [convertAddress, setconvertAddress] = useState('');
  const [convertAmount, setConvertAmount] = useState(0);
  const [convertSuccessful, setConvertSuccessful] = useState(null);
  const [redeemAmount, setRedeemAmount] = useState(0);
  const [redeemSuccessful, setRedeemSuccessful] = useState(null);
  const [mintSuccessful, setMintSuccessful] = useState(null);

  const updatePoolInfo = (account, provider) => {
    getPoolw2p(account, provider)
      .then((poolw2p) => {
        console.log(poolw2p);
        setpoolw2p(poolw2p);
      })
      .catch(console.error);

    getPoolw3p(account, provider)
      .then((poolw3p) => {
        setpoolw3p(poolw3p);
      })
      .catch(console.error);

    getSourceW2p(account, provider)
      .then((sourcew2p) => {
        setpoolsourcew2p(sourcew2p);
      })
      .catch(console.error);

    getSourceW3p(account, provider)
      .then((sourcew3p) => {
        setpoolsourcew3p(sourcew3p);
      })
      .catch(console.error);

    getCurW3pValue(account, provider)
      .then((cur_w3p_value) => {
        setpoolw3pvalue(cur_w3p_value);
      })
      .catch(console.error);
  }

  useEffect(() => {
    getBalance(account, provider)
      .then((balance) => {
        setBalance(balance);
      })
      .catch(console.error);

      updatePoolInfo(account, provider);

  }, [provider, account]);

  const handleTransferChange = function(event) {
    setTransferAddress(event.target.value);
  };

  const handleTransferValueChange = function(event) {
    setTransferValue(event.target.value);
  };

  const approve = function() {
    approveTo(account, provider, transferAddress, transferValue)
    .then((successful) => {
      setTransferSuccessful(successful);
      getBalance(account, provider)
      .then((balance) => {
        setBalance(balance);
      })
      .catch(console.error);
    })
    .catch(console.error);
  };

  const handleSourceDepositValueChange = function(event) {
    setSourceDepositValue(event.target.value);
  };

  const handleW2pDepositValueChange = function(event) {
    setW2pDepositValue(event.target.value);
  };

  const deposit = function() {
    depositeToPool(account, provider, sourceDepositValue, w2pDepositValue)
    .then((successful) => {
      setDepositSuccessful(successful);
      getBalance(account, provider)
      .then((balance) => {
        setBalance(balance);
      })
      .catch(console.error);
      updatePoolInfo(account, provider);
    })
    .catch(console.error);
  };

  const handleConvertAddressChange = function(event) {
    setconvertAddress(event.target.value);
  };

  const handleConvertAmountChange = function(event) {
    setConvertAmount(event.target.value);
  };

  const convert = function() {
    convertInPool(account, provider, [{to: convertAddress, amount: convertAmount}])
    .then((successful) => {
      setConvertSuccessful(successful);
      getBalance(account, provider)
      .then((balance) => {
        setBalance(balance);
      })
      .catch(console.error);
      updatePoolInfo(account, provider);
    })
    .catch(console.error);
  };

  const handleRedeemAmountChange = function(event) {
    setRedeemAmount(event.target.value);
  };

  const redeem = function() {
    redeemInPool(account, provider, redeemAmount)
    .then((successful) => {
      setRedeemSuccessful(successful);
      getBalance(account, provider)
      .then((balance) => {
        setBalance(balance);
      })
      .catch(console.error);
      updatePoolInfo(account, provider);
    })
    .catch(console.error);
  }

  const mint = function() {
    mintNFT(account, provider)
    .then((successful) => {
      setMintSuccessful(successful);
    })
    .catch(console.error);
  }

  if (!balance) {
    return (
      <div>
        <h2>Unseen Coin</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Unseen Coin</h2>
      <p>
        <strong>Unseen Coin balance:</strong> {balance} UST
      </p>
      <button onClick={addUnseenTokenToMetaMask}>Add to MetaMask</button>
      <hr/>
      <div>
        <strong>Approve:</strong>
        <input type="text" value={transferAddress} onChange={handleTransferChange}/>
        <input type="number" value={transferValue} onChange={handleTransferValueChange}/>
        <button onClick={approve}>Transfer</button>
        {transferSuccessful != undefined ?
          (
            <p>Approve {transferAddress} with amount {transferValue} is {transferSuccessful ? "successful" : "failed"}!!</p>
          ):
          (<div></div>)
        }
      </div>
      <hr/>
      <h2>Unseen Pool</h2>
      <div><strong>W2P:</strong> {poolw2p} W2P</div>
        
        
        <div><strong>W3P:</strong> {poolw3p} W3P</div>
        <div><strong>USN for W2P:</strong> {poolsourcew2p} USN</div>
        <div><strong>USN for W3P:</strong> {poolsourcew3p} USN</div>
        <div><strong>W3P Value:</strong> {poolw3pvalue} USN</div>

      <hr/>
      <div>
        <strong>Deposit to Pool:</strong>
        <input type="number" value={sourceDepositValue} onChange={handleSourceDepositValueChange}/>
        <input type="number" value={w2pDepositValue} onChange={handleW2pDepositValueChange}/>
        <button onClick={deposit}>Deposit</button>
        {depositSuccessful != undefined ?
          (
            <p>Deposit with amount {sourceDepositValue} with Token Value {w2pDepositValue} is {depositSuccessful ? "successful" : "failed"}!!</p>
          ):
          (<div></div>)
        }
      </div>
      <hr/>
      <div>
        <strong>Convert:</strong>
        <input type="text" value={convertAddress} onChange={handleConvertAddressChange}/>
        <input type="number" value={convertAmount} onChange={handleConvertAmountChange}/>
        <button onClick={convert}>Convert</button>
        {convertSuccessful != undefined ?
          (
            <p>Convert with amount {convertAmount} for address {convertAddress} is {convertSuccessful ? "successful" : "failed"}!!</p>
          ):
          (<div></div>)
        }
      </div>
      <hr/>
      <div>
        <strong>Redeem:</strong>
        <input type="number" value={redeemAmount} onChange={handleRedeemAmountChange}/>
        <button onClick={redeem}>Redeem</button>
        {redeemSuccessful != undefined ?
          (
            <p>Redeem with amount {redeemAmount} is {redeemSuccessful ? "successful" : "failed"}!!</p>
          ):
          (<div></div>)
        }
      </div>
      <hr/>
      <div>
        <button onClick={mint}>Mint NFT</button>
        {mintSuccessful != undefined ?
          (
            <p>Mint NFT is {mintSuccessful ? "successful" : "failed"}!!</p>
          ):
          (<div></div>)
        }
      </div>
    </div>
  );
};

export default UnseenCoin;
