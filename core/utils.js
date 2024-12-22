import {createCLI} from '../menus/create.js';
import {Argument, program} from 'commander';
import {setupCLI} from '../menus/setup.js';
import {byeMessage, errorMessage, greetMessage, henchman, logo} from './constants.js';
import {exec} from 'child_process';
import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';


export function initCLI() {
    program.name('henchman')
        .version('v1.0.0')
        .description(
            'CLI tool to reduce development time to execute boilerplate tasks and increase productivity.'
        )
        .addHelpText('beforeAll', `${logo}\n${greetMessage}`);
    createCLI();
    setupCLI();
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

export async function execute(command, description) {
    const spinner = ora(`${henchman} ${description ?? 'running command ...'}\n`).start();
    await new Promise((resolve, reject) => {
        exec(command, (err, _, stdin) => {
            if (err !== null) {
                reject(err);
            } else {
                console.log(stdin);
                resolve();
            }
        })
    }).catch((err) => errorSpinnerExit(spinner, err));
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
    console.log(chalk.red('Invalid Command\n'))
    console.log(program.helpInformation());
    process.exit(1);
}

export function errorSpinnerExit(spinner, err) {
    console.log(errorMessage);
    console.log(err);
    console.log(err.stack);
    spinner.fail('Error');
    console.log(byeMessage);
    process.exit(1);
}