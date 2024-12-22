import {menu} from '../core/utils.js';
import {greetMessage, logo} from '../core/constants.js';
import {createMenu} from './create.js';

export async function mainMenu(){
    console.log(logo);
    console.log(greetMessage);
    
    const choice = await menu([
        'Create',
        'Cleanup',
        'Get',
        'Setup',
        'Start',
        'Stop'
    ],); 
    
    switch(choice){
        case 'Cleanup':
            break;
        case 'Create':
            await createMenu();
            break;
        case 'Get':
            break;
        case 'Setup':
            break;
        case 'Start':
            break;
        case 'Stop':
            break;
    }
}