import {program} from 'commander';
import {byeMessage, greetMessage, henchman, logo} from '../core/constants.js';
import inquirer from 'inquirer';
import ora from 'ora';
import {errorSpinnerExit} from '../core/utils.js';
import fs from 'fs/promises';
import path from "path";
import {baseDir} from "../henchman.js";

export function configureCLI(){
    program.command('configure')
        .description(`Configure ${henchman}`)
        .action(configure);
}

export async function configure(){
    console.log(logo);
    console.log(greetMessage);
    
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: `${henchman}: Enter your name:`,
        },
        {
            type: 'input',
            name: 'url',
            message: `${henchman}: Enter your website url:`,
        },
        {
            type: 'input',
            name: 'license',
            message: `${henchman}: Choose default license:`,
            default: 'MIT',
        }
    ]);
    const name = answers['name'];
    const url = answers['url'];
    const license = answers['license'];
    const data = ['[node]'];
    
    if(name!==''){
        data.push(`name=${name}`);
    }
    
    if(url!==''){
        data.push(`url=${url}`);
    }
    
    data.push(`license=${license}`);
    
    const spinner = ora(`${henchman} generating configuration file`).start();
    try{
        await fs.writeFile(path.join(baseDir, 'config.ini'), data.join('\n'));
        spinner.succeed(`${henchman} configuration complete`);
        console.log(byeMessage);
    }catch(err){
        errorSpinnerExit(spinner, err);
    }
}