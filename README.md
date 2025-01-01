# Task-Jar

Task-Jar is a lightweight, ticket tracking app designed for indie developers. Built with modern technologies, it offers a seamless and efficient way to manage tasks and projects for free. You can visit the site at [task-jar.vercel.app](https://task-jar.vercel.app) or install the Windows installer from the GitHub Releases.

## Introduction

Task-Jar aims to simplify project management for individual developers and small teams. With its intuitive interface and straightforward features, you can easily create, organize, and track your tasks, all within your browser.


## Features

- **Client-Side Data Storage**: Securely store tasks using IndexedDB.

- **Data Portability**: Import and export tasks in JSON format.

- **Modern UI**: Responsive, accessible design using ShadCN UI and Tailwind CSS.

- **TypeScript Support**: Ensures robust code quality and a better developer experience.

- **Static Site Generation (SSG)**: Optimized performance with pre-rendered pages.

- **Cross-Platform Support**: Works on both desktop and web platforms.


## Tech Stack

- [Tauri](https://v2.tauri.app/) - for building the Desktop app
- [Vite](https://vite.dev/) - for building the frontend for desktop and web both
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [ShadCN UI](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) - Low-level API for client-side storage

## Installation (Desktop)

1. Download the latest release from the [Releases](https://github.com/soham901/task-jar/releases) page.
2. Run the installer and follow the on-screen instructions.
3. Launch the Task-Jar app from the Start menu or desktop shortcut.

- **Note**: The desktop app is only available for Windows at the moment.

For the web version, you can visit the site at [task-jar.vercel.app](https://task-jar.vercel.app).


## Usage

1. Create a new task by clicking the "Add Task" button.
2. Edit tasks by clicking on them.
3. Mark tasks as complete by checking the checkbox.
4. Use the filter and sort options to organize your tasks.
5. Import or export your data using the JSON functionality in the settings.

## Contributing

We welcome contributions to Task-Jar! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

Please make sure to update tests as appropriate and adhere to the code style of the project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## TODO
- [x] Create a basic task tracking system
- [x] Implement client-side data storage using IndexedDB
- [x] Add JSON import/export functionality
- [x] Design a responsive and accessible UI
- [x] Cross platform support (Web, Desktop)
- [ ] Implement multiple view options (e.g., Kanban, list, calendar)
- [ ] Add support for multiple projects
- [ ] Integrate AI for task suggestions and automation
- [ ] Implement auto-sync to cloud storage
- [ ] Add real-time collaboration features
- [ ] Create a mobile app version
- [ ] Implement data encryption for enhanced security
- [ ] Add time tracking functionality
- [ ] Create a plugin system for extensibility
- [ ] Implement advanced reporting and analytics features
- [ ] Add support for custom themes and preferences
