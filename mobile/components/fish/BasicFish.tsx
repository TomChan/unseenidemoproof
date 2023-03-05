import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  TextInput,
} from 'react-native';

type FishProps = {
    name: string;
    file: any;
    description: Array<string>;
    style: any;
}

type BulletProps = {
    text: string;
}

function Bullet(props: BulletProps) {
    // console.log(props.text)
    return (
        <View style={ styles.row }>
          <View style={ styles.bulletText }>
            <Text>{'\u2022' + " "} {props.text}</Text>
          </View>
        </View>
      );
}

function BasicFish(props: FishProps) {
    const data = props.description.map((info, key) => {
        return {
            text: info,
            key: key.toString()
        }
    })
    // console.log(data);
    return (
        <View style={[styles.top, props.style]}>
            <Image
              source={props.file}
              style={styles.logo}
              resizeMode="contain"
            ></Image>
            <Text style={styles.text}>{props.name}</Text>
            <FlatList
                data={data}
                renderItem={({item}) => <Bullet text={item.text} />}
                keyExtractor={item => item.key}
                style={styles.flatlist}
            />
            {/* {
                props.description.map((info, key) => {
                    return <Bullet text={info} key={key.toString()}></Bullet>
                })
            } */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
    top: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 0,
      height: '70%',
    },
    text: {
      fontSize: 25,
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'left',
    },
    logo:{
      width: 200,
      height: 200,
    },
    row: {
        padding: 10,
        marginHorizontal: 16,
    },
    bullet: {
        width: 10
    },
    bulletText: {
        flex: 1,
        fontSize: 18,
        color: '#2f354b',
        textAlign: 'left',
    },
    flatlist: {
        padding: 0,
        flexGrow: 0,
    }
  });

export default BasicFish;
