import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./App";

export const Navbar = () => {
  const { islogged, appUser, setIslogged, setAppUser } = useContext(UserContext);
    const logoutHandler = () => {
        setIslogged(false)
        setAppUser("")
        localStorage.removeItem('token')
    }
  return (
    <nav
      style={{
        display: "flex",
      }}
    >
      {!islogged && <Link to='/'>Todos APP++</Link>}
      {islogged && <Link to='/'>Hello {appUser}</Link>}
      <div
        style={{
          marginLeft: "auto",
          justifyContent: "center",
        }}
      >
        {!islogged && (
          <Link
            to={"/signup"}
            style={{
              color: "lightpink",
              margin: "5px",
            }}
          >
            Signup
          </Link>
        )}
        {!islogged && (
           <Link
           style={{
             color: "lightpink",
             margin: "5px",
           }}
           to={"/login"}
         >
           Login
         </Link>
        )}
      {islogged &&  <button
          style={{
            color: "lightpink",
            margin: "5px",
          }}
          onClick={logoutHandler}
        >
          Logout
        </button>}
      </div>
    </nav>
  );
};
