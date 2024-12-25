import {program} from "commander";
import {cliArgument, execute, getConfig, invalidCommandExit, menu} from "../core/utils.js";
import {byeMessage, greetMessage, henchman, logo} from "../core/constants.js";
import inquirer from "inquirer";

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
        })
        .addHelpText('beforeAll', `${logo}${greetMessage}`);

    cliArgument(
        start,
        'sim',
        'Start android or iOS simulator',
        ['android', 'ios'],
        (args) => startSimMenu(args)
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

    if (config.node.emulator === undefined) {
        console.log(`${henchman}: Emulator config not found. Run \`henchman configure\` to set default emulator`);
    } else {
        await execute(
            `emulator @${config.node.emulator}`,
            'Starting Android Simulator'
        );
    }
}

export async function startIOSSim() {
    if (process.platform !== 'darwin') {
        console.log(`${henchman}: Command only available on MAC devices`);
    } else {
        await execute('open -a simulator', 'Starting iOS Simulator');
    }
}

export async function startSimMenu(args = undefined) {
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
        console.log(byeMessage);
    } else {
        switch (args) {
            case 'android':
                await startAndroidSim();
                break;
            case 'ios':
                await startIOSSim();
                break;
        }
        console.log(byeMessage);
    }
}

export async function startMenu() {
    console.log(logo);
    console.log(greetMessage);
    const answer = await menu(['Android Simulator', 'iOS Simulator']);
    switch (answer) {
        case 'Android Simulator':
            await startAndroidSim();
            break;
        case 'iOS Simulator':
            await startIOSSim();
            break;
    }
    console.log(byeMessage);
}