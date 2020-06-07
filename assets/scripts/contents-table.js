class ContentsTable {
  static create() {
    return new ContentsTable();
  }

  constructor() {
    const headers = document.querySelectorAll('.post-content h2, h3');
    if (!document.querySelector('.post-content')) {
      return;
    }

    this.headerMenuContainer = document.querySelector('.post-headerList');
    this.hasH2Headers = this.hasH2Tags(headers);

    headers.forEach(this.appendHeaderToList.bind(this));
  }

  appendHeaderToList(header) {
    const link = this.createHeaderLink({
      id: header.id,
      element: header.localName,
      title: this.idToString(header.id)
    });

    this.headerMenuContainer.appendChild(link);
  }

  idToString(id) {
    const normalisedString = id.split('-').join(' '),
      capitalisedString =
        normalisedString.charAt(0).toUpperCase() + normalisedString.slice(1);

    return capitalisedString;
  }

  hasH2Tags(headers) {
    const elementList = Array.from(headers).map((header) => header.localName);
    return elementList.indexOf('h2') !== -1;
  }

  createHeaderLink(headerLinkConfig) {
    const link = document.createElement('a');

    link.href = `#${headerLinkConfig.id}`;
    link.classList.add('post-headerLink');
    link.textContent = `📍 ${headerLinkConfig.title}`;

    if (headerLinkConfig.element === 'h3' && this.hasH2Headers) {
      link.classList.add('post-headerLink--indented');
    }

    return link;
  }
}

ContentsTable.create();
