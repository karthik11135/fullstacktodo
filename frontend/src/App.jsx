import { Signup, Login } from "./Form";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./Navbar";
import { useEffect, useState } from "react";
import { createContext } from "react";
import Home from "./Home";
import axios from 'axios'

export const UserContext = createContext({});

function App() {
  const [islogged, setIslogged] = useState(false);
  const [appUser, setAppUser] = useState("");

  useEffect(() => {
    if(localStorage.getItem('token') === null ) {
      setIslogged(false)
      setAppUser("")
      return;
    }
    setIslogged(true)
    async function dummy() {
      const response = await axios.get("http://localhost:3000/username", {
        headers: {
          'Access-Control-Allow-Credentials': '*', 
          token: localStorage.getItem('token')
        }
      })
      setAppUser(response.data.username)
    }
    dummy()
    
  }, [])

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ islogged, setIslogged, appUser, setAppUser }}
      >
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
