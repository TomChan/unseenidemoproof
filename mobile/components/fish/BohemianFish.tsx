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

function BohemianFish(props) {
    const description = [
        'Display emotional coolness',
        'Want to remain free of obligation because of anxiety or other emotional rejection',
        'Defend or supress himself/herself against anxiety',
        'Don\'t want to get involved in emotionally intense situation'
    ];

    const file = require('../../assets/fish/Neon.png')

    return <BasicFish name="Bohemian" file={file} description={description} style={props.style}/>
}

export default BohemianFish;
