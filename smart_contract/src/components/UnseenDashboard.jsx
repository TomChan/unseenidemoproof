import { ethers } from "ethers";
import React, {useState} from "react";
import UnseenTable from "./UnseenTable";

import { UNSEEN_COIN, UNSEEN_COIN_ADDRESS, UNSEEN_POOL, UNSEEN_POOL_ADDRESS, UNSEEN_NFT } from "../contracts";

const COLUMNS = [
    {
      Header: 'USDC value of token',
      accessor: (row) => {
        return row.w2p ? row.usdc / row.w2p : row.usdc / row.w3p;
      },
    },
    {
      Header: 'USDC Incentives/donation',
      accessor: 'usdc',
    },
    {
      Header: 'Token W2P',
      accessor: 'w2p',
    },
    {
      Header: 'Token W3P',
      accessor: 'w3p',
    },
    {
      Header: 'Liquidity Token',
      accessor: 'liquidity',
    },
    {
      Header: 'User Redeem',
      accessor: 'redeem',
    },
  ];

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

  const redeemInPool = async (account, provider, amount) => {
    const signer = provider.getSigner(account);
    const unseenPool = UNSEEN_POOL.connect(signer);
    const poolw3p = await unseenPool.w3p_supply();
    const sourcew3p = await unseenPool.source_token_in_w3p();
    const tx = await unseenPool.redeem(ethers.utils.parseEther(amount), ethers.utils.parseEther((amount * ethers.utils.formatEther(sourcew3p) / ethers.utils.formatEther(poolw3p)).toString()));
    const successful = await tx.wait();
    return successful.status == 1;
  };

const depositeToPool = async (account, provider, source, w2p) => {
    const signer = provider.getSigner(account);
    const unseenPool = UNSEEN_POOL.connect(signer);
    const tx = await unseenPool.deposit(ethers.utils.parseEther(source), ethers.utils.parseEther(w2p));
    const successful = await tx.wait();
    console.log(successful);
    return successful.status == 1;
};

const convertInPool = async (account, provider, payloads) => {
  const signer = provider.getSigner(account);
  const unseenPool = UNSEEN_POOL.connect(signer);
  const tx = await unseenPool.convert(payloads.map((item) => { return {'to': item.to, 'amount': ethers.utils.parseEther(item.amount)}}));
  const successful = await tx.wait();
  return successful.status == 1;
};

const UnseenDashboard = ({ account, provider }) => {
    const [data, setData] = React.useState([]);

    const [sourceDepositValue, setSourceDepositValue] = useState(0);
    const [w2pDepositValue, setW2pDepositValue] = useState(0);
    const [convertAmount, setConvertAmount] = useState(0);
    const [redeemAmount, setRedeemAmount] = useState(0);

    const handleSourceDepositValueChange = function(event) {
        setSourceDepositValue(event.target.value);
    };

    const handleW2pDepositValueChange = function(event) {
        setW2pDepositValue(event.target.value);
    };

    const handleConvertAmountChange = function(event) {
        setConvertAmount(event.target.value);
    };

    const handleRedeemAmountChange = function(event) {
        setRedeemAmount(event.target.value);
    };

    const deposit = function() {
        depositeToPool(account, provider, sourceDepositValue, w2pDepositValue)
        .then((successful) => {
          const post_desposit = async () => {
            const w2p = await getPoolw2p(account, provider);
            const usdc = await getSourceW2p(account, provider);
            const nData = JSON.parse(JSON.stringify(data));
            nData.push({usdc: usdc, w2p: w2p, w3p: null, liquidity: null, redeem: 'Deposit'});
            console.log(nData);
            setData(nData)
          }

          post_desposit();
          
        })
        .catch(console.error);
      };

      const convert = function() {
        convertInPool(account, provider, [{to: '0xa85ba3bfe5B9464460738D47B562546df21c0dEb', amount: convertAmount}])
        .then((successful) => {
          const post_convert = async () => {
            const w3p = await getPoolw3p(account, provider);
            const usdc = await getSourceW3p(account, provider);
            const nData = JSON.parse(JSON.stringify(data));
            nData.push({usdc: usdc, w2p: null, w3p: w3p, liquidity: null, redeem: 'Tonkenize'});
            console.log(nData);
            setData(nData);
          }

          post_convert();
        })
        .catch(console.error);
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


    return (
        <div>
            <div style={{flex:1, flexDirection: "columns"}}>
                <div style={{display: 'flex', flex:1, flexDirection: "columns", alignItems: "space-around"}}>
                    <strong>Deposit to Pool:</strong>
                    <p>USDC: </p><input type="number" value={sourceDepositValue} onChange={handleSourceDepositValueChange}/>
                    <p>W2P:</p><input type="number" value={w2pDepositValue} onChange={handleW2pDepositValueChange}/>
                    <button onClick={deposit}>Deposit</button>
                </div>
                <div style={{display: 'flex', flex:1, flexDirection: "columns", alignItems: "space-around"}}>
                    <strong>Tokenization:</strong>
                    <p>W2P:</p><input type="number" value={convertAmount} onChange={handleConvertAmountChange}/>
                    <button onClick={convert}>Tokenize</button>
                </div>
                <div style={{display: 'flex', flex:1, flexDirection: "columns", alignItems: "space-around"}}>
                    <strong>Redeem:</strong>
                    <input type="number" value={redeemAmount} onChange={handleRedeemAmountChange}/>
                    <button onClick={redeem}>Redeem</button>
                </div>
            </div>
            <div>
                <UnseenTable data={data} columns={COLUMNS}/>
            </div>
        </div>
    )
    
}

export default UnseenDashboard;