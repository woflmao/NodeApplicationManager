# Node Application Manager

This is a simple program that allows one to run projects that use "npm run start" from anywhere in your file directory.

Designed on windows, and honestly I haven't tested it on any other device to see if it works.

## Installation

### Prerequisites
* node
* npm

1. Clone this repository
	```bash
	$ git clone https://github.com/woflmao/NodeApplicationManager.git
	```
2. Install globally
	```bash
	$ cd nodeApplicationManager
	$ npm install -g .
	```

## Usage

1. Run the app
	```bash
	$ appman
	```
2. Add a project
	```bash
	Enter a project name, or enter add, remove, or edit: add
	Enter the name of the new project: <project name>
	Enter the path of the new project: <path to project>
	```
3. Run a project
	```bash
	Enter a project name, or enter add, remove, or edit: <project name>
	Enter any args you wish to pass (e.g dev, test): <args i.e dev, test>
	```
4. Edit a project
	```bash
	>>> Enter the name of the project you wish to edit: <existing project name>
	>>> Enter a new name for the project if you wish: <new project name (optional)>
	>>> Enter a new path for project vc: <new project path(optional)>
	```
5. Remove a project
	```bash
	>>> Enter the name of the project you wish to remove: <existing project name>
	```
	

## Issues
1. Whitespace validation
2. No stdout (can't see usual output of npm run start)
3. Not tested with operating systems that aren't windows
