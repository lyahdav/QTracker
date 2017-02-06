import {
  createRouter,
} from '@exponent/ex-navigation';

import FacebookScreen from '../screens/FacebookScreen';
import TwitterScreen from '../screens/TwitterScreen';
import InstagramScreen from '../screens/InstagramScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  home: () => FacebookScreen,
  links: () => LinksScreen,
  twitter: () => TwitterScreen,
  instagram: () => InstagramScreen,
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation,
}));
