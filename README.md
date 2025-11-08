# Project Page
[https://roadmap.sh/projects/task-tracker](https://roadmap.sh/projects/task-tracker)
# Task CLI

Task CLI is a command-line tool built with Node.js for managing your tasks efficiently from the terminal.

## Features
- Add new tasks
- Update existing tasks
- List all tasks
- Update task status

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```
2. Link the CLI globally:
   ```bash
   npm link
   ```

## Usage

After linking, you can use the CLI with the command:
```bash
taskcli
```

### List Supported Commands
To see all available commands and options, run:
```bash
taskcli --help
# or
 taskcli -h
```

## Example Commands
- Add a task:
  ```bash
  taskcli add "Buy groceries"
  ```
- List tasks:
  ```bash
  taskcli list
  ```
- Update task status:
  ```bash
  taskcli mark done  1
  ```

## License
MIT
