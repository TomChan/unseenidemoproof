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

function PeacemakerFish(props) {
    const description = [
        'Display good self-control',
        'Focus on memory and logic',
        'Incline to compromise and moralise others',
    ];

    const file = require('../../assets/fish/Turqoise.png');

    return <BasicFish name="Peacemaker" file={file} description={description} style={props.style}/>
}

export default PeacemakerFish;
