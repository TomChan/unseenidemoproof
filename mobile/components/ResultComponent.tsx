import React, {Component, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native'

import BohemianFish from './fish/BohemianFish';
import ChallengerFish from './fish/ChallengerFish';
import EnthusiastFish from './fish/EnthusiastFish';
import IndividualistFish from './fish/IndividualistFish';
import InvestigatorFish from './fish/InvestigatorFish';
import PeacemakerFish from './fish/PeacemakerFish';
import PragmatistFish from './fish/PragmatistFish';
import VisionaryFish from './fish/VisionaryFish';

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


function ResultComponent({ route, navigation }) {
  const isFocused = useIsFocused();

  const [index, setIndex] = React.useState(0);

  const getFish = (i) => {
    return Fishes[i];
  }

  React.useEffect(() => {
    const params = route.params;
    console.log(params);
    // console.log('Result: ', data);

    if (params && params['fishId'] && params['fishId'] != -1) {
      setIndex(params['fishId']);
    } else {
      setIndex(Math.floor(Math.random() * 8) % 8);
    }
  }, [isFocused])

  const mintNFTAction = async () => {
    navigation.navigate({
      name: 'Wallet',
      params: { action: 'mint', data: {result: index, meta: 'https://twitter.com/UnseenID/status/1630319661324664832?cxt=HHwWgIC8uYPGh6AtAAAA' }},
      merge: true,
    })
  }

  return (
      <SafeAreaView style={styles.container}>
          <View style={styles.top}>  
            <View style={{height: '5%'}}>
              <Text style={{top: '80%', }}>You are experiencing the same vibe as a:</Text>
            </View>
            <View style={{height: '70%'}}>{getFish(index)}</View>
            {/* <BohemianFish style={{hei-ght: '70%'}}></BohemianFish> */}
            <View style={{height: '5%'}}>
              <Text style={{top: '15%'}}>(Confirm a different unseen vibe next time!)</Text>
            </View>
            <View style={{height: '15%'}}>
              <Button style={{top: '60%'}} title={'Mint NFT'} onPress={() => mintNFTAction()}></Button>
            </View>
            
          </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
    borderWidth: 4,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  bottom: {
    padding: 4,
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  button: {
    borderRadius: 10,
    padding: 8,
    backgroundColor: 'lightgray',
  },
  text: {
    color: 'black',
    padding: '10px',
  },
  logo:{
    width: 200,
    height: 200,
  },
  signup: {
    backgroundColor: 'white',
    color: '#3A59FF',
    width: "75%",
    borderRadius: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: "2%",
    fontSize:  27,
    marginTop: '70%'
  },
});

export default ResultComponent;
