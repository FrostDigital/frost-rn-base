import {action, observable} from "mobx";
import BaseStore from "./BaseStore";

/**
 * Log levels from standard https://en.wikipedia.org/wiki/Syslog
 */
export enum LogLevel {
  emergency = 0,
  alert = 1,
  critical = 2,
  error = 3,
  warn = 4,
  notice = 5,
  info = 6,
  debug = 7,
}

/**
 * Store responsible to for logging which is shown in Dev Settings.
 */
class LogStore extends BaseStore {
  maxRows = 1000;

  @observable
  logRows: {level: LogLevel; date: Date; msg: string}[] = [];

  @action
  debug(msg: string) {
    this.addLog(LogLevel.debug, msg);
  }

  @action
  info(msg: string) {
    this.addLog(LogLevel.info, msg);
  }

  @action
  warn(msg: string) {
    this.addLog(LogLevel.warn, msg);
  }

  @action
  error(msg: string) {
    this.addLog(LogLevel.error, msg);
  }

  @action
  clear() {
    this.logRows = [];
  }

  private addLog(level: LogLevel, msg: string) {
    console.log(`[${level}] ${msg}`);

    this.logRows = [...this.logRows, {level, date: new Date(), msg}];

    if (this.logRows.length > this.maxRows) {
      this.logRows = [...this.logRows.slice(-this.maxRows)];
    }
  }
}

export default LogStore;
