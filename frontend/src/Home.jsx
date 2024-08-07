import { useContext, useEffect, useState } from "react";
import { UserContext } from "./App";
import axios from "axios";

const Home = () => {
  const { islogged } = useContext(UserContext);
  console.log(islogged);
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    async function dummy() {
      if (!islogged) return;
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/todos", {
        headers: {
          "Access-Control-Allow-Credentials": "*",
          token: token,
        },
      });
      console.log(response.data.todos);
      setTodos(response.data.todos);
    }
    dummy();
  }, [islogged]);

  if (!islogged) return <div>Log in to see your todos</div>;
  return (
    <>
      {todos.map((t, ind) => {
        return <p key={ind}>{(t === null) ? 'null':t.title} - {(t === null) ? 'null':t.description}</p>;
      })}
    </>
  );
};

export default Home;
