// this will be a custom react hook

import {useState, useEffect} from "react";
import axios from "axios"

const Auth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          // Make the request with the username as part of the query or payload
          const response = await axios.get(
            `http://localhost:3000/verify`,
            { withCredentials: true }
          );
          setUser(response.data.user);
        } catch (error) {
          setUser(null);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUser();
    }, []); // Depend on `username`, so it re-fetches when the username changes
  
    return { user, isAuthenticated: !!user, loading };
  };
  
  export default useAuth;