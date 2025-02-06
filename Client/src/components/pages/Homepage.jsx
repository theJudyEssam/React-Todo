import Todo from "../Todo"
import { useAuth } from "../context/authContext";


//this will be the main todo thingie
function Homepage(props) {

  const {user, isAuthenticated} = useAuth();

  return (
    <div className="homepage">
        {isAuthenticated ? 


        <>        
      <h1 className="homepage-title">Welcome back {props.name} to TodoBrownie</h1>

      <div className="todo-add">
        <input type="text" placeholder="Add a new task"/>
        <button>Add</button>
      </div>
      <div className="todo-list">
        <Todo task="Feed the cat"/>
        <Todo task="Clean the dishes"/>
        <Todo task="Finish this react project"/>
        <Todo task="Attend the Formula 1 meeting"/>
      </div>

      <button className="logout">Logout</button></>

        
        
      : <p>Oops! You have not logged in yet, {isAuthenticated}</p>}


      
    </div>
  );
}

export default Homepage;