import {useState} from 'react';

function useTasks () {
    const [tasks, setTasks] = useState([]);
    const [loadingTask, setLoadingTasks] = useState(false);

    const getTasks = (user) => {
        setLoadingTasks(true);
        fetch(`/api/task/${user}`)
        .then(res => res.json())
        .then(res =>  setTasks(res))
        .catch(error => console.error(error))
        .finally(() => setLoadingTasks(false));
    };
    

    const addNewTask = (newTask) => {
        const jsonTask = JSON.stringify(newTask);
        setLoadingTasks(true);
        fetch('/api/task',{
            method: 'POST',
            body: jsonTask,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => res)
        .catch(error => console.error(error))
        .finally(() => setLoadingTasks(false))
    };

    const deleteTask = (id) => {
        setLoadingTasks(true)
        fetch(`/api/task/random/${id}`,{
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(res => res)
        .catch(error => console.error(error))
        .finally(() => setLoadingTasks(false))
    };

    const getOneTask = (id) => {
        fetch(`/api/task/random/${id}`)
        .then(res => res.json())
        .then(res => console.log(res))
    };

    const editTask = (id, task) => {
        setLoadingTasks(true)
        fetch(`/api/task/random/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(res => res)
        .catch(error => console.error(error))
        .finally(() => setLoadingTasks(false));
    };

    return {
        tasks,
        loadingTask,
        getTasks,
        getOneTask,
        addNewTask,
        deleteTask,
        editTask,
    }
}

export default useTasks;