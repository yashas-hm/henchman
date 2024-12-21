import inquirer from "inquirer";

export async function menu(list){
    return inquirer.prompt([
        {
          type: 'list',
          name: 'menu',
          message: 'Please choose from one:',
          choices: list,  
        },
    ]);
}