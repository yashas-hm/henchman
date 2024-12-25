import {program} from 'commander';
import {
    cliArgument,
    errorExit,
    execute,
    getArgumentByMenu,
    getConfig,
    invalidCommandExit,
    menu
} from '../core/utils.js';
import {byeMessage, greetMessage, henchman, logo} from '../core/constants.js';
import inquirer from 'inquirer';
import chalk from 'chalk';

export function getCLI() {
    const get = program.command('get')
        .argument('[config]')
        .description('Get some information')
        .action(async (_) => {
            if (_ !== undefined) {
                invalidCommandExit();
            } else {
                await getMenu();
            }
        });

    cliArgument(
        get,
        'sha',
        'Get debug or release SHA key',
        ['debug', 'release'],
        (args) => getSHAMenu(args, true)
    );
}

export async function getDebugSHA() {
    const config = await getConfig();
    let debugKeyPath = config.sha.path;
    if (debugKeyPath === undefined) {
        console.log(`${henchman}: Run \`henchman configure\` to set a default android debug keystore path`);
        const answer = await inquirer.prompt({
            type: 'input',
            name: 'path',
            message: `${henchman}: Enter android debug keystore path`
        });

        if (answer['path'] === '') {
            errorExit(`${henchman}: Path cannot be empty`);
        } else {
            debugKeyPath = answer['path'];
        }
    }

    console.log(chalk.yellow(`${henchman}: Leave blank for default password`))
    const answer = await inquirer.prompt({
        type: 'password',
        name: 'pass',
        mask: '*',
        message: `${henchman}: Enter android debug keystore password ${chalk.grey('(default: android)')}`,
    });
    let pass = answer['pass'];
    if (pass === '') {
        pass = 'android';
    }

    await execute(
        `keytool -list -v -alias androiddebugkey -keystore ${debugKeyPath} -storepass ${pass}`,
        'Fetching debug SHA key...'
    );

    console.log(byeMessage);
}

export async function getReleaseSHA() {
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'path',
            message: `${henchman}: Enter android release keystore path`
        },
        {
            type: 'input',
            name: 'alias',
            message: `${henchman}: Enter android release keystore alias`
        },
        {
            type: 'password',
            name: 'pass',
            mask: '*',
            message: `${henchman}: Enter android release keystore password`,
        }
    ]);

    const relPath = answer['path'];
    const alias = answer['alias'];

    if (relPath === '') {
        errorExit(`${henchman}: Release key path cannot be empty.`);
    }

    if (alias === '') {
        errorExit(`${henchman}: Release key alias cannot be empty.`);
    }

    await execute(
        `keytool -list -v -keystore ${relPath} -alias ${alias} -storepass ${answer['pass']}`,
        'Fetching release SHA Key...'
    );

    console.log(byeMessage);
}

export async function getSHAMenu(args = undefined, greet = false) {
    if (greet) {
        console.log(logo);
        console.log(greetMessage);
    }
    args = await getArgumentByMenu(['debug', 'release'], args, greet);
    switch (args) {
        case 'debug':
            await getDebugSHA();
            break;
        case 'release':
            await getReleaseSHA();
            break;
    }
}

export async function getMenu() {
    console.log(logo);
    console.log(greetMessage);
    const answer = await menu(['Get debug SHA', 'Get release SHA']);
    switch (answer) {
        case 'Get debug SHA':
            await getDebugSHA();
            break;
        case 'Get release SHA':
            await getReleaseSHA();
            break;
    }
}