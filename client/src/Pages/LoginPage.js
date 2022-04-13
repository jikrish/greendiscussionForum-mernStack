import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useGlobalContext } from "../context";
const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const { setIsLogin, setGUsername } = useGlobalContext();
  const submitHandler = async (e) => {
    e.preventDefault();
    //userReducer
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:4000/api/login", {
        username,
        password,
      });
      console.log(username, password);
      if (res.data.message === "success") {
        navigate("/");
        setGUsername(username);
        setIsLogin(true);
        setLoading(false);
      } else console.log("wrong credentials!");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    //   <div className="container">
    //     <img src={loginImg} alt="github user" />
    //     <h1>github user</h1>
    //     <button className="btn" onClick={loginWithRedirect}>
    //       login / sign up
    //     </button>
    //   </div>
    <>
      <NavBar />
      {loading ? (
        <></>
      ) : (
        <Wrapper>
          <form className="section-form" onSubmit={submitHandler}>
            <h1>Login Page</h1>
            <div className="form-control">
              <label>Username</label>
              <input
                type="text"
                placeholder="enter name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label>Password</label>
              <input
                type="password"
                placeholder="enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="btn" type="submit">
              Login
            </button>
            <p>
              New User?{" "}
              <Link to="/register" className="linkToPage">
                {" "}
                register user here
              </Link>
            </p>
          </form>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.section`
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 90vw;
  max-width: var(--max-width);
  margin: 4rem auto;
  background: var(--clr-white);
  border-radius: var(--radius);
  padding: 3rem;

  .section-form {
    margin: 0 auto;
  }
  .section-form h1 {
    margin-bottom: 2rem;
  }

  .linkToPage {
    color: var(--primaryColor);
    text-weight: bold;
  }

  .form-control {
    margin-bottom: 2rem;
  }
  .form-control label {
    display: block;
    text-transform: capitalize;
    font-weight: 500;
    color: var(--clr-grey-3);
    margin-bottom: 0.5rem;
  }
  .form-control input {
    background: white;
    font-size: 1rem;
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  .error {
    color: var(--clr-red-dark);
    text-transform: capitalize;
  }
`;

export default LoginPage;
