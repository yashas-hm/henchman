import {getArgumentByMenu, getPath} from "../core/utils.js";
import {gitIgnoreByArgument} from "../languages/git.js";
import {createNode, nodeStructureByArgument} from "../languages/node.js";

export async function gitSetupMenu(argument=undefined, greet=false){
    argument = await getArgumentByMenu(
        ['general', 'flutter', 'node', 'python', 'unity'],
        argument,
        greet
    );
    const dir = await getPath();
    await gitIgnoreByArgument(argument, dir);
}

export async function nodeSetupMenu(argument=undefined, greet=false){
    argument = await getArgumentByMenu(['empty', 'server', 'cli'], argument, greet);
    const dir = await getPath();
    await nodeStructureByArgument(argument, dir);
}