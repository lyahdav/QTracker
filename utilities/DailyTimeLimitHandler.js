const DEFAULT_ELAPSED_SECONDS_TODAY_LIMIT = 60*30;
const ELAPSED_SECONDS_TODAY_LIMIT_KEY = '@FacebookTimeTracker:elapsedSecondsTodayLimit';

import {
  AsyncStorage,
} from 'react-native';

let dailyTimeLimitHandlerSingleton = null;

export default class DailyTimeLimitHandler {

  static instance() {
    if (dailyTimeLimitHandlerSingleton == null) {
      dailyTimeLimitHandlerSingleton = new DailyTimeLimitHandler();
    }
    return dailyTimeLimitHandlerSingleton;
  }

  static get defaultElapsedSecondsTodayLimit() {
    return DEFAULT_ELAPSED_SECONDS_TODAY_LIMIT;
  }

  constructor() {
    this.elapsedSecondsTodayLimitFromStorage = null;
    this.fetchElapsedSecondsTodayLimitFromStorage();
  }

  elapsedSecondsTodayLimit() {
    return this.elapsedSecondsTodayLimitFromStorage || DEFAULT_ELAPSED_SECONDS_TODAY_LIMIT;
  }

  async fetchElapsedSecondsTodayLimitFromStorage() {
    const elapsedSecondsTodayLimitString = await AsyncStorage.getItem(ELAPSED_SECONDS_TODAY_LIMIT_KEY);
    let elapsedSecondsTodayLimit = DEFAULT_ELAPSED_SECONDS_TODAY_LIMIT;
    if (elapsedSecondsTodayLimitString !== null) {
      elapsedSecondsTodayLimit = parseInt(elapsedSecondsTodayLimitString);
    }
    this.elapsedSecondsTodayLimitFromStorage = elapsedSecondsTodayLimit;
  }

  async updateElapsedSecondsTodayLimit(secondsLimit) {
    this.elapsedSecondsTodayLimitFromStorage = secondsLimit;
    console.log(`setting secondsLimit = ${secondsLimit}`);
    await AsyncStorage.setItem(ELAPSED_SECONDS_TODAY_LIMIT_KEY, secondsLimit.toString());
  }

  fire(elapsedSecondsToday) {
    if (elapsedSecondsToday == this.elapsedSecondsTodayLimit()) {
      Alert.alert(
        'Time ran out',
        'It is time to do something more useful with your time',
        [ {text: 'OK'} ]
      );
    }
  }
}
