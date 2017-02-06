import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import {
  Notifications,
} from 'exponent';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@exponent/ex-navigation';
import {
  FontAwesome,
} from '@exponent/vector-icons';

import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

import GlobalTimer from '../utilities/GlobalTimer';
import DailyTimeLimitHandler from '../utilities/DailyTimeLimitHandler';

export default class RootNavigation extends React.Component {
  constructor(props) {
    super(props);

    GlobalTimer.instance().addObserver(this);
    this.state = { elapsedSecondsToday: 0 };
  }

  fire(elapsedSecondsToday) {
    this.setState({ elapsedSecondsToday: elapsedSecondsToday });
  }

  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return (
      <TabNavigation
        tabBarHeight={56}
        initialTab="home">
        <TabNavigationItem
          id="home"
          renderIcon={isSelected => this._renderIcon('facebook', isSelected)}>
          <StackNavigation initialRoute="home" />
        </TabNavigationItem>
        <TabNavigationItem
          id="twitter"
          renderIcon={isSelected => this._renderIcon('twitter', isSelected)}>
          <StackNavigation initialRoute="twitter" />
        </TabNavigationItem>
        <TabNavigationItem
          id="settings"
          title={this.state.elapsedSecondsToday}
          renderTitle={this._renderTitle}
          renderIcon={isSelected => this._renderIcon('cog', isSelected)}>
          <StackNavigation initialRoute="settings" />
        </TabNavigationItem>
      </TabNavigation>
    );
  }

  _renderTitle = (isSelected, title) => {
    let elapsedSeconds = this.state.elapsedSecondsToday;

    // TODO: DRY - in SettingsScreen.js too
    var date = new Date(null);
    date.setSeconds(elapsedSeconds);
    let elapsedSecondsString = date.toISOString().substr(11, 8);

    let elapsedSecondsTodayLimit = DailyTimeLimitHandler.instance().elapsedSecondsTodayLimit();

    let onTrack = elapsedSeconds < elapsedSecondsTodayLimit;
    let color = onTrack ? 'black' : 'red';
    return (
      <Text style={{color: color}}>
        {elapsedSecondsString}
      </Text>
    );
  }

  _renderIcon(name, isSelected) {
    return (
      <FontAwesome
        name={name}
        size={32}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({origin, data}) => {
    // Disable push notification handling for now, not used
    // this.props.navigator.showLocalAlert(
    //   `Push notification ${origin} with data: ${JSON.stringify(data)}`,
    //   Alerts.notice
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  selectedTab: {
    color: Colors.tabIconSelected,
  },
});
