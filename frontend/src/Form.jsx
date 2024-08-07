import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "./App";

export const Signup = () => {
  const { setIslogged, setAppUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:3000/signup",
      {
        username,
        password,
      },
      {
        headers: {
          "Access-Control-Allow-Credentials": "*",
        },
      }
    );
    console.log(response.data);
    localStorage.setItem("token", response.data.token);
    setIslogged(true);
    setAppUser(username);
  };

  return (
    <form onSubmit={submitHandler}>
      <h2 className="underline">Signup Form</h2>
      <label>Enter your username</label>
      <input
        onChange={(e) => setUsername(e.currentTarget.value)}
        type="text"
      ></input>
      <label>Enter your password</label>
      <input
        onChange={(e) => setPassword(e.currentTarget.value)}
        type="password"
      ></input>
      <button>Submit</button>
    </form>
  );
};

export const Login = () => {
  const { setIslogged, setAppUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:3000/login",
      {
        username,
        password,
      },
      {
        headers: {
          "Access-Control-Allow-Credentials": "*",
        },
      }
    );
    console.log(response);
    localStorage.setItem("token", response.data.token);
    setIslogged(true);
    setAppUser(username);
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Login Form</h2>
      <label>Enter your username</label>
      <input
        onChange={(e) => setUsername(e.currentTarget.value)}
        type="text"
      ></input>
      <label>Enter your password</label>
      <input
        onChange={(e) => setPassword(e.currentTarget.value)}
        type="password"
      ></input>
      <button>Submit</button>
    </form>
  );
};
