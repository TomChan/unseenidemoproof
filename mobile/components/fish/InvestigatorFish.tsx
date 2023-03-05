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

function InvestigatorFish(props) {
    const description = [
        'Display emotional peace',
        'Desire social ties and harmony',
        'Emotionally need to feel calm and orderly',
        'Emphasize physical need for rest and relaxation due to tension'
    ];

    const file = require('../../assets/fish/Dodger_Blue.png');

    return <BasicFish name="Investigator" file={file} description={description} style={props.style}/>
}

export default InvestigatorFish;
