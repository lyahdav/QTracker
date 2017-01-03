import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput
} from 'react-native';
import {
  ExponentConfigView,
} from '@exponent/samples';

import GlobalTimer from '../utilities/GlobalTimer';
import DailyTimeLimitHandler from '../utilities/DailyTimeLimitHandler';

export default class SettingsScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Settings'
    },
  }

  constructor(props) {
    super(props);

    this.state = this._buildState();
    console.log(`settings state`);
    console.log(this.state);
    GlobalTimer.instance().addObserver(this);
  }

  fire(elapsedSecondsToday) {
    this.setState({elapsedSeconds: elapsedSecondsToday});
  }

  _buildState() {
    let elapsedSecondsTodayLimit = DailyTimeLimitHandler.instance().elapsedSecondsTodayLimit();
    console.log(`got elapsedSecondsTodayLimit`);
    console.log(elapsedSecondsTodayLimit);
    let minutesAllowedPerDay = elapsedSecondsTodayLimit / 60;
    return {
      elapsedSeconds: GlobalTimer.instance().elapsedSeconds,
      minutesAllowedPerDay: minutesAllowedPerDay
    };
  }

  _secondsToTimeString(seconds) {
    var date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
  }

  render() {
    let timeToday = this._secondsToTimeString(this.state.elapsedSeconds);
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
        <Text>Time today:</Text>
        <Text>{timeToday}</Text>

        <Text style={{marginTop: 10, fontSize: 20, textAlign: 'center'}}>Ability to edit daily allowance coming soon</Text>

{
        // <Text>Minutes allowed per day:</Text>
        // <TextInput
        //   keyboardType='numeric'
        //   style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        //   onChangeText={(text) => this.onChangeText(text)}
        //   value={this.state.minutesAllowedPerDay.toString()}
        // />
      }
      </ScrollView>
    );
  }

  onChangeText(text) {
    // TODO: update saved value, and update GlobalTimer; also need to read from saved value on app launch
     this.setState({minutesAllowedPerDay: parseInt(text)});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
