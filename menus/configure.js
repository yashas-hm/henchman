import {program} from 'commander';
import {byeMessage, greetMessage, henchman, logo} from '../core/constants.js';
import inquirer from 'inquirer';
import ora from 'ora';
import {errorSpinnerExit, getConfig} from '../core/utils.js';
import fs from 'fs/promises';
import path from 'path';
import {baseDir} from '../henchman.js';
import chalk from 'chalk';

export function configureCLI() {
    program.command('configure')
        .description(`Configure ${henchman}`)
        .action(configure);
}

export async function configure() {
    console.log(logo);
    console.log(greetMessage);
    console.log(`Fill below questions to configure ${henchman}. Leaving a blank will fetch from old config or not create config necessary for some tools functions`);

    const oldConfig = await getConfig(true);

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: `${henchman}: Enter your name`,
            default: oldConfig.node?.name ?? '',
        },
        {
            type: 'input',
            name: 'url',
            message: `${henchman}: Enter your website url`,
            default: oldConfig.node?.url ?? '',
        },
        {
            type: 'input',
            name: 'license',
            message: `${henchman}: Enter default license`,
            default: oldConfig.node?.license ?? '',
        },
        {
            type: 'input',
            name: 'emulator',
            message: `${henchman}: Enter default android emulator name ${chalk.yellow('(Run \'emulator -list-avds\' to get list of emulators)')}`,
            default: oldConfig.sim?.emulator ?? '',
        },
        {
            type: 'input',
            name: 'sha',
            message: `${henchman}: Enter default android debug keystore path`,
            default: oldConfig.sha?.path ?? '',
        }
    ]);
    let name = answers['name'];
    let url = answers['url'];
    let license = answers['license'];
    let emulator = answers['emulator']
    let sha = answers['sha'];
    const data = ['[node]'];

    if (name !== '') {
        data.push(`name=${name}`);
    } else {
        name = oldConfig.node?.name;
        if (name !== undefined) {
            data.push(`name=${name}`);
        }
    }

    if (url !== '') {
        data.push(`url=${url}`);
    } else {
        url = oldConfig.node?.url;
        if (url !== undefined) {
            data.push(`url=${url}`);
        }
    }

    if (license !== '') {
        data.push(`license=${license}`);
    } else {
        license = oldConfig.node?.license;
        if (license !== undefined) {
            data.push(`license=${license}`);
        } else {
            data.push('license=MIT')
        }
    }

    data.push('[sim]');

    if (emulator !== '') {
        data.push(`emulator=${emulator}`);
    } else {
        emulator = oldConfig.sim?.emulator;
        if (emulator !== undefined) {
            data.push(`emulator=${emulator}`);
        }
    }

    data.push('[sha]');

    if (sha !== '') {
        data.push(`path=${sha}`);
    } else {
        sha = oldConfig.sha?.path;
        if (sha !== undefined) {
            data.push(`path=${sha}`);
        }
    }

    const spinner = ora(`${henchman} generating configuration file`).start();
    try {
        await fs.writeFile(path.join(baseDir, 'config.ini'), data.join('\n'));
        spinner.succeed(`${henchman} configuration complete`);
        console.log(byeMessage);
    } catch (err) {
        errorSpinnerExit(spinner, err);
    }
}