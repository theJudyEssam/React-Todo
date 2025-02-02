import Todo from "../Todo"


//this will be the main todo thingie
function Homepage(props) {
  return (
    <div className="homepage">

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

      <button className="logout">Logout</button>
      
    </div>
  );
}

export default Homepage;