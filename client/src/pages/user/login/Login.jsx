import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext ";
import { Link } from "react-router-dom";
import "./login.css";

function Login() {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  return (
    <div className="login">
      <div className="lContainer">
        <h2 className="rTitle">login</h2>
        <input
          type="text"
          placeholder="username"
          name="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        <hr className="rLine" />
        <Link to="/signup">
        {" "}
        <p
          className="rLinkTo"
        >
         Rgister a new Account ? SIGNUP{" "}
        </p>
      </Link>
        {error && <span className="fError">{error.message}</span>}
      </div>
    </div>
  );
}

export default Login;
