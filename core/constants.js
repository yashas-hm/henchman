import chalk from "chalk";

export const henchman = `🧌 ${chalk.green('Henchman')}`;
export const greetMessage = `${henchman}: Happy to Help!`;
export const byeMessage = `${henchman}: Bye, have a great day.`;
export const invalidChoiceMessage = `${henchman}: Invalid choice choose again.`;

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
