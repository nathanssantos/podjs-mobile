const eslintCommand = 'eslint --fix';
const prettierCommand = 'prettier --write';
const gitCommand = 'git add .';

module.exports = {
  '*.{js,jsx,ts,tsx}': [eslintCommand, prettierCommand, gitCommand],
};
