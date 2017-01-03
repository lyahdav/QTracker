import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  WebView
} from 'react-native';

import { Entypo } from '@exponent/vector-icons';

import { MonoText } from '../components/StyledText';

class BackButton extends React.Component {
  render() {
     return (
       <TouchableOpacity style={styles.navBarButton} onPress={this._onPressButton}>
         <Entypo name="chevron-left" size={32} />
       </TouchableOpacity>
     );
  }

  _onPressButton() {
    homeScreenSingleton.webView.goBack();
  }
}

class ForwardButton extends React.Component {
  render() {
     return (
       <TouchableOpacity style={styles.navBarButton} onPress={this._onPressButton}>
         <Entypo name="chevron-right" size={32} />
       </TouchableOpacity>
     );
  }

  _onPressButton() {
    homeScreenSingleton.webView.goForward();
  }
}

let homeScreenSingleton = null; // TODO: find better way to do this

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    homeScreenSingleton = this;
  }

  static route = {
    navigationBar: {
      title: 'Facebook',
      renderLeft: (route, props) => <View style={styles.buttonContainer}><BackButton /><ForwardButton /></View>
    },
  }

  render() {
    return (
      <WebView
        source={{uri: 'http://facebook.com'}}
        style={{marginTop: 20}}
        ref={(webView) => {this.webView = webView; }}
      />
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBarButton: {
    height: 28,
    width: 28,
  },
});
