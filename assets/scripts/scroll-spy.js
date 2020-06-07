class ScrollSpy {
  static create() {
    return new ScrollSpy();
  }

  constructor() {
    this.headerContainer = document.querySelector('.header-container');
    this.header = document.querySelector('.header-content');

    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll() {
    if (window.scrollY > 50) {
      this.header.classList.add('header-content--mini');
      this.headerContainer.classList.add('header-container--mini');
    } else {
      this.header.classList.remove('header-content--mini');
      this.headerContainer.classList.remove('header-container--mini');
    }
  }
}
