
import Button from "./Button"
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { IoIosCheckboxOutline } from "react-icons/io";



function Todo(props){

    const todo_logic = (e) =>{
            console.log("heeeeelllll")

    }

    return (
        <div className="todo"> 
            <div className="todo-info">
                <IoIosCheckboxOutline onClick={todo_logic} style={{ fontSize: '24px' }}/>
                <h2>{props.task}</h2>
               
            </div>
            <div className="todo-actions">
                <button>
                <MdEdit style={{ fontSize: '24px' }}/>
                </button>
                <button>
                <MdDeleteForever style={{ fontSize: '24px' }}/>
                </button>
             </div>
        </div>
        )
}

export default Todo