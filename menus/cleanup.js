import {Argument, program} from "commander";
import chalk from "chalk";
import {greetMessage, logo} from "../core/constants.js";
import {getArgumentByMenu, getPath, invalidCommandExit, menu} from "../core/utils.js";
import {createMenu} from "./create.js";
import {cleanNodeProjects} from "../languages/node.js";
import {cleanFlutterProjects} from "../languages/flutter.js";

export function cleanupCLI() {
    const choices = ['flutter', 'node', 'python'];
    program.command('cleanup')
        .addArgument(new Argument('[argument]')
            .choices(choices)
        )
        .description(
            `${chalk.blue('Cleanup projects for selected language in input subfolders')}\n` +
            chalk.yellow(
                '' +
                '[config] options:\n' +
                `${choices.join('\n')}`
            )
        )
        .action(async (argument) => {
            console.log(logo);
            console.log(greetMessage);
            await cleanupMenu(argument, choices);
        })
        .addHelpText('beforeAll', `${logo}${greetMessage}`);
}

export async function cleanupMenu(argument, choices){
    argument = await getArgumentByMenu(choices, argument, false);
    const dir = await getPath();
    console.log(dir);
    switch (argument){
        case 'flutter':
            await cleanFlutterProjects(dir);
            break;
        case 'python':
            break;
        case 'node':
            await cleanNodeProjects(dir);
            break;
    }
} 