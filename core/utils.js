import {createCLI} from "../menus/create.js";
import {program} from "commander";
import {setupCLI} from "../menus/setup.js";
import {byeMessage, errorMessage, henchman} from "./constants.js";
import {exec} from "child_process";
import chalk from "chalk";
import inquirer from "inquirer";
import path from "path";
import ora from "ora";


export function initCLI() {
    program.name('henchman')
        .version('v1.0.0')
        .description('CLI tool to reduce development time to execute boilerplate tasks and increase productivity.');
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
    return path.join(process.cwd(), inputPath);
}

export async function execute(command) {
    const spinner = ora('Running Command...\n').start();
    await new Promise((resolve, reject) => {
        exec(command, (err, _, stdin) => {
            if (err !== null) {
                reject(err);
            } else {
                console.log(stdin);
                resolve();
            }
        })
    }).catch((err) => {
        console.log(errorMessage);
        console.log(err);
        console.log(err.stack);
        spinner.fail(byeMessage);
        process.exit(1);
    });
    spinner.succeed('Done');
}