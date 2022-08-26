import "./navbar.css";
import {Link} from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext ";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color:"black" , textDecoration:"none"}}>
          <span className="logo">lamabooking</span>
        </Link>
        {user ? <span className="text-dark">{user.username}</span> :<div className="navItems">
          <button className="navButton text-dark">Register</button>
          <button className="navButton text-dark">Login</button>
        </div>}
      </div>
    </div>
  );
};

export default Navbar;
