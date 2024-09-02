const fs = require('fs');
const path = require('path');

function validateEnvFile() {
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    return ['.env file does not exist.'];
  }

  const envContent = fs.readFileSync(envPath, 'utf-8');
  const lines = envContent.split('\n');
  const errors = [];

  lines.forEach((line, index) => {
    if (!/^[A-Z_]+=[\w\d-_]*$/i.test(line) && line.trim() !== '') {
      errors.push(`Invalid syntax at line ${index + 1}: ${line}`);
    }
  });

  return errors;
}

function checkUnusedVariables() {
  // Simplified example for demonstration
  const envPath = path.join(process.cwd(), '.env');
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const lines = envContent.split('\n');
  const variables = lines.map(line => line.split('=')[0]);

  // Mock usage check; in real scenarios, you might scan source code
  const usedVariables = ['DB_HOST', 'DB_USER'];

  return variables.filter(variable => variable && !usedVariables.includes(variable));
}

module.exports = { validateEnvFile, checkUnusedVariables };
