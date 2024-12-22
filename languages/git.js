import fs from 'fs/promises';
import path from 'path';
import {baseDir} from "../henchman.js";
import {byeMessage, henchman} from "../core/constants.js";
import {errorSpinnerExit, execute} from "../core/utils.js";
import ora from "ora";

export async function createRepo(dir) {
    const remote = await inquirer.prompt({
        type: 'input',
        name: 'repo',
        message: `${henchman} Enter remote repo url:`
    });
    const repo = remote['repo'];
    if (repo === '') {
        console.log(`${henchman}: Remote repo cannot be empty.`);
        console.log(byeMessage);
        process.exit(1);
    }

    try {
        await fs.access(path.join(dir, 'README.md'));
        console.log(`${henchman}: README.md already exists`)
    } catch (err) {
        if (err.code === 'ENOENT') {
            await fs.writeFile(path.join(dir, 'README.md'), '');
        }
    }

    await execute('' +
        'git init --initial-branch=main;' +
        'git branch -M main;' +
        'git add .;' +
        'git commit -m "Init Repository";' +
        `git remote add origin ${repo};` +
        'git push -u origin main',
        'Creating new GIT repository'
    );
}

export async function generalGitIgnore(dir) {
    const spinner = ora(`${henchman}: Adding general .gitignore`).start();
    try {
        const data = await fs.readFile(path.join(baseDir, 'templates/git.txt'), {encoding: 'utf8'});
        await fs.writeFile(path.join(dir, '.gitignore'), data);
    } catch (err) {
        errorSpinnerExit(spinner, err);
    }
    spinner.succeed(`${henchman}: .gitignore added`);
}

export async function flutterGitIgnore(dir) {
    await generalGitIgnore(dir);
    const spinner = ora(`${henchman}: Adding flutter specific .gitignore`).start();
    try {
        const data = await fs.readFile(
            path.join(baseDir, 'templates/git_flutter.txt'), 
            {encoding: 'utf8'}
        );
        await fs.appendFile(path.join(dir, '.gitignore'), data);
    } catch (err) {
        errorSpinnerExit(spinner, err);
    }
    spinner.succeed(`${henchman}: .gitignore modified`);
}

export async function unityGitIgnore(dir) {
    const spinner = ora(`${henchman}: Adding Unity .gitignore`).start();
    try {
        const data = await fs.readFile(path.join(baseDir, 'templates/git_unity.txt'), {encoding: 'utf8'});
        await fs.writeFile(path.join(dir, '.gitignore'), data);
    } catch (err) {
        errorSpinnerExit(spinner, err);
    }
    spinner.succeed(`${henchman}: .gitignore added`);
}

export async function nodeGitIgnore(dir) {
    await generalGitIgnore(dir);
    const spinner = ora(`${henchman}: Adding node specific .gitignore`).start();
    try {
        const data = await fs.readFile(
            path.join(baseDir, 'templates/git_node.txt'),
            {encoding: 'utf8'}
        );
        await fs.appendFile(path.join(dir, '.gitignore'), data);
    } catch (err) {
        errorSpinnerExit(spinner, err);
    }
    spinner.succeed(`${henchman}: .gitignore modified`);
}

export async function pythonGitIgnore(dir) {
    await generalGitIgnore(dir);
    const spinner = ora(`${henchman}: Adding python specific .gitignore`).start();
    try {
        const data = await fs.readFile(
            path.join(baseDir, 'templates/git_python.txt'),
            {encoding: 'utf8'}
        );
        await fs.appendFile(path.join(dir, '.gitignore'), data);
    } catch (err) {
        errorSpinnerExit(spinner, err);
    }
    spinner.succeed(`${henchman}: .gitignore modified`);
}

export async function gitIgnoreByArgument(args){
    switch (args) {
        case 'General':
            await generalGitIgnore(path);
            break;
        case 'Flutter':
            await flutterGitIgnore(path);
            break;
        case 'Node':
            await nodeGitIgnore(path);
            break;
        case 'Python':
            await pythonGitIgnore(path);
            break;
        case 'Unity':
            await unityGitIgnore(path);
            break;
    }
}