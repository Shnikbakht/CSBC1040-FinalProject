require('dotenv').config(); // Load environment variables from .env file
const fs = require('fs');
const path = require('path');

// Load and preprocess config.json
const configPath = path.resolve(__dirname, 'config.json');
const rawConfig = fs.readFileSync(configPath);
let config = JSON.parse(rawConfig);

// Replace placeholders with environment variables
Object.keys(config).forEach(env => {
  Object.keys(config[env]).forEach(key => {
    if (
      typeof config[env][key] === 'string' &&
      config[env][key].startsWith('${')
    ) {
      const envVarName = config[env][key].slice(2, -1);
      config[env][key] = process.env[envVarName];
    }
  });
});

module.exports = config;
