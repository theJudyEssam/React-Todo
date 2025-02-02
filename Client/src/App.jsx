
import './App.css'
import Login from './components/pages/Login'
import Homepage from './components/pages/Homepage'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {


  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login islogin={true}/>} />
      <Route path="/register" element={<Login islogin={false}/>} />
      <Route path="/home" element={<Homepage />} />
    </Routes>
    </Router>
  )
}

export default App
