import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
// import data from "../data";
const CreatePage = () => {
  const navigate = useNavigate();
  const clickHandler = () => {};

  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    name: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(newPost);
    navigate("/");
    const res = await axios.post(
      "http://localhost:4000/api/discussion",
      newPost
    );
  };

  return (
    <>
      <NavBar />
      <Wrapper>
        <form className="section-form" onSubmit={submitHandler}>
          <h1>Create a new discussion</h1>
          <div className="form-control">
            <label>Enter name: </label>
            <input
              type="text"
              placeholder="enter name"
              value={newPost.name}
              onChange={(e) => setNewPost({ ...newPost, name: e.target.value })}
            />
          </div>
          <div className="form-control">
            <label>Enter topic: </label>
            {/* <textarea id="w3review" name="w3review" rows="4" cols="50"></textarea> */}
            <input
              type="text"
              placeholder="enter topic"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
            />
          </div>
          <div className="form-control">
            <label>Enter description: </label>
            <textarea
              type="text"
              placeholder="enter description"
              rows="4"
              cols="50"
              value={newPost.description}
              onChange={(e) =>
                setNewPost({ ...newPost, description: e.target.value })
              }
            />
          </div>

          <button className="btn" type="submit">
            Create
          </button>
        </form>
      </Wrapper>
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

export default CreatePage;
