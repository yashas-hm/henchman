import {program} from 'commander';
import {byeMessage, greetMessage, logo} from '../core/constants.js';
import {cliArgument, getArgumentByMenu, getPath, invalidCommandExit, menu} from '../core/utils.js';
import inquirer from 'inquirer';
import {createFlutter, createFlutterPackage} from '../languages/flutter.js';
import {createRepo, gitIgnoreByArgument,} from '../languages/git.js';
import {createNode, nodeStructureByArgument} from "../languages/node.js";

export function createCLI() {
    const create = program.command('create')
        .argument('[config]')
        .description('Create new project for selected language')
        .action(async (_) => {
            console.log(logo);
            console.log(greetMessage);
            if (_ !== undefined) {
                invalidCommandExit();
            } else {
                await createMenu();
            }
        })
        .addHelpText('beforeAll', `${logo}${greetMessage}`);

    cliArgument(
        create,
        'flutter',
        'Create new flutter project',
        ['app', 'package'],
        (args) => flutterCreateMenu(args, true),
    );

    cliArgument(
        create,
        'node',
        'Create new node project',
        ['empty', 'server', 'cli'],
        (args) => nodeCreateMnu(args, true),
    );

    cliArgument(
        create,
        'git',
        'Create new git repository',
        ['general', 'flutter', 'node', 'python', 'unity'],
        (args) => gitCreateMenu(args, true),
    );

    create
        .command('python')
        .action((argument) => console.log(argument));

    create
        .command('bash')
        .action((argument) => console.log(argument));
}

export async function flutterCreateMenu(argument = undefined, greet = true) {
    argument = await getArgumentByMenu(['app', 'package'], argument, greet);
    let path = '';
    switch (argument) {
        case 'app':
            const platforms = await inquirer.prompt([
                {
                    type: 'checkbox',
                    name: 'platforms',
                    message: 'Select platforms:',
                    choices: ['android', 'ios', 'linux', 'macos', 'windows', 'web'],
                    default: ['android', 'ios'],
                }
            ]);
            path = await getPath();
            await createFlutter(path, platforms['platforms']);
            break;
        case 'package':
            path = await getPath();
            await createFlutterPackage(path);
            break;
    }

    console.log(byeMessage);
}

export async function gitCreateMenu(argument = undefined, greet = false) {
    argument = await getArgumentByMenu(
        ['general', 'flutter', 'node', 'python', 'unity'],
        argument,
        greet
    );
    let dir = getPath();
    await gitIgnoreByArgument(argument, dir);
    await createRepo(dir);
}

export async function nodeCreateMnu(argument = undefined, greet = false) {
    argument = await getArgumentByMenu(['empty', 'server', 'cli'], argument, greet);
    const dir = await getPath();
    await createNode(dir);
    await nodeStructureByArgument(argument, dir);
}

export async function createMenu() {
    const answer = await menu([
        'Flutter',
        'Node',
        'Python',
        'Git',
        'Bash'
    ],);

    switch (answer) {
        case 'Flutter':
            await flutterCreateMenu();
            break;
        case 'Node':
            await nodeCreateMnu();
            break;
        case 'Python':
            break;
        case 'Git':
            await gitCreateMenu();
            break;
        case 'Bash':
            break;
    }
}

