class SiteSearch {
  static create() {
    return new SiteSearch();
  }

  constructor() {
    this.getArticles();

    if (!this.allArticles) {
      return;
    }

    this.listenToSearch();
    this.listenToClear();
  }

  getArticles() {
    this.allArticles = document.querySelectorAll('.article-container');
  }

  listenToSearch() {
    this.searchInput = document.querySelector('#articleSearchInput');
    const searchButton = document.querySelector('#articleSearchButton');

    searchButton.addEventListener('click', this.search.bind(this));
    this.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.search();
      }
    });
  }

  listenToClear() {
    const clearButton = document.querySelector('#clearButton');

    clearButton.addEventListener('click', () => {
      this.searchInput.value = '';
      this.search();
    });
  }

  search() {
    const query = this.searchInput.value.toLowerCase();
    const matches = [];
    const articlesList = document.querySelector('.articles-list');

    this.allArticles.forEach((article) => {
      const headerText = article.querySelector('h3').innerHTML;
      if (headerText.toLowerCase().includes(query)) {
        matches.push(article);
      }
    });
    articlesList.innerHTML = '';
    matches.forEach((match) => {
      articlesList.appendChild(match);
    });
  }
}

SiteSearch.create();
