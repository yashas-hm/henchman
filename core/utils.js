import {createCLI} from "../menus/create.js";
import {program} from "commander";
import {setupCLI} from "../menus/setup.js";

export function initCLI() {
    createCLI();
    setupCLI();
    program.parse(process.argv);
}