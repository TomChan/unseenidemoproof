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

function IndividualistFish(props) {
    const description = [
        'Display emotional emptiness, denial',
        'Willing to give up or protest against things which in his opinion is not, as it should be',
    ];

    const file = require('../../assets/fish/Celery.png');

    return <BasicFish name="Individualist" file={file} description={description} style={props.style}/>
}

export default IndividualistFish;
