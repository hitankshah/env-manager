const fs = require('fs');
const path = require('path');
const { getEnvFilePath, copyFile } = require('../utils/fileUtils');

function switchEnv(env) {
  const envFilePath = getEnvFilePath(env);
  const defaultEnvPath = path.join(process.cwd(), '.env');

  if (!fs.existsSync(envFilePath)) {
    console.error(`Environment file for ${env} does not exist.`);
    process.exit(1);
  }

  copyFile(envFilePath, defaultEnvPath);
  console.log(`Switched to ${env} environment.`);
}

module.exports = switchEnv;
