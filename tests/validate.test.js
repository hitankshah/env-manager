const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { validateEnvFile } = require('../src/utils/envUtils');

jest.mock('../src/utils/envUtils', () => ({
  validateEnvFile: jest.fn(),
}));

describe('validateEnv', () => {
  const envPath = path.join(process.cwd(), '.env');

  beforeEach(() => {
    // Setup: Create a .env file with valid and invalid entries
    fs.writeFileSync(envPath, 'VALID_KEY=value\nINVALID_KEY@value');
  });

  afterEach(() => {
    // Cleanup: Remove .env file
    if (fs.existsSync(envPath)) fs.unlinkSync(envPath);
  });

  it('should validate .env file and report errors', () => {
    // Mock the validateEnvFile function to return errors
    validateEnvFile.mockReturnValue([
      'Invalid syntax at line 2: INVALID_KEY@value',
    ]);

    // Act
    const result = execSync('node bin/env-manager.js validate', { encoding: 'utf-8' });

    // Assert
    expect(result).toContain('Invalid syntax at line 2: INVALID_KEY@value');
  });

  it('should confirm successful validation for a correct .env file', () => {
    // Mock the validateEnvFile function to return no errors
    validateEnvFile.mockReturnValue([]);

    // Act
    const result = execSync('node bin/env-manager.js validate', { encoding: 'utf-8' });

    // Assert
    expect(result).toContain('Environment file validated successfully.');
  });
});
