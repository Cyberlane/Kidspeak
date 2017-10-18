module.exports = {
  "extends": "airbnb-base",
  "rules": {
    "import/extensions": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-unresolved": [2, { "ignore": ["electron"] }],
  },
  "plugins": [
    "import"
  ]
};
