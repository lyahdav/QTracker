import BaseWebViewScreen from './BaseWebViewScreen';

let facebookScreenSingleton = null; // TODO: find better way to do this

export default class FacebookScreen extends BaseWebViewScreen {
  constructor(props) {
    super(props);
    facebookScreenSingleton = this;
  }

  baseURL() {
    // TODO: this is purposely not 'https://m.facebook.com/' to get the home button to work correctly.
    // It can be updated once we fix the TODO in BaseWebViewScreen._onNavigationStateChange
    return 'https://m.facebook.com';
  }

  static route = {
    navigationBar: {
      title: 'Facebook',
      renderLeft: (route, props) => facebookScreenSingleton.renderNavBarLeft(),
      renderRight: (route, props) => facebookScreenSingleton.renderNavBarRight()
    },
  }
}
