const {
    getAllTasks,
    getOneTask,
    addNewTask,
    editTask,
    deleteTask,
} = require('../models/task.model')

async function httpGetallTasks(req, res) {
    try {
        const userTasks = req.params.user;
        const allTasks = await getAllTasks(userTasks);
        if(!allTasks) return res.status(400).json(allTasks);
        return res.status(200).json(allTasks);
    } catch(error) {
        console.error(error);
        res.status(500).json(error);
    };
};

async function httpGetOneTask(req, res) {
    try{
        const taskId = req.params.id;
        const task = await getOneTask(taskId);
        if(!task) return res.status(404).json({message: 'task not found'});
        if(task.error) res.status(400).json(task.error);
        return res.status(200).json(task);
    } catch(error) {
        console.error(error);
        return res.status(500).json(error);
    }
};

async function httpCreateTask(req, res) {
    try{
        const newTask = req.body;
        const addedTask = await addNewTask(newTask);
        res.status(201).json(addedTask);
    } catch(error) {
        console.error(error);
        return res.status(500).json(error);
    };
};

async function httpUpdateTask(req, res) {
    try{
        const taskId = req.params.id;
        const task = req.body;
        const updatedTask = await editTask(taskId, task);
        if(updatedTask.error) return res.status(400).json(updatedTask.error);
        if(!updatedTask.modifiedCount) return res.status(404).json({message: 'Task not found'});
        return res.status(200).json(updatedTask);
    } catch(error) {
        console.error(error);
        return res.status(500).json(error);
    }
};

async function httpDeleteTask(req, res) {
    try{
        const taskId = req.params.id;
        const taskDeleted = await deleteTask(taskId);
        if(taskDeleted.error) return res.status(400).json(taskDeleted.error);
        if(!taskDeleted.deletedCount) return res.status(404).json({message: 'Task not found'});
        return res.status(200).json(taskDeleted);
    } catch(error) {
        console.error(error);
        return res.status(500).json(error);
    }
};
module.exports = {
    httpGetallTasks,
    httpGetOneTask,
    httpCreateTask,
    httpUpdateTask,
    httpDeleteTask,
};