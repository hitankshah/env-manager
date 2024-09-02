# Env Manager CLI

A CLI tool for managing environment files in different environments (e.g., development, testing, production). This tool provides commands to switch environments, validate `.env` files, and check for unused variables.

## Installation

To install the `env-manager` CLI globally, use npm:

```bash
npm install -g env-manager


Commands
env-manager switch <environment>
Switches to the specified environment by copying the corresponding .env file to the default .env location.

Usage
command
env-manager switch <environment>


Example:

Switch to the development environment:
command
env-manager switch dev



env-manager validate
Validates the syntax of the .env file. Reports any errors or confirms successful validation.

command
env-manager validate


env-manager check-unused
Checks the .env file for unused variables based on the variables used in your project code. Reports any unused variables.

command
env-manager check-unused


Contributing
Contributions are welcome! Please open an issue or submit a pull request if you'd like to contribute to this project.


commands
env-manager switch <environment>
env-manager validate
env-manager check-unused