class ExperimentalSwitch {
  static create() {
    return new ExperimentalSwitch();
  }

  constructor() {
    this.count = 0;
    const themeSwitch = document.querySelector('#themeSwitch');
    themeSwitch.addEventListener('click', () => {
      this.count++;

      if (this.count === 4) {
        document.querySelector('body').classList.toggle('experimental-on');
        this.count = 0;
      }
    });
  }
}
