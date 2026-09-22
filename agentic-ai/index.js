const readline = require("readline");

const runAgent = require("./agent");


const rl = readline.createInterface({

    input: process.stdin,

    output: process.stdout

});


console.log(`
================================
       🤖 MY AI AGENT
================================

Type your command.

Examples:

Create a task to learn SQL
Show my tasks
Delete task 1

Type exit to close.
`);


function askUser() {

    rl.question("\nYou: ", async (message) => {

        if (message.toLowerCase() === "exit") {

            console.log("Goodbye 👋");

            rl.close();

            return;
        }


        try {

            const result =
                await runAgent(message);

            console.log("\nAI:", result);

        }

        catch (error) {

            console.log(
                "\n❌ Error:",
                error.message
            );

        }


        askUser();
    });
}


askUser();