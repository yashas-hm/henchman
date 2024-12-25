import {Argument, program} from 'commander';
import chalk from 'chalk';
import {byeMessage, greetMessage, logo} from '../core/constants.js';
import {getArgumentByMenu, getPath} from '../core/utils.js';
import {cleanNodeProjects} from '../languages/node.js';
import {cleanFlutterProjects} from '../languages/flutter.js';
import {cleanPythonProjects} from '../languages/python.js';

export function cleanupCLI() {
    const choices = ['flutter', 'node', 'python'];
    program.command('cleanup')
        .addArgument(new Argument('[config]')
            .choices(choices)
        )
        .description(
            `${chalk.blue('Cleanup projects for selected language in input subfolders')}\n` +
            chalk.yellow(
                '' +
                '[config] options: ' +
                `${choices.join(', ')}`
            )
        )
        .action(async (argument) => {
            await cleanupMenu(argument);
        });
}

export async function cleanupMenu(argument=undefined) {
    console.log(logo);
    console.log(greetMessage);
    argument = await getArgumentByMenu(['flutter', 'node', 'python'], argument, false);
    const dir = await getPath();
    switch (argument) {
        case 'flutter':
            await cleanFlutterProjects(dir);
            break;
        case 'python':
            await cleanPythonProjects(dir);
            break;
        case 'node':
            await cleanNodeProjects(dir);
            break;
    }
    console.log(byeMessage);
} 