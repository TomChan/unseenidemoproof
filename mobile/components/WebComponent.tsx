import { Button, Dimensions, StyleSheet, Linking, View } from 'react-native';
import React, { Component } from "react";
import { WebView } from "react-native-webview"

// import { View } from '../components/Themed';

const jsCode = `
function setIntervalX(callback, delay) {
  var intervalID = window.setInterval(function () {

     const result = callback();

     if (result) {
         window.clearInterval(intervalID);
     }
  }, delay);
}

function task() {
  const missing = true;
  try {
    const articles = document.querySelectorAll("article");
    // alert('Root: ' + articles);
    articles.forEach((article) => {
      try {
        const linkElem = article.querySelector("a[dir='ltr']");
        const link = linkElem ? linkElem.getAttribute('href') : window.location.href;
        const root = article.querySelector("div[role='group']");
        if (!root.childNodes[root.childNodes.length - 1].getAttribute('data-origin')) {
          const extentionRoot = document.createElement("div");
          extentionRoot.setAttribute('data-origin', 'unseen');
          root.appendChild(extentionRoot);
          const shadow = extentionRoot.attachShadow({mode: "open"});
          const app = document.createElement("div");
          shadow.appendChild(app);

          const button = document.createElement("button");
          button.innerHTML = "Unseen";
          button.setAttribute('data-link', link);
          button.setAttribute('data-origina', 'unseen')
          button.addEventListener('click', function handleClick(event) {
            window.ReactNativeWebView.postMessage(encodeURI(link));
          });
          app.appendChild(button);
		    }
      } catch(e) {
        console.log(e);
        missing = false;
      }
    });
  } catch(e) {
    console.log(e);
    return false;
  }
  return false;
}

try {
  setIntervalX(task, 5000);
} catch(e) {
  alert(e);
}

//task();

true;`;

class WebComponent extends Component {
    constructor(props) {
        super(props);
        console.log('In constructor');
        this.webref = null;
        this.state = { shouldOpenWebview: false, switchToApp: false, uri: 'https://twitter.com' };
        console.log('Constructor state: ' + this.state);
    }

    render() {

      if (this.state.shouldOpenWebview) {
        return (
          <WebView 
            ref={(r) => (this.webref = r)}
            source={{ uri: this.state.uri }}
            icacheEnabled={false} 
            style = {{marginTop: 20, width: Dimensions.get('window').width, height: Dimensions.get('window').height}}
            onNavigationStateChange={this.handleWebViewNavigationStateChange}
            javaScriptEnabledAndroid={true}
            onLoadProgress={({ nativeEvent }) => {
              console.log('current event ' + JSON.stringify(nativeEvent));
              console.log(typeof(nativeEvent.progress));
              if (nativeEvent.progress == 1) {
                console.log('Progress 1');
                if (nativeEvent.url.includes('twitter.com/MattTom94823')) {
                  console.log('Correct URL: ' + nativeEvent.url);
                  this.webref.injectJavaScript(jsCode);
                }
              }
            }}
            onMessage={async (event) => {
               console.log('Event Data:', event.nativeEvent.data)
               this.setState({
                  uri: 'https://ethdenver-unseen.surge.sh?x=' + event.nativeEvent.data
              })
            }}
            onError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.warn('WebView error: ', nativeEvent);
            }}
          />
        );
      }
  
      return (
        <View style={styles.container}>
          <Button
            onPress={() => this.setState({shouldOpenWebview: true})}
            title='Open Twitter mobile site'
          />
        </View>
      );
    }

    handleWebViewLoadProgress(nativeEvent:any) {
      console.log(JSON.stringify(nativeEvent));
      if (nativeEvent.progress == 1) {
        if (nativeEvent.url.includes('twitter.com/MattTom94823/status/')) {
          console.log(nativeEvent.url);
          // this.webref.injectJavaScript(jsCode);
        }
      }
    }

    handleWebViewNavigationStateChange(newNavState:any) {
      const { url, title, loading, target } = newNavState;
      console.log(target);
      if (!url) return;
    };
}
  

const styles = StyleSheet.create({
container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
},
title: {
    fontSize: 20,
    fontWeight: 'bold',
},
separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
},
});

export default WebComponent;