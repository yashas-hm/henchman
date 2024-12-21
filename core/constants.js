import chalk from "chalk";

export const henchman = `🧌 ${chalk.green('Henchman')}`;
export const greetMessage = `${henchman}: Happy to Help!\n`;
export const byeMessage = `\n${henchman}: Bye, have a great day.`;
export const invalidChoiceMessage = `\n${henchman}: Invalid choice choose again.`;
export const errorMessage = `\n${henchman}: Unexpected error occurred, below is the error and stacktrace:\n`;

export function logo() {
    console.log(chalk.green(
        '\n'+
        '╭╮╱╭╮╱╱╱╱╱╱╱╱╭╮\n' +
        '┃┃╱┃┃╱╱╱╱╱╱╱╱┃┃\n' +
        '┃╰━╯┣━━┳━╮╭━━┫╰━┳╮╭┳━━┳━╮\n' +
        '┃╭━╮┃┃━┫╭╮┫╭━┫╭╮┃╰╯┃╭╮┃╭╮╮\n' +
        '┃┃╱┃┃┃━┫┃┃┃╰━┫┃┃┃┃┃┃╭╮┃┃┃┃\n' +
        '╰╯╱╰┻━━┻╯╰┻━━┻╯╰┻┻┻┻╯╰┻╯╰╯\n')
    );
}
