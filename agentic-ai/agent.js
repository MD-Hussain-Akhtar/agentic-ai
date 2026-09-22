const { Ollama } = require("ollama");

const {
    createTask,
    showTasks,
    deleteTask
} = require("./tools");

const ollama = new Ollama({
    host: "http://127.0.0.1:11434"
});

async function runAgent(userMessage) {

    const response = await ollama.chat({

        model: "qwen3.5:4b",

        messages: [
            {
                role: "system",

                content: `
You are a helpful AI task agent.

You have these tools:

CREATE_TASK|task|priority
SHOW_TASKS
DELETE_TASK|id

Rules:

If user wants to create a task:
CREATE_TASK|task name|priority

If user wants to see tasks:
SHOW_TASKS

If user wants to delete a task:
DELETE_TASK|id

Otherwise answer normally.

For priority use only:
low
medium
high
`
            },

            {
                role: "user",
                content: userMessage
            }
        ]

    });

    const answer = response.message.content.trim();

    console.log("\nAgent decision:", answer);


    // CREATE TASK
    if (answer.startsWith("CREATE_TASK|")) {

        const parts = answer.split("|");

        const task = parts[1];

        const priority = parts[2] || "medium";

        const result = createTask(
            task,
            priority
        );

        return `✅ Task created: ${result.task}`;
    }


    // SHOW TASKS
    if (answer === "SHOW_TASKS") {

        const tasks = showTasks();

        if (tasks.length === 0) {
            return "📭 No tasks found.";
        }

        return tasks
            .map(task =>
                `${task.id}. ${task.task} (${task.priority})`
            )
            .join("\n");
    }


    // DELETE TASK
    if (answer.startsWith("DELETE_TASK|")) {

        const parts = answer.split("|");

        const id = parts[1];

        const result = deleteTask(id);

        if (result.deleted) {
            return `✅ Task ${id} deleted.`;
        }

        return `❌ Task ${id} not found.`;
    }


    return answer;
}

module.exports = runAgent;