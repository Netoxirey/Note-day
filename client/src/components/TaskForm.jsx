import { useTaskContext, } from "../context/TaskContext";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import useTasks from "../hooks/useTasks";
import { useAuthContext } from "../context/AuthContext";

function TaskForm() {
  const { setCreating, setTaskReload, setIsEditing, isEditing, selectedTask, setSelectedTask } = useTaskContext();
  const { addNewTask, editTask } = useTasks();
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ error, setError ] = useState({title: false});
  const {user} = useAuthContext();
  
  useEffect(() => {
    if(isEditing) {
      setTitle(selectedTask.title)
      setDescription(selectedTask.description)
    }
  }, [isEditing])

  const handleInput = (e, setter) => {
    const value = e.target.value;
    setter(value);
  };

  const handleCancel = () => {
    setCreating(false)
    setIsEditing(false)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!title) return setError({title: true})
    if(!isEditing) {
      addNewTask({
        title,
        description,
        createdBy: user.sub,  
      })
    } else {
      editTask(selectedTask._id, {
        title,
        description,
      })
    }
    setTitle('');
    setDescription('');
    setTaskReload((reload) => !reload)
    setCreating(false);
    setIsEditing(false);
    setError({title: false})
    setSelectedTask({});
    window.location.reload(false)
  };

  return (
    <Modal>
      <form
        className="container flex flex-col gap-3 mx-auto bg-black rounded-lg border p-5 w-80 max-w-[90%] relative group"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-3">
            <label htmlFor="title">Title</label>
            <input className={`input-text ${error.title && 'border-red-600'} `}
            type="text" name="title" id="title" 
            placeholder="Do homework"
            value={title}
            onChange={(e) => handleInput(e, setTitle)}
            />
            {error.title && <p className="text-red-600">Please write a title</p>}
        </div>
        <div className="flex flex-col gap-3">
            <label htmlFor="description">Description</label>
            <textarea className="input-text" 
            name="description" id="description" 
            cols="30" rows="5" 
            placeholder="Look for information about tigers"
            value={description}
            onChange={(e) => handleInput(e, setDescription)}
            >
              
            </textarea>
        </div>
        <div className="flex self-end gap-5">
          <input type="button" value="Cancel" 
          className="btn-text" 
          onClick={ handleCancel } />
          <button className="btn">{isEditing? 'Save' : 'Create'}</button>
        </div>
      </form>
    </Modal>
  );
}

export default TaskForm;
