import BaseWebViewScreen from './BaseWebViewScreen';

let instagramScreenSingleton = null; // TODO: find better way to do this

export default class InstagramScreen extends BaseWebViewScreen {
  constructor(props) {
    super(props);
    instagramScreenSingleton = this;
  }

  baseURL() {
    return 'http://instagram.com';
  }

  static route = {
    navigationBar: {
      title: 'Instagram',
      renderLeft: (route, props) => instagramScreenSingleton._renderNavBarLeft(),
      renderRight: (route, props) => instagramScreenSingleton._renderNavBarRight()
    },
  }
}
