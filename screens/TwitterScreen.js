import BaseWebViewScreen from './BaseWebViewScreen';

let twitterScreenSingleton = null; // TODO: find better way to do this

export default class TwitterScreen extends BaseWebViewScreen {
  constructor(props) {
    super(props);
    twitterScreenSingleton = this;
  }

  baseURL() {
    return 'http://twitter.com';
  }

  static route = {
    navigationBar: {
      title: 'Twitter',
      renderLeft: (route, props) => twitterScreenSingleton._renderNavBarLeft(),
      renderRight: (route, props) => twitterScreenSingleton._renderNavBarRight()
    },
  }
}
