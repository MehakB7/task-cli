#!/usr/bin/env node
import { Command } from "commander";
import fs from "fs/promises";
import { printError, printInfo, printSuccess, printTable } from "../utils.mjs";

const findNextId = (taskList) => {
    if(taskList.length === 0) return 0;
    let nextId = Math.max(...taskList.map(item => item.id)) + 1;
    return nextId;

}

const readTaskFile = async () => {
    try {
        const data = await fs.readFile("task.json", "utf-8");
        const taskList = JSON.parse(data || "[]");
        return taskList;
    } catch (err) {
        if (err.code === "ENOENT") return [];
        throw err;
    }

}

const wrtieTaskFile = async (task) => {
    try {
        await fs.writeFile("task.json", JSON.stringify(task));
    } catch (e) {
        throw e;
    }

}

const addTask = async (task) => {
    try {
        let taskList = await readTaskFile();

        let id = findNextId(taskList);
        taskList.push({
            id,
            description: task,
            status: "to-do",
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await wrtieTaskFile(taskList);
        printInfo("Task added successfully: " + id);

    } catch (err) {
        printError(err.message);
    }
}


const deleteTask = async (task) => {
    try {
        let taskList = await readTaskFile();
        taskList = taskList.filter(item => item.id !== Number(task));
        await wrtieTaskFile(taskList);
        printSuccess("Task deleted successfully");
    } catch (error) {
        printError(error.message);
    }

}


const makeTask = async ( status, taskId) => {
    try{
    const taskList = await readTaskFile();
    const task = taskList.find((item) => item.id === Number(taskId));
    if (!task) {
        printError("Task not found");
        return;
    }
    task.status = status;
    task.updatedAt = new Date();
    await wrtieTaskFile(taskList);
    printSuccess("Task updated successfully");
    } catch (error) {
        printError(error.message);
    }
}


const listTask = async (status) => {
    try {
        let taskList = await readTaskFile();
        if(status) {
            taskList = taskList.filter(item => item.status === status);
        }

        if (taskList.length == 0) {
            printInfo("No tasks found");
            return;
        }

        printTable(taskList);
    } catch (err) {
        printError(err.message);
    }
}

const program = new Command();
program.version("1.0.0").description("A simple todo list cli");

program.command("add <task>").description("Add a task").action(async (task) => {
    await addTask(task);
})

program.command("delete <id>").description("Delete a task").action(async (id) => {
    await deleteTask(id);
});

program.command("mark <status> <id>").description("Mark a task as done").action(async (id, status) => {
    await makeTask(id, status);
});

program.command("list [status]" ).description("List all tasks or list tasks by status").action(async (status) => {
    await listTask(status);
});


program.parse(process.argv);