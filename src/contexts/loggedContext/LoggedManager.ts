export class LoggedManager {
  private static manager: LoggedManager;
  private setLoggedFn: ((value: boolean) => void) | null = null;

  private constructor() {}

  public static getInstance(): LoggedManager {
    if (!LoggedManager.manager) {
      LoggedManager.manager = new LoggedManager();
    }
    return LoggedManager.manager;
  }

  public setLoggedManager(fn: (value: boolean) => void): void {
    this.setLoggedFn = fn;
  }

  public getLoggedManager(): ((value: boolean) => void) | null {
    return this.setLoggedFn;
  }
}
