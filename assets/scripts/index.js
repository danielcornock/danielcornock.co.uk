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
  { cssClass: '.language-html', label: 'HTML' }
];

const createNewElement = (label) => {
  const inputElement = document.createElement('div');
  inputElement.classList.add('post-codeLabel');
  inputElement.innerText = label;

  return inputElement;
};

addCodeSnippetLabels();
