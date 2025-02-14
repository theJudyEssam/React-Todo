
import Button from "./Button"
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { IoIosCheckboxOutline } from "react-icons/io";
import axios from 'axios';
import { useState } from 'react';



function Todo(props){

    const [isEditing, setisEditing] = useState(false);
    const [isEditingInput, setisEditingInput] = useState(props.task ? props.task.todo_text : ""); // have initial val
    const [isCompleted, setisCompleted] = useState(false);
    
    const todo_logic = (e) =>{
        setisCompleted(!isCompleted);

    }


  
    
    const handleDelete = (e) =>{
        
        const deleteTodo = async () => {
          try{
           // console.log(`Deleting the todo with the id ${props.task.id}`)
            const response = await axios.delete(`http://localhost:3000/delete/${props.task.id}`, { withCredentials: true });
            //console.log(response.data) 
            window.location.reload();
               
          }
          catch(err){
            console.log(err)
          }
        }
        deleteTodo()
    
      }
    
    const changeInput = (e) =>{
    setisEditing(!isEditing)
    }
    
    
    const handleisEditing = (e) =>{  
      const isEditingTodo = async () => {

        try{
       // console.log(`Updating the todo with the id ${props.task.id}`)
        const response = await axios.put(`http://localhost:3000/update/${props.task.id}`,{todo: isEditingInput} , { withCredentials: true });
       // console.log(response.data)     
        window.location.reload();

        }
        catch(err){
          console.log(err)
        }
      }
      isEditingTodo()
    
    }

    return (
        <div className="todo"> 
            <div className="todo-info">
            <IoIosCheckboxOutline onClick={todo_logic} style={{ fontSize: '24px' }}/>
            {isEditing ? <input type="text" onChange={(e) => setisEditingInput(e.target.value)} value={isEditingInput} placeholder={props.text? props.text.todo_text : ""} /> :
            <p style={isCompleted ? {textDecoration: "line-through"} : {textDecoration: "none"}} onClick={changeInput}>{props.task ? props.task.todo_text : ""}</p>}
           
            </div>
            <form className="todo-actions">
            <button type="button" onClick={handleisEditing}>
            <MdEdit style={{ fontSize: '24px' }}/>
            </button>
            <button type="button" onClick={handleDelete}>
            <MdDeleteForever style={{ fontSize: '24px' }}/>
            </button>
            </form>
        </div>
        )
}

export default Todo