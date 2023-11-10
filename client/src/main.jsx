import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import TaskProvider from './context/TaskContext.jsx';
import AuthProvider from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <TaskProvider>
        <App/>
      </TaskProvider>
    </AuthProvider>
  </React.StrictMode>,
)
