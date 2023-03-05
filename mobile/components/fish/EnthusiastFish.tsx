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

function EnthusiastFish(props) {
    const description = [
        'Display spontaneity',
        'Like to show concern for others',
        'Look for change and expansiveness',
        'Has a hopeful search for happy experiences and relaxation'
    ];

    const file = require('../../assets/fish/Amber.png');

    return <BasicFish name="Enthusiast" file={file} description={description} style={props.style}/>
}

export default EnthusiastFish;
