import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Todo from "../Todo";
import { useAuth } from "../context/authContext";

function Homepage(props) {

  const [todos, setTodo] = useState([]);
  const [input, setInput] = useState("");
  const { token, setToken, isAuthenticated , user} = useAuth();

  const handleLogout = () => {
    setToken(null);
    document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.reload();
  };

  const handleInputChange = (e) =>{
    setInput(e.target.value);
    console.log(e.target.value)
  }


  const handleAdd = (e) =>{
    e.preventDefault();
  
      const addTodo = async () => {
        try{
          const response = await axios.post(`http://localhost:3000/add`, {todo: input, username:user}, { withCredentials: true });
          console.log(response.data) 
          setInput(""); // Clear the input field
          handleGet();    
        }
        catch(err){
          console.log(err)
        }
      }
       addTodo()
  
  
    console.log("added")

  }

  const handleGet = (e) =>{
    const getTodos = async () => {
      try{
        const response = await axios.get(`http://localhost:3000/get/${user}`,{}, { withCredentials: true });
        console.log(response.data[0].todo_text)     
        setTodo(response.data)
      }
      catch(err){
        console.log(err)
      }
    }
    getTodos()

  }


const handleDelete = (e) =>{

    const deleteTodo = async () => {
      try{
        const response = await axios.delete(`http://localhost:3000/delete/`, { withCredentials: true });
        console.log(response.data)     
      }
      catch(err){
        console.log(err)
      }
    }
    deleteTodo()



  }



const handleUpdate = (e) =>{  
 
  const updateTodo = async () => {
    try{
      const response = await axios.put(`http://localhost:3000/update/`, { withCredentials: true });
      console.log(response.data)     
    }
    catch(err){
      console.log(err)
    }
  }
  updateTodo()

}

useEffect(() => {
  handleGet();
}, [user]); 


  return (
    <div className="homepage">
      {isAuthenticated ? (
        <>
          <h1 className="homepage-title">Welcome back to TodoBrownie ya {user}</h1>

          <form className="todo-add">
            <input type="text" placeholder="Add a new task"   value={input} onChange={handleInputChange} />
            <button onClick={handleAdd} type='submit'>Add</button>
          </form>
          <div className="todo-list">
           
            {todos.map((todo) => (
                    <Todo task={todo} />
                ))}
          </div>

          <button className="logout" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Oops! You have not logged in yet.</p>
      )}
    </div>
  );
}

export default Homepage;