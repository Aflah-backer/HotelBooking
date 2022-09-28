import "./navbar.css";
import {Link} from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext ";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const logout = (e) => {
    dispatch ({type: "LOGOUT"})
  }
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color:"black" , textDecoration:"none"}}>
          <span className="logo">Hotel Booking</span>
        </Link>
        {user ? <span className="rUserName">hello..{user.username}
        <button onClick={logout} className="nButton" >logout</button>
        </span>
          
        :<div className="navItems">
          <Link to="/signup">
            <button className="navButton text-dark">Register</button>
          </Link>
          <Link to="/login">
          <button className="navButton text-dark">Login</button>
          </Link>
        </div>}
      </div>
    </div>
  );
};

export default Navbar;
