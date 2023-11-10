const express = require('express');
const {
    httpGetallTasks,
    httpGetOneTask,
    httpCreateTask,
    httpDeleteTask,
    httpUpdateTask
} = require('./task.controller');

const taskRouter = express.Router();

taskRouter.get('/:user', httpGetallTasks);
taskRouter.get('/:user/:id', httpGetOneTask);
taskRouter.post('/', httpCreateTask);
taskRouter.patch('/:user/:id', httpUpdateTask);
taskRouter.delete('/:user/:id', httpDeleteTask);

module.exports = taskRouter;