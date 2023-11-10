const taskData = require('./task.mongo');

async function getAllTasks(user) {
    try {
        return await taskData.find({createdBy: user});
    } catch (error) {
        console.error(error);
        return { error: error };
    }
}

async function getOneTask(id) {
    try {
        return await taskData.findById(id);
    } catch (error) {
        console.error(error);
        return { error: error };
    }
}

async function addNewTask(task) {
    try {
        return await taskData.create(task);
    } catch (error) {
        console.error(error);
        return { error: error };
    }
}

async function editTask(id, task) {
    try {
        return await taskData.updateOne({ _id: id }, task);
    } catch (error) {
        console.error(error);
        return { error: error };
    }
}

async function deleteTask(id) {
    try {
        return await taskData.deleteOne({ _id: id });
    } catch (error) {
        console.error(error);
        return { error: error };
    }
}

module.exports = {
    getAllTasks,
    getOneTask,
    addNewTask,
    editTask,
    deleteTask,
};

