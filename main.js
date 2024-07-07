#!/usr/bin/env node
import inquirer from "inquirer";
let myBalance = 10000;
let myPin = 1002;
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: "Enter your pin code: ",
        type: "number",
    },
]);
if (pinAnswer.pin === myPin) {
    console.log("pin is correct, login successfully!");
    console.log(`Your current account balance is ${myBalance}`);
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "what do you want to do?",
            choices: ["withdraw", "check balance"],
        },
    ]);
    if (operationAns.operation === "withdraw") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "Select a withdrawl Method",
                choices: ["fast Cash", "Enter Amount"]
            }
        ]);
        if (withdrawAns.withdrawMethod === "fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select Amount:",
                    choices: [1000, 2000, 5000, 1000]
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log("Insufficient Balance");
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(`${fastCashAns.fastCash} withdraw successfully!`);
                console.log(`your remaining balance is: ${myBalance}`);
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter your Amount: ",
                },
            ]);
            if (amountAns.amount > myBalance) {
                console.log("Insufficient Balance");
            }
            else {
                myBalance -= amountAns.amount;
                console.log(`${amountAns.amount} withdraw successfully!`);
                console.log(`your remaining balance is: ${myBalance}`);
            }
        }
    }
    else if (operationAns.operation === "check balance") {
        console.log(`Your balance is: ${myBalance}`);
    }
}
else {
    console.log("Pin is Incorrect, Try Again!");
}
