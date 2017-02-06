import {
  createRouter,
} from '@exponent/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import TwitterScreen from '../screens/TwitterScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  home: () => HomeScreen,
  links: () => LinksScreen,
  twitter: () => TwitterScreen,
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation,
}));
