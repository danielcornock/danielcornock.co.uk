class App {
  static create() {
    return new App();
  }

  constructor() {
    ThemeSwitcher.create();
    ScrollSpy.create();
    ExperimentalSwitch.create();
    CopyCode.create();
  }
}

App.create();
