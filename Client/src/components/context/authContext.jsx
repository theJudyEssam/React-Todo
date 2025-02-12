import { createContext, useState, useEffect, useContext} from "react"
import axios from "axios"
import Cookies from "universal-cookie"


const AuthContext = createContext();
const cookies = new Cookies();


export const AuthProvider = ({children}) => {


    const [token, setToken] = useState(() => cookies.get('token'));
    const [user, setUser] = useState(null)
    const [loading,setLoading] = useState(true);


    useEffect(()=>{
        const checkUser = async () => {
            try{
                console.log("yo")
                const response = await axios.get("http://localhost:3000/verify", { withCredentials: true });
                console.log("bloo00000" + response.data.user)     
                console.log(response.data.token)  
                setToken(response.data.token)
                setUser(response.data.user)
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


        const interval = setInterval(() => {
            console.log("checking...")
            if (token) {
                checkUser();
            }
        }, 120*1000); // Check every 5 seconds

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [token]);


    return (
        <AuthContext.Provider value={{ token, setToken, isAuthenticated: !!token, loading, user }}>
        {children}
      </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext);
