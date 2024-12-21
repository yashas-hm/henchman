import {program} from 'commander';
import inquirer from 'inquirer';
import {greetMessage, logo} from "../core/constants.js";
import {execute, getPath} from "../core/utils.js";

export function createCLI() {
    const create = program.command('create')
        .argument('[config]')
        .description('Create new project for <command> languages')
        .action(async (_)=>{
            if(_!==undefined){
                console.log(program.helpInformation());
                process.exit(1);
            }else{
                await create_menu();
            }
        });
    
    create
        .command('flutter')
        .argument('[config]')
        .description('')
        .action((argument) => console.log(argument));

    create
        .command('node')
        .argument('[config]')
        .description('')
        .action((argument) => console.log(argument));

    create
        .command('git')
        .argument('[config]')
        .description('')
        .action((argument) => console.log(argument));

    create
        .command('bash')
        .argument('[config]')
        .description('')
        .action((argument) => console.log(argument));
}

export async function create_menu(){
    logo();
    
    console.log(greetMessage);
    
    const answer = await inquirer.prompt({
        type: 'list',
        name: 'choice',
        message: 'Please choose from one:',
        choices: [
            'Flutter',
            'Node',
            'Python',
            'Git',
            'Bash'
        ],
    });
    console.log(answer['choice']);
    const path = await getPath();
    console.log(path);
    await execute(`flutter create ${path}`);
    console.log('Done')
}

