module.exports = {
  plugins: [
    'jsdoc'
  ],
  rules: {
    'jsdoc/require-param-type': 'error',
    'jsdoc/require-returns-type': 'error',
  },
  settings: {
    jsdoc: {
      tagNamePreference: {
        returns: 'return',
      }
    }
  }
};
