// jest.config.js
// Sync object
module.exports = {
  verbose: true,
  testEnvironment: 'node',
  transform: {
      ".(js|jsx|ts|tsx)": "@sucrase/jest-plugin"
   }    
};