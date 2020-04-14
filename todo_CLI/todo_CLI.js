const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const list = [];

// [
//    0 ['answer1', false]
//    1 ['answer2', false]
// ]

const instructions = `(v) View • ( n ) New • (cX) Complete • (dX) Delete • (q) Quit \n> `;
const welcomeMsg = `
Welcome to Todo CLI!

--------------------

${instructions}`;

rl.question(welcomeMsg, TodoCli);

function printList (list) {
    if (list.length === 0) {
        console.log('List is empty...');
        return;
    }

    for (let i = 0; i < list.length; i++) {
        const item = list[i][0];
        const completed = list[i][1] ? '[✓]' : '[ ]';
        console.log(`${i} ${completed} ${item}`);
    }
}

function TodoCli(command) {
    if (command === 'q'){
        console.log('See you soon! 😄');
        rl.close();
        return;
    }

    if (command === 'v') {
        printList(list);
    } else if (command === 'n') {
        rl.question("What? \n> ", (answer => {
            list.push([answer, false]);
            rl.question(instructions, TodoCli);
        }))
    } else if (command.startsWith('c')) {
        const number = Number(command.substring(1, command.length));
        if (number < list.length) {
            console.log(`Completed ${list[number][0]}`);
            list[number][1] = true;
        }
    } else if (command.startsWith('d')) {
        const number = Number(command.substring(1, command.length));
        if (number < list.length) {
            console.log(`Deleted ${list[number][0]}`);
            list.splice(number, 1);
        }
    }
    rl.question(instructions, TodoCli);
}
