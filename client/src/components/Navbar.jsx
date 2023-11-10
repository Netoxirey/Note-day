import { useTaskContext } from "../context/TaskContext";
import taskIcon from '../assets/task_icon.svg';
import createIcon from '../assets/create_icon.svg';
import hamburgerIcon from '../assets/hamburger_icon.svg';
import crossIcon from '../assets/cross_icon.svg';
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";

function Navbar() {
  const [show, setShow] = useState(false);
    const { setCreating } = useTaskContext();
    const {user, isLoading, isAuthenticated} = useAuthContext();
  return (
    <header className="w-full py-3 sticky top-0 bg-[--background] border-b border-slate-800 gradient-card z-10">
      <div className="container max-[90%]: flex justify-between items-center mx-auto">
        <div className="flex items-center">
        <img className="w-12" src={taskIcon} alt="task icon" />
        <h3 className="hidden lg:block">Note day</h3>
        </div>
          <nav className="hidden lg:flex gap-5 items-center">
            {isLoading && <p>...Loading</p>}
            {isAuthenticated && 
              <div className="flex gap-3 items-center">
                <button 
                className="btn flex" 
                onClick={() => {setCreating(true)}}
                >
                  <img className="w-6" src={createIcon} alt="create icon" />
                  Create Note
                </button>
                <img className="w-12 rounded-full" src={user.picture} alt="user picture" />
              </div>}
            {isAuthenticated? 
            <a 
            className="btn-overline" 
            href="/logout"
            >
              Log Out</a> : 
            <a 
            className="btn-overline" 
            href="/login"
            >
              Log in</a>}
          </nav>
          <nav className="flex lg:hidden gap-3 items-center">
          {isAuthenticated && <button 
                className="btn flex" 
                onClick={() => {setCreating(true)}}
                >
                  <img className="w-6" src={createIcon} alt="create icon" />
                  Create Note
            </button>}
            <button>
              <img 
              src={show ? crossIcon : hamburgerIcon} alt="hamburger icon"
              className="w-12"
              onClick={() => {setShow((state) => !state )}}
              />
            </button>
            <div className={`absolute right-0 top-[4.7rem] gap-3 p-10 border border-slate-800 bg-[--background] ${show ? 'mobile-show' : 'mobile-hidden'}`}>
            {user ? <img src={user.picture} className="w-12 rounded-full"/> : null}
            {isAuthenticated? 
            <a 
            className="btn-overline" 
            href="/logout"
            >
              Log Out</a> : 
            <a 
            className="btn-overline" 
            href="/login"
            >
              Log in</a>}
            </div>
          </nav>
      </div>
    </header>
  )
}

export default Navbar