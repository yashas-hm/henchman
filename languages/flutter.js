import {henchman} from '../core/constants.js';
import {errorSpinnerExit, execute} from '../core/utils.js';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs/promises';
import ora from 'ora';
import path from 'path';

export async function createFlutterPackage(dir){
    const params = [];
    console.log(`${henchman}: Creating flutter package`);
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: chalk.yellow('Note: It should be a valid dart module name i.e no spaces or uppercase allowed.') +
                `\n${henchman}: Enter project Name ${chalk.grey('(default: test)')}`,
        },
        {
            type: 'input',
            name: 'description',
            message: `${henchman}: Enter project description ${chalk.grey('(default: A new Flutter project)')}`,
        }
    ]);

    let projectName = answers['projectName'];
    let description = answers['description'];

    if (projectName === '') {
        projectName = 'test';
    }

    if (description === '') {
        description = 'A new Flutter project';
    }

    params.push(`--project-name="${projectName}"`);
    params.push(`--description="${description}"`);
    params.push(`--template=package`);
   
    await execute(`flutter create ${dir} ${params.join(' ')}`, 'Creating Flutter Package');
    await execute(`flutter create -e ${dir}/example`, 'Creating Flutter Example');
    
    await setupFlutterPackageStructure(dir);
}

export async function setupFlutterPackageStructure(dir){
    const spinner = ora(`${henchman}: Initializing setup for Flutter Package`).start();
    try{
        await fs.mkdir(path.join(dir, 'lib/src'), {recursive: true});
        await fs.writeFile(path.join(dir, `lib/src/${projectName}.dart`), '');
        await fs.appendFile(path.join(dir, '.gitignore'), '\n*ios/\n*android/\n*linux/\n*windows/\n*macos/');
        await fs.rm(
            path.join(dir, 'example/test'),
            {recursive: true, force: true}
        ).catch((_)=>{});
    }catch(err){
        errorSpinnerExit(spinner, err);
    }
    spinner.succeed(`${henchman}: Setup Complete`);
}

export async function createFlutter(path, platforms) {
    const params = [];
    console.log(`${henchman}: Creating flutter project`);

    const prompts = [
        {
            type: 'input',
            name: 'projectName',
            message: chalk.yellow('Note: It should be a valid dart module name i.e no spaces or uppercase allowed.') +
                `\n${henchman}: Enter project Name ${chalk.grey('(default: test)')}`,
        },
        {
            type: 'input',
            name: 'description',
            message: `${henchman}: Enter project description ${chalk.grey('(default: A new Flutter project)')}`,
        }
    ];

    if (platforms.includes('android') || platforms.includes('ios')) {
        prompts.push({
            type: 'input',
            name: 'organization',
            message: `${henchman}: Enter package name ${chalk.grey('(default: com.example)')}`,
        });
    }

    const answers = await inquirer.prompt(prompts);

    let projectName = answers['projectName'];
    let description = answers['description'];
    let org = answers['organization']

    if (projectName === '') {
        projectName = 'test';
    }

    if (org === '') {
        org = 'com.example';
    }

    if (description === '') {
        description = 'A new Flutter project';
    }

    params.push(`--platforms="${platforms.join(',')}"`);
    params.push(`--project-name="${projectName}"`);
    params.push(`--description="${description}"`);
    params.push(`--org="${org}"`);

    await execute(`flutter create -e ${path} ${params.join(' ')}`, 'Creating Flutter App');

    await addDependencies(path, platforms);

    await setupFlutterAppStructure(path);
}

export async function addDependencies(path, platforms) {
    let dependencies = [
        'resize',
        'flutter_riverpod',
        'gap',
        'flutter_svg',
        'intl',
        'auto_size_text',
        'http',
        'share_plus',
        'shared_preferences',
    ];

    if (platforms.includes('Android') || platforms.includes('iOS')) {
        dependencies.push('hive', 'hive_flutter',);
    }

    await execute(
        `cd ${path}; flutter pub add ${dependencies.join(' ')}`, 
        'Adding dependencies'
    );

    if (platforms.includes('Android') || platforms.includes('iOS')) {
        dependencies = [
            'change_app_package_name',
            'hive_generator',
            'build_runner',
            'flutter_launcher_icons',
        ];
        await execute(
            `cd ${path}; flutter pub add -d ${dependencies.join(' ')}`, 
            'Adding dev dependencies'
        );
    }
}

export async function setupFlutterAppStructure(dir) {
    console.log('');
    const spinner = ora(`${henchman}: Initializing folder structure setup\n`).start();
    try{
        await fs.mkdir(path.join(dir, 'assets'), {recursive: true});
        await fs.mkdir(path.join(dir, 'assets/fonts'), {recursive: true});
        await fs.mkdir(path.join(dir, 'assets/anim'), {recursive: true});
        await fs.mkdir(path.join(dir, 'assets/images'), {recursive: true});

        await fs.mkdir(path.join(dir, 'lib/widgets'), {recursive: true});
        await fs.mkdir(path.join(dir, 'lib/screens'), {recursive: true});
        await fs.mkdir(path.join(dir, 'lib/pages'), {recursive: true});
        await fs.mkdir(path.join(dir, 'lib/core'), {recursive: true});
        await fs.mkdir(path.join(dir, 'lib/providers'), {recursive: true});
        
        await fs.mkdir(path.join(dir, 'lib/core/constants'), {recursive: true});
        await fs.mkdir(path.join(dir, 'lib/core/error'), {recursive: true});
        await fs.mkdir(path.join(dir, 'lib/core/utilities'), {recursive: true});
        await fs.mkdir(path.join(dir, 'lib/core/models'), {recursive: true});

        await fs.mkdir(path.join(dir, 'docs'), {recursive: true});
        
        await fs.writeFile(path.join(dir, 'lib/core/utilities/utils.dart'), '');
        await fs.writeFile(path.join(dir, 'lib/core/utilities/snackbar_utils.dart'), '');
        await fs.writeFile(path.join(dir, 'lib/core/utilities/extensions.dart'), '');
        
        await fs.writeFile(path.join(dir, 'lib/core/constants/constants.dart'), '');
        await fs.writeFile(path.join(dir, 'lib/core/constants/colors.dart'), '');
        await fs.writeFile(path.join(dir, 'lib/core/constants/theme.dart'), '');
        
        await fs.writeFile(path.join(dir, 'lib/core/error/exceptions.dart'), '');
        await fs.writeFile(path.join(dir, 'lib/core/error/fallback_objects.dart'), '');

        await fs.writeFile(path.join(dir, 'docs/documentations.md'), '');
    }catch(err){
        errorSpinnerExit(spinner, err);
    }
    
    spinner.succeed(`${henchman}: Setup Complete\n`);
}

export async function cleanFlutterProjects(dir) {
    console.log('');
    const spinner = ora(`${henchman}: Cleaning up build files\n`).start();
    try{
        const files = await fs.readdir(dir);
        for(const file of files){
            const dirPath = path.join(dir, file);
            const status = await fs.stat(dirPath);
            if(status.isDirectory()){
                const subDir = await fs.readdir(dirPath);
                if(subDir.includes('pubspec.yaml')){
                    console.log(`${henchman}: Cleaning up build files in ${chalk.blue(dirPath)}`);
                    await execute(
                        `cd ${dirPath}; flutter clean build`, 
                        `Cleaning Flutter in ${dirPath}`
                    );
                }
            }
        }
    }catch (err){
        errorSpinnerExit(spinner, err);
    }
    spinner.succeed('Cleanup Complete');
}