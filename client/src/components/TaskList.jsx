import useTasks from "../hooks/useTasks"
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import Card from "./Card";
import { useTaskContext } from "../context/TaskContext";
import Loader from "./Loader";

function TaskList() {
  const { getTasks, tasks, loadingTask, deleteTask, } = useTasks();
  const {  setIsEditing, setSelectedTask } = useTaskContext();
  const { user } = useAuthContext();

  useEffect(() => {
    if(user) {
      getTasks(user.sub);
    }
  },[ user ])

 
  const handleDelete = (id) => {
    window.location.reload(false)
    deleteTask(id);
  };

  const handleEdit = (task) => {
    setIsEditing(true)
    setSelectedTask(task)
  };
  
  return (
    <div className="relative w-full">
      {loadingTask && <Loader/>}
      {tasks.length === 0 ? 
      <div className=" container mx-auto h-[calc(100vh-7.1rem)] flex justify-center items-center"><h2 className="text-center">You don`t have any Note yet, Lets start creating one. </h2></div> 
      : null}
      <div className='container grid-responsive max-[90%] mx-auto my-10'>
          {tasks.map(task => ( 
            <Card key={task._id}> 
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <div className="flex gap-20 mt-auto items-center justify-start border-t py-3">
              <button className="btn-text" onClick={() => { handleDelete(task._id)}}>Delete</button>
              <button className="btn" onClick={() =>{handleEdit(task)}}>Edit</button>
              </div>
            </Card>
          ))}
      </div>
    </div>
  )
}

export default TaskList