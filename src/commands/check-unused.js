const { checkUnusedVariables } = require('../utils/envUtils');

function checkUnused() {
  const unusedVars = checkUnusedVariables();
  if (unusedVars.length) {
    console.warn('Unused Variables:', unusedVars.join(', '));
  } else {
    console.log('No unused variables found.');
  }
}

module.exports = checkUnused;
