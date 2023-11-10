import Navbar from "./components/Navbar"
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { useTaskContext } from "./context/TaskContext"
import { useAuthContext } from "./context/AuthContext";
import LogoutPage from "./components/LogoutPage";

function App() {
  const { creating, isEditing } = useTaskContext();
  const { isAuthenticated } = useAuthContext();
  const CurrentView = () => {
    if(isAuthenticated) return <TaskList/>
    return <LogoutPage/>
  };

  return (
    <>
    <Navbar/>
    { (creating || isEditing) && <TaskForm/> }
    <CurrentView/>
    </>
  )
}

export default App
