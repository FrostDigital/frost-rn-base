import {action, observable} from "mobx";
import BaseStore from "./BaseStore";

type LogLevel = "debug" | "info" | "warn" | "error";

/**
 * Store responsible to for logging which is shown in Dev Settings.
 */
class LogStore extends BaseStore {
  maxRows = 1000;

  @observable
  logRows: {level: LogLevel; date: Date; msg: string}[] = [];

  @action
  debug(msg: string) {
    this.addLog("debug", msg);
  }

  @action
  info(msg: string) {
    this.addLog("info", msg);
  }

  @action
  warn(msg: string) {
    this.addLog("warn", msg);
  }

  @action
  error(msg: string) {
    this.addLog("error", msg);
  }

  @action
  clear() {
    this.logRows = [];
  }

  private addLog(level: LogLevel, msg: string) {
    console.log(`[${level}] ${msg}`);

    this.logRows = [...this.logRows, {level: "debug", date: new Date(), msg}];

    if (this.logRows.length > this.maxRows) {
      this.logRows = [...this.logRows.slice(-this.maxRows)];
    }
  }
}

export default LogStore;
