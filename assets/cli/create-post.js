const inquirer = require('inquirer');
const { kebabCase } = require('lodash');
const fs = require('fs');
const path = require('path');

const template = require('./post-template');

(async () => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the name of your blog post?'
    },
    {
      type: 'input',
      name: 'slug',
      message: 'What should the slug and filename be? (must be kebab case)',
      default: (existingAnswers) => kebabCase(existingAnswers.title)
    },
    {
      type: 'input',
      name: 'description',
      message: 'Enter a description'
    },
    {
      type: 'input',
      name: 'imageUrl',
      message:
        'Please choose the image url for the blog post (from dir assets/images)'
    },
    {
      type: 'input',
      name: 'tags',
      message: 'Please enter the tags (separated by a comma)'
    }
  ]);

  const details = {
      ...answers,
      date: new Date(Date.now()).toISOString().slice(0, 10)
    },
    fileName = `${details.date}-${details.slug}.md`;

  fs.writeFileSync(
    path.join(process.cwd(), '_posts', fileName),
    template(details)
  );
})();
