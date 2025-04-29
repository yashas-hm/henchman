import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import fs from 'fs/promises';
import path from 'path';
import ini from 'ini';
import {Argument, program} from 'commander';
import child_process from 'child_process';
import util from 'util';
import {byeMessage, errorMessage, greetMessage, henchman, logo} from './constants.js';
import {baseDir} from '../henchman.js';
import {configureCLI} from '../menus/configure.js';
import {cleanupCLI} from '../menus/cleanup.js';
import {setupCLI} from '../menus/setup.js';
import {startCLI} from '../menus/start.js';
import {getCLI} from '../menus/get.js';
import {createCLI} from '../menus/create.js';
import packageJson from '../package.json' assert { type: 'json' };

export async function initCLI() {
    const json = JSON.parse(packageJson);
    program.name('henchman')
        .version(json.version)
        .description(
            json.description
        )
        .addHelpText('beforeAll', `${logo}\n${greetMessage}`);
    configureCLI();
    createCLI();
    cleanupCLI();
    setupCLI();
    startCLI();
    getCLI();
    program.parse(process.argv);
}

export async function getPath() {
    console.log(`Enter the file path to execute ${henchman}. ${chalk.blue('(Leave empty to run in current folder)')}`);
    console.log(chalk.yellow('(If the folder doesn\'t exist Henchman will create one)'));
    console.log(`Enter ${chalk.red('q')} to abort.`)
    const input = await inquirer.prompt({
        type: 'input',
        name: 'path',
        message: 'Enter path:'
    });
    const inputPath = input['path'];
    if (inputPath === 'q') {
        console.log(byeMessage);
        process.exit(0);
    }

    if (inputPath === '') {
        return process.cwd();
    }

    return inputPath;
}

export async function execute(command, message) {
    console.log(`${command}`);
    const spinner = ora(`${henchman} ${message ?? 'running command ...'}\n`).start();
    const exec = util.promisify(child_process.exec);
    const {stdout} = await exec(command).catch((err) => errorSpinnerExit(spinner, err));
    console.log(stdout);
    spinner.succeed('Done');
}

export async function menu(list) {
    const choice = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Please choose from one:',
            choices: [
                ...list,
                'Exit',
            ],
        },
    ]);

    const answer = choice['choice'];
    if (answer === 'Exit') {
        console.log(byeMessage);
        process.exit(0);
    }
    return answer;
}

export function cliArgument(program, command, commandDesc, argChoices, action) {
    return program.command(command)
        .description(
            `${chalk.blue(commandDesc)}\n` +
            chalk.yellow(
                '' +
                '[config] options:\n' +
                `${argChoices.join('\n')}`
            )
        )
        .addArgument(
            new Argument('[config]',)
                .choices(argChoices)
        )
        .action(action);
}

export function invalidCommandExit() {
    console.log(logo);
    console.log(greetMessage);
    console.log(chalk.red('Invalid Command\n'))
    console.log(program.helpInformation());
    program.error(byeMessage, {exitCode: 1});
}

export function errorSpinnerExit(spinner = undefined, err) {
    console.log(errorMessage);
    console.log(err);
    console.log(err.stack);
    if (spinner !== undefined) {
        spinner.fail(chalk.red('Error'));
    }
    program.error(byeMessage, {exitCode: 1});
}

export function errorExit(message) {
    console.log(message);
    program.error(byeMessage, {exitCode: 1});
}

export async function getArgumentByMenu(choices, argument, greet) {
    if (greet) {
        console.log(logo);
        console.log(greetMessage);
    }

    if (argument === undefined) {
        argument = await menu(choices);
    }

    return argument.toLowerCase();
}

export async function getConfig(noError = false) {
    const spinner = ora(`${henchman}: Fetching config file...`).start();
    try {
        const data = await fs.readFile(path.join(baseDir, 'config.ini'), {encoding: 'utf-8'});
        const config = ini.parse(data);
        spinner.succeed(`${henchman} config found`);
        return config;
    } catch (err) {
        if (err.code === 'ENOENT') {
            spinner.fail(chalk.red(`${henchman} configuration not found`));
            if (noError) {
                return {};
            } else {
                console.log('Run \`henchman configure\` command')
                console.log(byeMessage);
                process.exit(1);
            }
        } else {
            errorSpinnerExit(spinner, err);
        }
    }
}

export async function getFlutterProjectName(directoryPath) {
    const pubspecContent = await fs.readFile(path.join(directoryPath, 'pubspec.yaml'), 'utf8');
    const pubspec = yaml.load(pubspecContent);
    return pubspec.name;
}