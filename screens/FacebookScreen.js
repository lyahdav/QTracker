import BaseWebViewScreen from './BaseWebViewScreen';

let facebookScreenSingleton = null; // TODO: find better way to do this

export default class FacebookScreen extends BaseWebViewScreen {
  constructor(props) {
    super(props);
    facebookScreenSingleton = this;
  }

  baseURL() {
    return 'http://facebook.com';
  }

  static route = {
    navigationBar: {
      title: 'Facebook',
      renderLeft: (route, props) => facebookScreenSingleton._renderNavBarLeft(),
      renderRight: (route, props) => facebookScreenSingleton._renderNavBarRight()
    },
  }
}
