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

function PragmatistFish(props) {
    const description = [
        'Display physical sensitivity',
        'Feeling there\'s no place to relax or no prospect of satisfaction',
        'Desires security and social affiliation due to conflicts or insecurity in the environment, in which the person may feel that he is unable to manage',
    ];

    const file = require('../../assets/fish/Tan.png');

    return <BasicFish name="Pragmatist" file={file} description={description} style={props.style}/>
}

export default PragmatistFish;
