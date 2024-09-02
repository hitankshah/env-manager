const fs = require('fs');
const path = require('path');

function getEnvFilePath(env) {
  return path.join(process.cwd(), `.env.${env}`);
}

function copyFile(source, destination) {
  fs.copyFileSync(source, destination);
}

module.exports = { getEnvFilePath, copyFile };
