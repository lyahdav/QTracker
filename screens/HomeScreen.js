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

import { Entypo, Ionicons } from '@exponent/vector-icons';

import { MonoText } from '../components/StyledText';

class IconBarButton extends React.Component {
  constructor(props) {
    super(props);

    // TODO: probably cleaner way to do this
    if (typeof(props.disabled) === "undefined") {
      this.props.disabled = false;
    }
  }

  render() {
     return (
       <TouchableOpacity disabled={this.props.disabled} style={styles.navBarButton} onPress={this.props.onPress}>
         <Entypo name={this.props.iconName} size={32} style={this.props.disabled ? styles.disabledBarButtonIcon : ''} />
       </TouchableOpacity>
     );
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
      renderLeft: (route, props) => homeScreenSingleton._renderNavBarLeft(),
      renderRight: (route, props) => homeScreenSingleton._renderNavBarRight()
    },
  }

  // TODO: should initially be false, see onNavigationStateChange for more
  state = {
    backButtonEnabled: true,
    forwardButtonEnabled: true,
  };

  _renderNavBarLeft() {
    return (
      <View style={styles.buttonContainer}>
        <IconBarButton iconName="chevron-left" disabled={!this.state.backButtonEnabled} onPress={this._onPressBackButton}/>
        <IconBarButton iconName="chevron-right" disabled={!this.state.forwardButtonEnabled} onPress={this._onPressForwardButton}/>
      </View>
    );
  }

  _renderNavBarRight() {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.navBarButton} onPress={this._onPressRefreshButton}>
          <Ionicons name="ios-refresh" size={32} />
        </TouchableOpacity>
      </View>
    );
  }

  _onPressBackButton = () => {
    this.webView.goBack();
  }

  _onPressForwardButton = () => {
    this.webView.goForward();
  }

  _onPressRefreshButton = () => {
    this.webView.reload();
  }

  _onNavigationStateChange = (navState) => {
    // TODO: blocked by http://stackoverflow.com/questions/41512659/how-to-correctly-listen-to-navigation-changes-on-uiwebview
    // this.setState({
    //   backButtonEnabled: navState.canGoBack,
    //   forwardButtonEnabled: navState.canGoForward,
    // });
  }

  render() {
    return (
      <WebView
        source={{uri: 'http://facebook.com'}}
        style={{marginTop: 20}}
        ref={(webView) => {this.webView = webView; }}
        onNavigationStateChange={this._onNavigationStateChange}
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
    height: 32,
    width: 40,
  },
  disabledBarButtonIcon: {
    color: 'gray'
  }
});
