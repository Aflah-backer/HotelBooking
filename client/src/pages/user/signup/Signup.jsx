import axios from "axios";
import React, {
  useContext,
  useLayoutEffect,
  useReducer,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext ";

function Signup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nameChange = (e) => {
    setUserName(e.target.value);
  };
  const emailChange = (e) => {
    setEmail(e.target.value);
  };
  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const INITIAL_STATE = {
    user: null,
    loading: false,
    error: null,
  };
  const SignupReducer = (state, action) => {
    switch (action.type) {
      case "SIGNUP_START":
        return {
          user: null,
          loading: true,
          error: null,
        };
      case "SIGNUP_SUCCESS":
        return {
          user: action.payload,
          loading: false,
          error: null,
        };
      case "SIGNUP_FAILURE":
        return {
          user: null,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, signupDispatch] = useReducer(SignupReducer, INITIAL_STATE);

  const { loading, dispatch, error } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleClick = async (e) => {
    
    signupDispatch({ type: "SIGNUP_START" });
    try {
      const res = await axios.post("/auth/register", {
        username: username,
        email: email,
        password: password,
      });
      signupDispatch({ type: "SIGNUP_SUCCESS", payload: res.data });
    } catch (err) {
      signupDispatch({ type: "SIGNUP_FAILURE", payload: err.response.data });
    }
  };

  useLayoutEffect(() => {
    if (state.user) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: state.user,
      });
      navigate("/");
    }
  }, [state.user]);

  return (
    <div className="signup">
      <div className="lContainer">
        <h2 className="rTitle">Create an account</h2>
        <div className="form-outline mb-4">
          <input
            type="text"
            id="form3Example1cg"
            className="lInput"
            placeholder="User name"
            onChange={nameChange}
          />
        </div>

        <div className="form-outline mb-4">
          <input
            type="email"
            id="form3Example3cg"
            placeholder="Your Email"
            className="lInput"
            onChange={emailChange}
          />
        </div>

        <div className="form-outline mb-4">
          <input
            type="password"
            id="form3Example4cg"
            placeholder="Password"
            className="lInput"
            onChange={passwordChange}
          />
        </div>

        <div className="d-flex justify-content-center">
          <button
            disabled={loading}
            onClick={handleClick}
            type="button"
            className="lButton"
          >
            Register
          </button>
        </div>
        <hr className="rLine"/>
        <Link to="/login">
          {" "}
          <p
            className="rLinkTo"
            style={{ textDecoration: "none" }}
          >
            Have already an account?{" "}
          </p>
        </Link>
        {error && <span className="fError">{error.message}</span>}
      </div>
    </div>
  );
}

export default Signup;
