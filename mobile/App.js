import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Linking from 'expo-linking';

import Wallet from './Wallet';
import WebComponent from './components/WebComponent';
import ResultComponent from './components/ResultComponent';

const prefix = Linking.createURL('/');

const Tab = createBottomTabNavigator();

const linking = {
    prefixes: [prefix],
    // Custom function to get the URL which was used to open the app
  async getInitialURL() {

    // As a fallback, you may want to do the default deep link handling
    const url = await Linking.getInitialURL();

    return url;
  },

  // Custom function to subscribe to incoming links
  subscribe(listener) {

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
      listener(url);
    });

    return () => {
      // Clean up the event listeners
      linkingSubscription.remove();
    };
  },
    config: {
        initialRouteName: 'Wallet',
        screens: {
          Wallet: {
            path: 'wallet'
          },
          Twitter: {
            path: 'twitter'
          },
          Result: {
            path: 'result/:fishId?',
          }
        }
      }
  };


export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Tab.Navigator>
        <Tab.Screen name="Wallet" component={Wallet} />
        <Tab.Screen name="Twitter" component={WebComponent} />
        <Tab.Screen name="Result" component={ResultComponent} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}