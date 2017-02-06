import React from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Slider,
  View
} from 'react-native';
import {
  ExponentConfigView,
} from '@exponent/samples';

import HyperLink from '../components/HyperLink';
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
    this.setState({ elapsedSeconds: elapsedSecondsToday });
  }

  _buildState() {
    let elapsedSecondsTodayLimit = DailyTimeLimitHandler.instance().elapsedSecondsTodayLimit();
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
        <Text style={{ marginBottom: 20 }}>{timeToday}</Text>

        <Text>Minutes allowed per day:</Text>
        <SliderWithLabel
          ref={(slider) => { this.slider = slider; }}
          minimumValue={1}
          maximumValue={180}
          step={1}
          value={this.state.minutesAllowedPerDay}
          onSlidingComplete={this.onMinutesAllowedPerDaySlidingComplete}
        />
        <Button
          title="Reset to default"
          onPress={this._onPressResetToDefaultLimitButton}
        />
        <View
          style={{ backgroundColor: '#CCCCCC', height: 1, marginTop: 20 }}
        />
        <View style={{flexWrap: 'wrap', flex: 1, flexDirection: 'row', height: 20, marginTop: 20}}>
          <Text>App Icon made by </Text>
          <HyperLink url="http://www.flaticon.com/authors/madebyoliver" title="Madebyoliver" />
          <Text> from </Text>
          <HyperLink url="http://www.flaticon.com" title="www.flaticon.com" />
          <Text> is licensed by </Text>
          <HyperLink url="http://creativecommons.org/licenses/by/3.0/" title="CC 3.0 BY" />
        </View>

      </ScrollView>
    );
  }

  _onPressResetToDefaultLimitButton = () => {
    const defaultMinutesLimit = DailyTimeLimitHandler.defaultElapsedSecondsTodayLimit / 60;
    this.onMinutesAllowedPerDaySlidingComplete(defaultMinutesLimit);
    this.slider.setState({ value: defaultMinutesLimit });
  }

  onMinutesAllowedPerDaySlidingComplete = (minutesLimit) => {
    this.setState({ minutesAllowedPerDay: minutesLimit });
    const secondsLimit = minutesLimit * 60;
    DailyTimeLimitHandler.instance().updateElapsedSecondsTodayLimit(secondsLimit);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    margin: 10,
  },
});

class SliderWithLabel extends React.Component {
  static defaultProps = {
    value: 0,
  };

  state = {
    value: this.props.value,
  };

  render() {
    return (
      <View>
        <Text style={styles.text} >
          {this.state.value}
        </Text>
        <Slider
          {...this.props}
          onValueChange={(value) => this.setState({ value: value })} />
      </View>
    );
  }
}
