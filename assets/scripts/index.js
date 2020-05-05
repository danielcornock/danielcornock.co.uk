const addCodeSnippetLabels = () => {
  languages.forEach((language) => {
    const instances = document.querySelectorAll(language.cssClass);

    instances.forEach((instance) => {
      const element = createNewElement(language.label);

      instance.appendChild(element);
    });
  });
};

const languages = [
  { cssClass: '.language-ts', label: 'TypeScript' },
  { cssClass: '.language-typescript', label: 'TypeScript' },
  { cssClass: '.language-html', label: 'HTML' },
  { cssClass: '.language-css', label: 'CSS' }
];

const createNewElement = (label) => {
  const inputElement = document.createElement('div');
  inputElement.classList.add('codeLabel');
  inputElement.innerText = label;

  return inputElement;
};

addCodeSnippetLabels();

const scrollSpy = () => {
  const headerContainer = document.querySelector('.header-container');
  const header = document.querySelector('.header-content');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('header-content--mini');
      headerContainer.classList.add('header-container--mini');
    } else {
      header.classList.remove('header-content--mini');
      headerContainer.classList.remove('header-container--mini');
    }
  });
};

scrollSpy();
