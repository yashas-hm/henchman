import {errorExit, errorSpinnerExit, execute, getConfig} from '../core/utils.js';
import {henchman} from '../core/constants.js';
import fs from 'fs/promises';
import path from 'path';
import ora from 'ora';
import chalk from 'chalk';
import inquirer from 'inquirer';

export async function createNode(dir) {
    const config = await getConfig();
    let name = config.node.name;
    let url = config.node.url;
    let license = config.node.license;
    const params = [];
    const prompt = [];

    try {
        await fs.access(path.join(dir));
    } catch (err) {
        if (err.code === 'ENOENT') {
            await fs.mkdir(path.join(dir));
        } else {
            errorSpinnerExit(undefined, err);
        }
    }

    if (name === undefined) {
        prompt.push({
            type: 'input',
            name: 'name',
            message: `${henchman}: Enter your name`,
        });
    }

    if (url === undefined) {
        prompt.push({
            type: 'input',
            name: 'url',
            message: `${henchman}: Enter your url ${chalk.grey('(Optional)')}`,
        });
    }

    if (license === undefined) {
        prompt.push({
            type: 'input',
            name: 'license',
            message: `${henchman}: Enter license`,
            default: 'MIT',
        });
    }

    if (prompt.length !== 0) {
        console.log(`${henchman}: Run \`henchman configure\` to set a default data\n`);
        const answers = await inquirer.prompt(prompt);

        name = answers['name'];
        url = answers['url'];
        license = answers['license'];
    }

    if (name !== undefined || name !== '') {
        params.push(`--init-author-name "${name}"`);
    } else {
        errorExit(`${henchman}: Name cannot be empty`);
    }

    if (url !== undefined || name !== '') {
        params.push(`--init-author-url "${url}"`);
    }

    if (license !== undefined || name !== '') {
        params.push(`--init-license "${license}"`);
    }

    await execute(
        `cd ${dir}; npm init ${params.join(' ')} --yes`,
        'Creating node project'
    );
}

export async function emptyNodeStructure(dir) {
    const spinner = ora(`${henchman}: Setting up empty node project`).start();
    try {
        await fs.writeFile(path.join(dir, 'index.js'));
        spinner.succeed(`${henchman}: Setup Complete\n`);
    } catch (err) {
        errorSpinnerExit(spinner, err);
    }
}

export async function cliNodeProject(dir) {
    const spinner = ora(`${henchman}: Setting up node CLI project`).start();
    try {
        await fs.mkdir(path.join(dir, 'templates'), {recursive: true});
        await fs.mkdir(path.join(dir, 'core'), {recursive: true});
        await fs.mkdir(path.join(dir, 'menus'), {recursive: true});

        await fs.writeFile(path.join(dir, 'core/constants.js'), '');
        await fs.writeFile(path.join(dir, 'core/utils.js'), '');

    } catch (err) {
        errorSpinnerExit(spinner, err);
    }

    let dependencies = [
        'chalk',
        'commander',
        'inquirer',
        'ini',
        'ora',
    ];

    await execute(
        `cd ${dir}; npm install --save ${dependencies.join(' ')}`,
        `Adding dependencies`
    );
}

export async function serverNodeStructure(dir) {
    const spinner = ora(`${henchman}: Setting up node server project`).start();
    try {
        await fs.mkdir(path.join(dir, 'core'), {recursive: true});
        await fs.mkdir(path.join(dir, 'controllers'), {recursive: true});
        await fs.mkdir(path.join(dir, 'routes'), {recursive: true});
        await fs.mkdir(path.join(dir, 'pages'), {recursive: true});
        await fs.mkdir(path.join(dir, 'docs'), {recursive: true});

        await fs.mkdir(path.join(dir, 'core/constants'), {recursive: true});
        await fs.mkdir(path.join(dir, 'core/utils'), {recursive: true});
        await fs.mkdir(path.join(dir, 'core/models'), {recursive: true});
        await fs.mkdir(path.join(dir, 'pages/views'), {recursive: true});
        await fs.mkdir(path.join(dir, 'pages/css'), {recursive: true});

        await fs.writeFile(path.join(dir, '.env'), '');
        await fs.writeFile(path.join(dir, 'docs/documentation.md'), '');
        await fs.writeFile(path.join(dir, 'docs/swaggerDocs.js'), '');
        await fs.writeFile(path.join(dir, 'docs/components.js'), '');
        await fs.writeFile(path.join(dir, 'server.js'), '');
        spinner.succeed(`${henchman}: Setup Complete\n`);
    } catch (err) {
        errorSpinnerExit(spinner, err);
    }

    let dependencies = [
        'body-parser',
        'cors',
        'dotenv',
        'express',
        'node-cron',
        'swagger-jsdoc',
        'swagger-ui-express',
        'express-rate-limit',
        'axios'
    ];

    await execute(
        `cd ${dir}; npm install --save ${dependencies.join(' ')}`,
        `Adding dependencies`
    );

    await execute(
        `cd ${dir}; npm install --save-dev nodemon`,
        `Adding dev dependencies`
    );
}

export async function nodeStructureByArgument(args, dir) {
    switch (args) {
        case 'empty':
            await emptyNodeStructure(dir);
            break;
        case 'server':
            await serverNodeStructure(dir);
            break;
        case 'cli':
            await cliNodeProject(dir);
            break;
    }
}

export async function cleanNodeProjects(dir) {
    console.log('');
    const spinner = ora(`${henchman}: Cleaning up node_modules\n`).start();
    try {
        const files = await fs.readdir(dir);
        for (const file of files) {
            const dirPath = path.join(dir, file);
            const status = await fs.stat(dirPath);
            if (status.isDirectory()) {
                const subDir = await fs.readdir(dirPath);
                if (subDir.includes('node_modules')) {
                    console.log(`${henchman}: Cleaning up node_modules in ${chalk.blue(dirPath)}`);
                    await fs.rm(
                        path.join(dir, 'node_modules'),
                        {recursive: true, force: true}
                    );
                }
            }
        }
    } catch (err) {
        errorSpinnerExit(spinner, err);
    }
    spinner.succeed('Cleanup Complete');
}