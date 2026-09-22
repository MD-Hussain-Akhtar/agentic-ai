const fs = require("fs");

const FILE = "./tasks.json";

function getTasks() {
    return JSON.parse(fs.readFileSync(FILE, "utf8"));
}

function saveTasks(tasks) {
    fs.writeFileSync(
        FILE,
        JSON.stringify(tasks, null, 2)
    );
}


// CREATE TASK
function createTask(task, priority) {

    const tasks = getTasks();

    const newTask = {
        id: tasks.length + 1,
        task: task,
        priority: priority
    };

    tasks.push(newTask);

    saveTasks(tasks);

    return newTask;
}


// SHOW TASKS
function showTasks() {

    const tasks = getTasks();

    return tasks;
}


// DELETE TASK
function deleteTask(id) {

    let tasks = getTasks();

    const oldLength = tasks.length;

    tasks = tasks.filter(task => task.id !== Number(id));

    saveTasks(tasks);

    return {
        deleted: oldLength !== tasks.length
    };
}


module.exports = {
    createTask,
    showTasks,
    deleteTask
};