/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, } from "react";


const TaskContext = createContext( null )

export function useTaskContext() {
    return useContext( TaskContext );
}

// eslint-disable-next-line react/prop-types
function TaskProvider({children}) {
    const [ creating, setCreating ] = useState(false);
    const [ taskReload, setTaskReload] = useState(false);
    const [ isEditing, setIsEditing ] = useState(false)
    const [ selectedTask, setSelectedTask] = useState({});

  return (
    <TaskContext.Provider value={{ creating, setCreating, taskReload, setTaskReload, isEditing, setIsEditing, setSelectedTask, selectedTask }}>
        {children}
    </TaskContext.Provider>
  )
}

export default TaskProvider