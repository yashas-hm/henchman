import {menu} from '../core/utils.js';
import {greetMessage, logo} from '../core/constants.js';
import {createMenu} from './create.js';
import {cleanupMenu} from "./cleanup.js";
import {setupMenu} from "./setup.js";
import {startMenu} from "./start.js";

export async function mainMenu(){
    console.log(logo);
    console.log(greetMessage);
    
    const choice = await menu([
        'Create',
        'Cleanup',
        'Get',
        'Setup',
        'Start'
    ],); 
    
    switch(choice){
        case 'Cleanup':
            await cleanupMenu();
            break;
        case 'Create':
            await createMenu();
            break;
        case 'Get':
            break;
        case 'Setup':
            await setupMenu();
            break;
        case 'Start':
            await startMenu();
            break;
    }
}