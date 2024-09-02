const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { checkUnusedVariables } = require('../src/utils/envUtils');

jest.mock('../src/utils/envUtils', () => ({
  checkUnusedVariables: jest.fn(),
}));

describe('checkUnused', () => {
  const envPath = path.join(process.cwd(), '.env');

  beforeEach(() => {
    // Setup: Create a .env file with variables
    fs.writeFileSync(envPath, 'DB_HOST=localhost\nDB_USER=root');
  });

  afterEach(() => {
    // Cleanup: Remove .env file
    if (fs.existsSync(envPath)) fs.unlinkSync(envPath);
  });

  it('should identify unused variables in .env file', () => {
    // Mock the checkUnusedVariables function to return unused variables
    checkUnusedVariables.mockReturnValue(['DB_USER']);

    // Act
    const result = execSync('node bin/env-manager.js check-unused', { encoding: 'utf-8' });

    // Assert
    expect(result).toContain('Unused Variables: DB_USER');
  });

  it('should report no unused variables when all are used', () => {
    // Mock the checkUnusedVariables function to return no unused variables
    checkUnusedVariables.mockReturnValue([]);

    // Act
    const result = execSync('node bin/env-manager.js check-unused', { encoding: 'utf-8' });

    // Assert
    expect(result).toContain('No unused variables found.');
  });
});
