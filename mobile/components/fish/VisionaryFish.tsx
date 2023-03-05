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

function VisionaryFish(props) {
    const description = [
        'Favour imagination and intuition',
        'Believe in possibilities and want to be accepted',
        'Feeling emotionally sensitive ',
        'Have fear, insecurity or immaturity due to stress, anxiety, or instability'
    ];

    const file = require('../../assets/fish/Wild_Melon.png');

    return <BasicFish name="Visionary" file={file} description={description} style={props.style}/>
}

export default VisionaryFish;
