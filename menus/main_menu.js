import inquirer from 'inquirer';
import {menu} from "../core/utils.js";

export async function mainMenu(){
    const choice = await menu([
        'Create',
        'Cleanup',
        'Get',
        'Setup',
        'Start',
        'Stop'
    ],); 
    
    console.log(choice);
}