import path from 'path';
import {henchman} from '../core/constants.js';
import ora from 'ora';
import fs from 'fs/promises';
import {errorSpinnerExit, execute} from '../core/utils.js';
import chalk from 'chalk';


export async function cleanPythonProjects(dir) {
    console.log('');
    const spinner = ora(
        `${henchman}: Cleaning up python virtual environments ${chalk.yellow('(env or venv)')}\n`
    ).start();
    try {
        const files = await fs.readdir(dir);
        for (const file of files) {
            const dirPath = path.join(dir, file);
            const status = await fs.stat(dirPath);
            if (status.isDirectory()) {
                const subDir = await fs.readdir(dirPath);
                let virtualEnv = undefined;
                if (subDir.includes('env')) {
                    virtualEnv = 'env';
                } else if (subDir.includes('venv')) {
                    virtualEnv = 'venv';
                }
                if (virtualEnv !== undefined) {
                    console.log(`${henchman}: Cleaning python virtual env in ${chalk.blue(dirPath)}`);
                    await execute(
                        `cd ${dirPath};` +
                        `source ${virtualEnv}/bin/activate;` +
                        'pip freeze > requirements.txt;' +
                        'deactivate',
                        'Saving libraries using pip freeze'
                    );

                    await fs.rm(
                        path.join(dir, virtualEnv),
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