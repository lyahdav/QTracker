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

  constructor() {
    this.elapsedSecondsTodayLimitFromStorage = null;
    this.fetchElapsedSecondsTodayLimitFromStorage();
  }

  elapsedSecondsTodayLimit() {
    return this.elapsedSecondsTodayLimitFromStorage || DEFAULT_ELAPSED_SECONDS_TODAY_LIMIT;
  }

  async fetchElapsedSecondsTodayLimitFromStorage() {
    const elapsedSecondsTodayLimit = await AsyncStorage.getItem(ELAPSED_SECONDS_TODAY_LIMIT_KEY);
    console.log(`elapsedSecondsTodayLimit = ${elapsedSecondsTodayLimit}`);
    // TODO cleanup
    const result = elapsedSecondsTodayLimit || DEFAULT_ELAPSED_SECONDS_TODAY_LIMIT;
    console.log(`elapsedSecondsTodayLimit result = ${result}`);
    this.elapsedSecondsTodayLimitFromStorage = result;
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
