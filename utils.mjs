import chalk from 'chalk';

const printError = (error)=>{
     console.log(chalk.bgRed(`ERROR: ${error}`));
}


const printSuccess = (message)=>{
    console.log(chalk.bgGreen(`SUCCESS:  ${message}`));
}


const printInfo = (info)=>{
    console.log(chalk.bgBlue('INFO: '), info);
}

const printTable = (tableData)=>{
    console.log(chalk.bgBlue('INFO: '), 'Tasks');
    console.table(tableData, );
}

export {printError, printSuccess, printInfo, printTable};