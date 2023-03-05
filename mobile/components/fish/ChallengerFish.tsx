import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
} from 'react-native';

import BasicFish from './BasicFish'

function ChallengerFish(props) {
    const description = [
        'Display will power and strong emotions',
        'Desire for outstanding results and success',
        'Seek activities that give intensity and rich experiences',
        'Emphasize creativity, cooperation, or leadership for a wholesome life'
    ];

    const file = require('../../assets/fish/Safety_Orange.png');

    return <BasicFish name="Challenger" file={file} description={description} style={props.style}/>
}

export default ChallengerFish;
