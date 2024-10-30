const { defineConfig } = require("cypress");

const environments = {
  dev: 'https://jsonplaceholder.typicode.com/',
  stg: 'https://jsonplaceholder.typicode.com/',
  prod: 'https://jsonplaceholder.typicode.com/',
};

// Capture a variável de ambiente ou defina um padrão
const env = process.env.ENV || 'dev';

module.exports = defineConfig({
  e2e: {
    baseUrl: environments[env],
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true
    }
  },
});
