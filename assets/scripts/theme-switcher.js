class ThemeSwitcher {
  static create() {
    return new ThemeSwitcher(preThemeSwitcher);
  }

  constructor(preThemeSwitcher) {
    this.button = document.querySelector('#themeSwitch');
    this.preThemeSwitcher = preThemeSwitcher;
    this.listenToThemeSwitch();
  }

  listenToThemeSwitch() {
    this.button.addEventListener('click', () => {
      const currentTheme = localStorage.getItem('theme');
      if (currentTheme === 'dark') {
        localStorage.setItem('theme', 'light');
      } else {
        localStorage.setItem('theme', 'dark');
      }

      this.preThemeSwitcher.setTheme();
    });
  }
}
