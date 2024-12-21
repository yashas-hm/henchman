import {program} from 'commander';

export function createCLI() {
    const create = program.command('create')
        .argument('[config]')
        .description('Create new project for <command> languages')
        .action((_)=>{
            if(_!==undefined){
                console.log(program.helpInformation());
                process.exit(1);
            }else{
                console.log('ed')
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
        .command('python')
        .argument('[config]')
        .description('')
        .action((argument) => console.log(argument));
}