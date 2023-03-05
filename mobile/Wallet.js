import Web3Auth, { LOGIN_PROVIDER, OPENLOGIN_NETWORK } from "@web3auth/react-native-sdk";
import Constants, { AppOwnership } from "expo-constants";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import { Button, Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

import WebComponent from "./components/WebComponent";

import RPC from "./ethersRPC"; // for using ethers.js

import BohemianFish from './components/fish/BohemianFish';
import ChallengerFish from './components/fish/ChallengerFish';
import EnthusiastFish from './components/fish/EnthusiastFish';
import IndividualistFish from './components/fish/IndividualistFish';
import InvestigatorFish from './components/fish/InvestigatorFish';
import PeacemakerFish from './components/fish/PeacemakerFish';
import PragmatistFish from './components/fish/PragmatistFish';
import VisionaryFish from './components/fish/VisionaryFish';

const resolvedRedirectUrl =
  Constants.appOwnership == AppOwnership.Expo || Constants.appOwnership == AppOwnership.Guest
    ? Linking.createURL("web3auth", {})
    : Linking.createURL("web3auth", { scheme });

const clientId = "BKtYs6fy-ZLh__jgvpLl-plo7GCv6LOp9F0wYDd9WjNNt5_Prz4n9B-zU2_NEXFjfSBfNg_FQwdh7AVDKc-m7iQ";
const providerUrl = "https://rpc.sepolia.org"; // Or your desired provider url


const Fishes = {
  0: <BohemianFish></BohemianFish>,
  1: <ChallengerFish></ChallengerFish>,
  2: <EnthusiastFish></EnthusiastFish>,
  3: <IndividualistFish></IndividualistFish>,
  4: <InvestigatorFish></InvestigatorFish>,
  5: <PeacemakerFish></PeacemakerFish>,
  6: <PragmatistFish></PragmatistFish>,
  7: <VisionaryFish></VisionaryFish>
}

export default function Wallet({ navigation, route }) {
  const [key, setKey] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [console, setConsole] = useState("");
  const [nfts, setNFTs] = useState([]);

  const login = async () => {
    try {
      setConsole("Logging in");
      const web3auth = new Web3Auth(WebBrowser, {
        clientId,
        network: OPENLOGIN_NETWORK.CYAN, // or other networks
      });
      const info = await web3auth.login({
        loginProvider: LOGIN_PROVIDER.GOOGLE,
        redirectUrl: resolvedRedirectUrl,
        mfaLevel: "none",
        curve: "secp256k1",
      });

      setUserInfo(info);
      setKey(info.privKey);
      uiConsole("Logged In");
    } catch (e) {
      uiConsole(e);
    }
  };

  const mintNFTRPC = async () => {
    setConsole('Minting NFT');
    const message = await RPC.mintNFTRPC('ABC');
    uiConsole(message);
  }

  // For minting NFT
  React.useEffect(() => {
    if (route.params?.action == 'mint') {
      const mint = async () => {
        const message = await RPC.mintNFTRPC(key, JSON.stringify(route.params.data));
        alert('A NFT will be added shortly to your collections');
        return message;
      }
      mint().catch(console.error);
    }
  }, [route.params?.action]);

  React.useEffect(() => {
    if (key) {
      const fetch = async () => {
        const num = await RPC.fetchNFT(key);
        return num;
      }
      fetch().catch(console.error)
      .then((num) => {
        const ns = []
        for (let i=0; i<num; ++i) {
          ns.push(Fishes[Math.floor(Math.random() * 8) % 8])
        }
        setNFTs(ns);
      });
    }
  }, [key])

  const nftView = (
    <View>
      <Text>NFT Collections</Text>
      {
      (nfts.length == 0 && (
        <View><Text>Pending to add NFTs</Text></View>
      ))
    }
      {
      (nfts.length > 0 && (
        <ScrollView>
        {nfts}
      </ScrollView>
      ))
    }
    </View>
  );

  const unloggedInView = (
    <View style={styles.buttonArea}>
      <Button title="Login with Web3Auth" onPress={login} />
    </View>
  );

  return (
    <View style={styles.container}>
      {key ? nftView : unloggedInView}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    paddingBottom: 30,
  },
  consoleArea: {
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  console: {
    flex: 1,
    backgroundColor: "#CCCCCC",
    color: "#ffffff",
    padding: 10,
    width: Dimensions.get("window").width - 60,
  },
  consoleText: {
    padding: 10,
  },
  buttonArea: {
    flex: 2,
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 30,
  },
});
