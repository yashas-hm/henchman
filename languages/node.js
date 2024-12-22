import {errorSpinnerExit, execute, getConfig} from '../core/utils.js';
import {byeMessage, henchman} from '../core/constants.js';
import fs from 'fs/promises';
import path from 'path';

export async function createNode(dir) {
    const config = await getConfig();
    const name = config.node.name;
    const url = config.node.url;
    const license = config.node.license;
    const params = [];

    if (name !== undefined) {
        params.push(`--init-author-name "${name}"`);
    }

    if (url !== undefined) {
        params.push(`--init-author-url "${url}"`);
    }

    params.push(`--init-license "${license}`);

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
        console.log(byeMessage);
    } catch (err) {
        errorSpinnerExit(spinner, err);
    }
}

export async function cliNodeProject(dir){
    const spinner = ora(`${henchman}: Setting up node CLI project`).start();
    try{
        await fs.mkdir(path.join(dir, 'templates'), {recursive: true});
        await fs.mkdir(path.join(dir, 'core'), {recursive: true});
        await fs.mkdir(path.join(dir, 'menus'), {recursive: true});

        await fs.writeFile(path.join(dir, 'core/constants.js'), '');
        await fs.writeFile(path.join(dir, 'core/utils.js'), '');
        
    }catch(err){
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
    
    console.log(byeMessage);
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
        console.log(byeMessage);
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
    
    console.log(byeMessage);
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