import { Route, Routes } from "react-router-dom";
import './App.css';
import Login from "./Components/Login";
import Register from "./Components/Register";
import RequireAuth from "./Components/RequireAuth";
import Home from "./Components/Home";



function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route element={<RequireAuth/>} >
        <Route path='/' element={<Home/>} />
      </Route>
    </Routes>
  );
}

export default App;
