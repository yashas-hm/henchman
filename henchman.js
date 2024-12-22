#! usr/bin/env node

import {initCLI} from "./core/utils.js";
import {mainMenu} from "./menus/main_menu.js";

if(process.argv.length<=2){
    await mainMenu();
}else{
    initCLI();   
}