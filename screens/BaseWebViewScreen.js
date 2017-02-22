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

export default class BaseWebViewScreen extends React.Component {
  constructor(props) {
    super(props);
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
    const doorbellJS = `
        window.doorbellOptions = {
            appKey: 'q87dPNLHiGVntOR7D1WM51Mwf35XWysjXEeSTE2sVy7K5BzYgMCCJQkwuoYDBEaR'
        };
        (function(w, d, t) {
            var hasLoaded = false;
            function l() { if (hasLoaded) { return; } hasLoaded = true; window.doorbellOptions.windowLoaded = true; var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/5139?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g); }
            if (w.attachEvent) { w.attachEvent('onload', l); } else if (w.addEventListener) { w.addEventListener('load', l, false); } else { l(); }
            if (d.readyState == 'complete') { l(); }
        }(window, document, 'script'));
    `.trim();

    return (
      <WebView
        source={{uri: this.baseURL()}}
        injectedJavaScript={doorbellJS}
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
