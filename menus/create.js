import {program} from 'commander';
import {byeMessage, greetMessage, logo} from '../core/constants.js';
import {cliArgument, getPath, invalidCommandExit, menu} from '../core/utils.js';
import inquirer from 'inquirer';
import {createFlutter, createFlutterPackage} from '../languages/flutter.js';
import {createRepo,gitIgnoreByArgument,} from '../languages/git.js';

export function createCLI() {
    const create = program.command('create')
        .argument('[command]')
        .description('Create new project for Language')
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
        (args) => flutterMenu(args, true),
    );

    cliArgument(
        create,
        'node',
        'Create new node project',
        ['empty', 'server', 'cli'],
        (args) => console.log(args),
    );

    cliArgument(
        create,
        'git',
        'Create new git repository',
        ['general', 'flutter', 'node', 'python', 'unity'],
        (args) => gitMenu(args, true),
    );

    create
        .command('python')
        .action((argument) => console.log(argument));
    
    create
        .command('bash')
        .action((argument) => console.log(argument));
}

export async function flutterMenu(argument = undefined, greet = true) {
    const choices = ['app', 'package'];
    if (greet) {
        console.log(logo);
        console.log(greetMessage);
    }

    if (argument === undefined) {
        argument = await menu(choices);
    }
    
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

export async function gitMenu(argument = undefined, greet = false) {
    const choices = ['General', 'Flutter', 'Node', 'Python', 'Unity'];
    if (greet) {
        console.log(logo);
        console.log(greetMessage);
    }

    if (argument === undefined) {
        argument = await menu(choices);
    }
    
    let path = getPath();
    await gitIgnoreByArgument(argument);
    await createRepo(path);
    console.log(byeMessage);
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
            await flutterMenu(undefined, false);
            break;
        case 'Node':
            break;
        case 'Python':
            break;
        case 'Git':
            await gitMenu(undefined, false);
            break;
        case 'Bash':
            break;
    }
}

