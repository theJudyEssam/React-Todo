import { createContext, useState, useEffect, useContext} from "react"
import axios from "axios"



const AuthContext = createContext();


export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
   // const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)
  //  const [error, setError] = useState(null)

    useEffect(()=>{
        const checkUser = async () => {
            try{
                const response = await axios.get("http://localhost:3000/verify", { withCredentials: true });
                console.log(response.data.user)       
                setUser(response.data.user)
                setLoading(false)
            }
            catch(err){
                setLoading(false)
            }
        }
        checkUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated: !!user, loading }}>
        {children}
      </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext);
