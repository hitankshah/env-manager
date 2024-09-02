const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { switchEnv } = require('../src/commands/switch');

// Mocking fs.copyFileSync
jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  copyFileSync: jest.fn(),
}));

describe('switchEnv', () => {
  const envPath = {
    dev: path.join(__dirname, 'env.dev'),
    prod: path.join(__dirname, 'env.prod'),
  };
  const defaultEnvPath = path.join(process.cwd(), '.env');

  beforeEach(() => {
    // Setup: Create mock .env files
    fs.writeFileSync(envPath.dev, 'DEV_VAR=value');
    fs.writeFileSync(envPath.prod, 'PROD_VAR=value');
  });

  afterEach(() => {
    // Cleanup: Remove mock .env files
    if (fs.existsSync(envPath.dev)) fs.unlinkSync(envPath.dev);
    if (fs.existsSync(envPath.prod)) fs.unlinkSync(envPath.prod);
    if (fs.existsSync(defaultEnvPath)) fs.unlinkSync(defaultEnvPath);
  });

  it('should switch to the specified environment', () => {
    // Act
    switchEnv('dev');

    // Assert
    expect(fs.copyFileSync).toHaveBeenCalledWith(envPath.dev, defaultEnvPath);
    const defaultEnvContent = fs.readFileSync(defaultEnvPath, 'utf-8');
    expect(defaultEnvContent).toBe('DEV_VAR=value');
  });

  it('should throw an error if the environment file does not exist', () => {
    // Act & Assert
    expect(() => {
      switchEnv('nonexistent');
    }).toThrow('Environment file for nonexistent does not exist.');
  });
});
