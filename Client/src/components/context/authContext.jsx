import { createContext, useState, useEffect, useContext} from "react"
import axios from "axios"
import Cookies from "universal-cookie"


const AuthContext = createContext();
const cookies = new Cookies();


export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(() => cookies.get('token'));
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const checkUser = async () => {
            try{
                const response = await axios.get("http://localhost:3000/verify", { withCredentials: true });
                console.log("bloo00000" + response.data.user)       
                setToken(response.data.token)
                setLoading(false)
            }
            catch(err){
                setToken(null)
                cookies.remove('token', {path : '/'})
                setLoading(false)
            }
        }
        if(token){
            checkUser()
        }
        else{
            setLoading(false)
        }
        
    }, [])

    return (
        <AuthContext.Provider value={{ token, setToken, isAuthenticated: !!token, loading }}>
        {children}
      </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext);
