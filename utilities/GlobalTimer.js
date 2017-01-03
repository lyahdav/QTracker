import {
  Alert,
  AsyncStorage
} from 'react-native';

const ELAPSED_SECONDS_TODAY_KEY = '@FacebookTimeTracker:elapsedSecondsToday';
const LAST_DATE_KEY = '@FacebookTimeTracker:lastDate';

let globalTimerInstance = null;

export default class GlobalTimer {
  static instance() {
    if (globalTimerInstance == null) {
      globalTimerInstance = new GlobalTimer();
    }
    return globalTimerInstance;
  }

  constructor() {
    this.observers = [];
  }

  async _initElapsedSecondsToday() {
    const elapsedSecondsToday = await AsyncStorage.getItem(ELAPSED_SECONDS_TODAY_KEY);

    console.log(`Got elapsedSecondsToday = ${elapsedSecondsToday}`);
    if (elapsedSecondsToday !== null) {
      this.elapsedSeconds = parseInt(elapsedSecondsToday);
    } else {
      this.elapsedSeconds = 0;
    }

    const lastDateString = await AsyncStorage.getItem(LAST_DATE_KEY);
    if (lastDateString !== null) {
      let currentDateString = new Date().toDateString();
      console.log(`Checking currentDateString: ${currentDateString}, lastDateString: ${lastDateString}`);
      if (currentDateString !== lastDateString) {
        console.log("Crossed day, resetting elapsedSeconds")
        this.elapsedSeconds = parseInt(0);
      }
    }
  }

  start() {
    this._initElapsedSecondsToday();
    console.log("starting timer");
    this.interval = setInterval(() => this.onInterval(), 1000);
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  async onInterval() {
    this.elapsedSeconds += 1;
    for (let observer of this.observers) {
      observer.fire(this.elapsedSeconds);
    }

    await AsyncStorage.setItem(ELAPSED_SECONDS_TODAY_KEY, this.elapsedSeconds.toString());
    await AsyncStorage.setItem(LAST_DATE_KEY, new Date().toDateString());
  }
}
