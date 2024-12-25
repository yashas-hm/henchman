import {cliArgument, getArgumentByMenu, getPath, invalidCommandExit, menu} from '../core/utils.js';
import {gitIgnoreByArgument} from '../languages/git.js';
import {nodeStructureByArgument} from '../languages/node.js';
import {setupFlutterAppStructure, setupFlutterPackageStructure} from '../languages/flutter.js';
import {byeMessage, greetMessage, logo} from '../core/constants.js';
import {program} from 'commander';

export function setupCLI() {
    const setup = program.command('setup')
        .argument('[config]')
        .description('Create new project for selected language')
        .action(async (_) => {
            console.log(logo);
            console.log(greetMessage);
            if (_ !== undefined) {
                invalidCommandExit();
            } else {
                await setupMenu();
            }
        });

    cliArgument(
        setup,
        'flutter',
        'Setup folder structure for flutter project',
        ['app', 'package'],
        (args) => flutterSetupMenu(args, true),
    );

    cliArgument(
        setup,
        'node',
        'Setup folder structure for node project',
        ['empty', 'server', 'cli'],
        (args) => nodeSetupMenu(args, true),
    );

    cliArgument(
        setup,
        'git',
        'Setup .gitignore for git repository',
        ['general', 'flutter', 'node', 'python', 'unity'],
        (args) => gitSetupMenu(args, true),
    );
}

export async function gitSetupMenu(argument = undefined, greet = false) {
    argument = await getArgumentByMenu(
        ['general', 'flutter', 'node', 'python', 'unity'],
        argument,
        greet
    );
    const dir = await getPath();
    await gitIgnoreByArgument(argument, dir);
    console.log(byeMessage);
}

export async function nodeSetupMenu(argument = undefined, greet = false) {
    argument = await getArgumentByMenu(['empty', 'server', 'cli'], argument, greet);
    const dir = await getPath();
    await nodeStructureByArgument(argument, dir);
    console.log(byeMessage);
}

export async function flutterSetupMenu(argument = undefined, greet = false) {
    argument = await getArgumentByMenu(['app', 'package'], argument, greet);
    const dir = await getPath();
    switch (argument) {
        case 'app':
            await setupFlutterAppStructure(dir);
            break;
        case 'package':
            await setupFlutterPackageStructure(dir);
            break;
    }
    console.log(byeMessage);
}

export async function setupMenu() {
    console.log(logo);
    console.log(greetMessage);
    const answer = await menu([
        'Flutter',
        'Node',
        'Git',
    ],);

    switch (answer) {
        case 'Flutter':
            await flutterSetupMenu();
            break;
        case 'Node':
            await nodeSetupMenu();
            break;
        case 'Git':
            await gitSetupMenu();
            break;
    }
}