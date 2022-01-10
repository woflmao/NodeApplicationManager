#!/usr/bin/env node
/* eslint-disable array-callback-return */
// author: woflmao
// date: January 8, 2022
// license: MIT

// This program assumes that your projects have a package.json that has a script called 'start'
// The parameter 'args' is for any additional args you wish to pass, e.g dev, test => start:dev, start:test
// This program is NOT designed to scan any package.json from any projects you have, you MUST pass in what ever parameters your package.json accepts

// Current issues:
//    exec() does not output expected output of npm run start
//      this means you won't be able to see the live changes from the usual behavior of 'npm run start'
//      this is a problem, I know
//    edit, remove, and add still need to have validation added
//    whitespace validation needs to be added

const fs = require('fs')
const exec = require('child_process').exec;
const projects = require('./projects')
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// start code that handles adding, editing, removing, and running projects

const handleAdd = () => {
  rl.question('Enter the name of the new project: ', project => {
    const foundProject = projects.find((element, index) => {
      return element.project === project
    })
    if (project.length !== 0 && foundProject === undefined) {
      rl.question('Enter the path of the new project: ', path => {
        if (path) {
          // push to local projects array
          projects.push({
            project: project,
            path: `${path}`
          })
          // write local projects array to projects.json for future use
          fs.writeFileSync('C:/Users/User/Documents/Development/projects/nodeApplicationManager/bin/projects.json', JSON.stringify(projects), err => {
            if (err) throw err
            console.log(`Saved ${project} to products.json`)
          })
          rl.close()
        } else {
          console.log(`Please enter a path for ${project}`)
          rl.close()
        }
      })
    } else if (foundProject !== undefined) {
      // if project already exists
      console.log(`${project} already exists`)
      rl.close()
    } else if (project.length === 0) {
      // if no string is entered
      console.log('Please enter project')
      rl.close()
    }
  })
}

const handleRemove = () => {
  rl.question('Enter the name of the project you wish to remove: ', project => {
    if (project) {
      projects.findIndex((element, index) => {
        if (element.project === project) {
          projects.splice(index, 1)
          fs.writeFileSync('C:/Users/User/Documents/Development/projects/nodeApplicationManager/bin/projects.json', JSON.stringify(projects), err => {
            if (err) throw err
          })
        }
      })
      rl.close()
    } else if (project !== '' && projects.filter(e => e.project !== project)) {
      // if project does not exist
      console.log(`${project} is not a project yet`)
      rl.close()
    } else {
      // if no string is entered
      console.log('Please enter project name')
      rl.close()
    }
  })
}

const handleEdit = () => {
  rl.question('Enter the name of the project you wish to edit: ', project => {
    let foundIndex
    const foundProject = projects.find((element, index) => {
      foundIndex = index
      return element.project === project
    })
    if (foundProject !== undefined && foundProject.project === project) {
      rl.question('Enter a new name for the project if you wish: ', name => {
        if (name) {
          projects[foundIndex].project = name
        }
        rl.question(`Enter a new path for project ${projects[foundIndexq].project}: `, path => {
          if (path) {
            projects[foundIndex].path = path
            fs.writeFileSync('C:/Users/User/Documents/Development/projects/nodeApplicationManager/bin/projects.json', JSON.stringify(projects), err => {
              if (err) throw err
            })
            console.log(`Saved ${project} to projects.json`)
            rl.close()
          }
        })
      })
    }
    if (foundProject === undefined && project.length !== 0) {
      // if project does not exist
      console.log(`${project} is not a project yet`)
      rl.close()
    } else if (project.length === 0 && foundProject === undefined) {
      // if no string is entered
      console.log('Please enter project name')
      rl.close()
    }
  })
}

const handleDefault = (choice) => {
  let foundIndex
  const runProject = projects.find((element, index) => {
    foundIndex = index
    return element.project === choice
  })
  if (runProject !== undefined && runProject.project === choice) {
      rl.question('Enter any args you wish to pass (e.g dev, test): ', args => {
        console.log('project has started');
        return exec(args === '' ? 'npm run start' : `npm run start:${args}`, {cwd: projects[foundIndex].path}, function(err, stdout, stderr) {});
      })
  }
  // If runProject returns undefined (couldn't find any matches)
  if (runProject === undefined && choice.length !== 0) {
    // if project does not exist
    console.log(`${choice} is not a project yet`)
    rl.close()
  } else if (choice.length === 0 && runProject === undefined) {
    // if no string is entered
    console.log('Please enter project name')
    rl.close()
  }
}

rl.question('Enter a project name, or enter add, remove, or edit: ', choice => {
  switch (choice) {
    case ('add'):
      handleAdd()
      break
    case ('remove'):
      handleRemove()
      break
    case ('edit'):
      handleEdit()
      break
    default:
      handleDefault(choice)
      break
  }
})
