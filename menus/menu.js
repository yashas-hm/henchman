import inquirer from "inquirer";

export function mainMenu(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Please choose from one:',
            choices: [
                'Create',
                'Cleanup',
                'Get',
                'Setup',
                'Start',
                'Stop',
                'Exit'
            ],
        },
    ])
}