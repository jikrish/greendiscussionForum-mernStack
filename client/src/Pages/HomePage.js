import React, { useEffect, useState, useHistory } from "react";
import axios from "axios";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import { useGlobalContext } from "../context";
import { Link, useNavigate } from "react-router-dom";

// import data from "../data";
const HomePage = () => {
  const [discussionList, setDiscussionList] = useState([]);
  // const { posts } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const { isLogin } = useGlobalContext();
  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:4000/api/discussion").then((res) => {
      setDiscussionList(res.data.posts);
      setLoading(false);
    });
  }, []);
  console.log(discussionList);
  const link = isLogin ? "/create" : "/login";

  return (
    <div>
      <NavBar />
      {loading ? (
        <p>loading...</p>
      ) : (
        <Wrapper>
          <div className="container">
            {/* <h1>Discussion Forum</h1> */}
            <Link to={link}>
              <button className="btn">Create new Discussion</button>
            </Link>
            <div className="list-container">
              {discussionList.map((item, index) => {
                return (
                  <section>
                    <Item item={item} key={index} />;
                  </section>
                );
              })}
            </div>
          </div>
        </Wrapper>
      )}
    </div>
  );
};
const Wrapper = styled.section`
  min-height: 100%;
  width: 90vw;
  max-width: var(--max-width);
  margin: auto;
  background: var(--clr-white);
  border-radius: var(--radius);
  padding: 3rem;

  .container h1 {
    margin-top: 0rem;
    margin-bottom: 2rem;
  }

  .btn {
    margin-right: auto;
    margin-left: auto;
    width: 50%;
  }
`;

const Item = ({ item }) => {
  const navigate = useNavigate();
  return (
    <section className="single-item">
      <p>
        title: <span>{item.title}</span>
      </p>
      <p>
        author: <span>{item.name}</span>
      </p>
      <p>
        Description: <span>{item.description}</span>
      </p>
      <button
        className="btn-discussion"
        onClick={() => navigate(`/reply/${item._id}`)}
      >
        Open Discussion
      </button>
    </section>
  );
};

export default HomePage;
