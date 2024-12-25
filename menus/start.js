import {program} from 'commander';
import {cliArgument, errorExit, execute, getConfig, invalidCommandExit, menu} from '../core/utils.js';
import {byeMessage, greetMessage, henchman, logo} from '../core/constants.js';
import inquirer from 'inquirer';

export function startCLI() {
    const start = program.command('start')
        .argument('[config]')
        .description('Start a process')
        .action(async (_) => {
            if (_ !== undefined) {
                invalidCommandExit();
            } else {
                await startMenu();
            }
        });

    cliArgument(
        start,
        'sim',
        'Start android or iOS simulator',
        ['android', 'ios'],
        (args) => startSimMenu(args, true)
    );
}

// export async function startAndroidSim(){
//     await execute(
//         'OUTPUT=(); while IFS= read -r line; do OUTPUT+=("$line"); done < $(emulator -list-avds); EMULATOR=${OUTPUT[1]}; emulator @$EMULATOR;',
//         'Starting Android Simulator'
//     );
//     console.log(byeMessage);
// }

export async function startAndroidSim() {
    const config = await getConfig();
    let emulator = config.sim.emulator;
    if (emulator === undefined) {
        console.log(`${henchman}: Run \`henchman configure\` to set a default emulator`);
        const answer = await inquirer.prompt({
            type: 'input',
            name: 'emulator',
            message: `${henchman}: Enter emulator name`
        });

        if (answer['emulator'] === '') {
            errorExit(`${henchman}: Emulator name cannot be empty`);
        } else {
            emulator = answer['emulator'];
        }
    }

    await execute(
        `emulator @${emulator}`,
        'Starting Android Simulator'
    );

    console.log(byeMessage);
}

export async function startIOSSim() {
    if (process.platform !== 'darwin') {
        console.log(`${henchman}: Command only available on MAC devices`);
    } else {
        await execute('open -a simulator', 'Starting iOS Simulator');
    }
    console.log(byeMessage);
}

export async function startSimMenu(args = undefined, greet = false) {
    if (greet) {
        console.log(logo);
        console.log(greetMessage);
    }
    if (args === undefined) {
        const sims = await inquirer.prompt({
            type: 'checkbox',
            name: 'sims',
            message: 'Select simulators:',
            choices: ['android', 'ios'],
        });
        if (sims['sims'].includes('ios')) {
            await startIOSSim();
        }

        if (sims['sims'].includes('android')) {
            await startAndroidSim();
        }
    } else {
        switch (args) {
            case 'android':
                await startAndroidSim();
                break;
            case 'ios':
                await startIOSSim();
                break;
        }
    }
}

export async function startMenu() {
    console.log(logo);
    console.log(greetMessage);
    const answer = await menu(['Start Android Simulator', 'Start iOS Simulator']);
    switch (answer) {
        case 'Start Android Simulator':
            await startAndroidSim();
            break;
        case 'Start iOS Simulator':
            await startIOSSim();
            break;
    }
}