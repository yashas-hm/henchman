# 🧌 Henchman: CLI for Developers

**Version 1.0.0**

Henchman CLI is an all-in-one, interactive command-line tool designed to simplify the creation, setup, and management of
development projects. Whether you’re working on Flutter, Node.js, or managing Git repositories, Henchman streamlines
repetitive tasks, letting you focus on what matters most—writing great code.

---

## 🚀 Features

### 1. **Interactive Menu**

Henchman features an intuitive, arrow-selectable menu that makes navigation and task selection effortless—no more
remembering lengthy commands.

### 2. **Project Creation**

- **Node Projects**: 
    - Empty: Create empty node project
    - Server: Create express server with dependencies
    - CLI: Create node CLI with dependencies
- **Flutter Apps**:
    - Mobile: Create Flutter Android/iOS project with structure and dependencies
    - Web: Create Flutter Web project with structure and dependencies
    - Desktop: Create Flutter Windows/macOS/Linux project with structure and dependencies
    - Packages: Create Flutter package with structure.

### 3. **Project Structure Setup**

- Automatically sets up directories and boilerplate code for Flutter and Node projects.
- Installs required dependencies with a single command.

### 4. **Git Repository Management**

- Initialize Git repositories with preconfigured `.gitignore` files and `README.md` templates.
- Language specific `.gitignore` included for streamlined setup.

### 5. **SHA Key Retrieval**

Retrieve SHA keys for Android development:

- Debug SHA Key
- Release SHA Key

### 6. **Simulator Management**

- Start Android Emulators.
- Launch iOS Simulators.

### 7. **Project Cleanup**

Effortlessly clean up unused build files:

- Node.js `node_modules`
- Flutter build files
- Python virtual environments files

---

## 📖 Usage

### Pre-requisites

Ensure you have the following tools installed and added to your PATH:

- **Node.js** and **npm**
- **Flutter SDK**
- **Git**
- **Python**
- **Keytool** (for retrieving SHA keys)

Additionally, add these to your shell initialization script (e.g., `.bashrc`, `.zshrc`, `PATH`):

#### For MacOS
```bash
# Homebrew (Mac users)
eval "$($(brew --prefix)/bin/brew shellenv)"
# Android Emulator
export ANDROID_SDK="<path-to-android-sdk>/emulator"
# Java
export JAVA_HOME="<path-to-java-home>"
# Flutter
export FLUTTER="<path-to-flutter-sdk>/bin"
```

### Installation

Henchman is distributed as an npm package:

```bash
npm install -g henchman-cli
```

### Running the CLI

Simply run:

```bash
henchman
```

Follow the interactive prompts to select your desired task.

---

## 📋 Menu Options

### **Project Creation**

- Create a Node Project
- Create a Flutter Application
- 
### **Project Structure Setup**

- Setup Flutter Project Structure
- Setup Node Project Structure

### **Manage Git Repository**

- Initialize Git Repository
- Configure `.gitignore` and `README.md`

### **Retrieve SHA Keys**

- Get Android Debug SHA Key
- Get Android Release SHA Key

### **Start Simulators**

- Start Android Emulator
- Start iOS Simulator

### **Clean Projects**

- Clean Node.js projects
- Clean Flutter projects
- Clean Python projects

---

## 📂 Project Structure

Henchman automatically generates well-organized project structures for both Node and Flutter. For example:

### Express Project

```
project-name/
├── controllers
├── core
│   ├── constants
│   ├── models
│   └── utils
├── docs
├── pages
│   ├── css
│   └── views
└── routes
```

### Flutter Application

```
project-name/
├── android
├── ios
├── linux
├── macos
├── web
├── windows
├── assets
│   ├── anim
│   ├── fonts
│   └── images
├── docs
└── lib
   ├── core
   │   ├── constants
   │   ├── error
   │   ├── models
   │   └── utilities
   ├── pages
   ├── providers
   ├── screens
   └── widgets
```

---

## 🌟 Command Reference

### General Usage

```
henchman [options] [command]
```

#### Options:

- `-V, --version`     Output the version number
- `-h, --help`        Display help for a command

---

### Commands

#### `configure`

Configure 🧌 Henchman.

#### `create [config]`

Create a new project for a selected language.

- **[config] options**: `flutter`, `node`, `git`

#### `cleanup [config]`

Cleanup projects for a selected language in input subfolders.

- **[config] options**: `flutter`, `node`, `python`

#### `setup [config]`

Setup folder structure for a selected language.

- **[config] options**: `flutter`, `node`, `git`

#### `start [config]`

Start a process.

- **[config] options**: `sim` (`android`, `ios`)

#### `get [config]`

Get some information.

- **[config] options**: `sha` (`debug`, `release`)

#### `help [command]`

Display help for a command.

---

## 🤝 Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of changes.

Please adhere to our [Code of Conduct](CODE_OF_CONDUCT.md) when interacting with the project.

---

## 🔒 Security

If you discover any security vulnerabilities, please report them
via [yashashm.dev@gmail.com](mailto:yashashm.dev@gmail.com). We take security issues seriously and appreciate your
efforts to responsibly disclose them. Read more at [SECURITY](SECURITY.md)

---

## 📜 Code of Conduct

This project is governed by a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold a welcoming
and inclusive environment.

---

## 📝 License

Henchman CLI is licensed under the [MIT License](LICENSE).

---

Thank you for using Henchman! 🎉 Happy coding!

