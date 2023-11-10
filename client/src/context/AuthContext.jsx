import { createContext, useContext, useEffect, useState} from "react"

const AuthContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
    return useContext(AuthContext);
}

// eslint-disable-next-line react/prop-types
function AuthProvider({children}) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated , setIsAuthenticated] = useState(false);
  useEffect(() => {
    fetch('/authenticated')
    .then(res => res.json())
    .then(res => setIsAuthenticated(res))
    .catch(error => console.error(error))
  },[])

  useEffect(() => {
    setIsLoading(true)
    fetch('/profile')
    .then(res => res.json())
    .then(res => setUser(res))
    .catch(error => console.error(error))
    .finally(() => setIsLoading(false))
  },[isAuthenticated])

  return (
    <AuthContext.Provider value={{user, isLoading, isAuthenticated}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider