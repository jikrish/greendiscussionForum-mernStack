import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import { useGlobalContext } from "../context";
const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLogin, isLogin, setGUsername } = useGlobalContext();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(`username is ${username} `);
    const res = await axios.post("http://localhost:4000/api/register", {
      username,
      password,
    });
    setGUsername(username);
    console.log(res);
    if (res.data.message === "success") {
      console.log(res.data.message, isLogin);

      navigate("/");
      setIsLogin(true);
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
    <div>
      <NavBar />
      <Wrapper>
        <form className="section-form" onSubmit={submitHandler}>
          <h1>Registeration Page</h1>
          <div className="form-control">
            <label>New Username</label>
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
            Register
          </button>
          <p>
            already have an account?{" "}
            <Link to="/login" className="linkToPage">
              {" "}
              login
            </Link>
          </p>
        </form>
      </Wrapper>
    </div>
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
export default RegisterPage;
