import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import { useGlobalContext } from "../context";
import { Link, useNavigate, useParams } from "react-router-dom";

export const ReplyPage = () => {
  const { isLogin, gusername } = useGlobalContext();
  const { id } = useParams();
  const [singleDiscussion, setSingleDiscussion] = useState({});
  const [loading, setLoading] = useState(true);
  const [newReply, setNewReply] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("before sending...");
    console.log(newReply, gusername);
    if (newReply) {
      const res = await axios.post(
        `http://localhost:4000/api/discussion/${id}`,
        {
          reply: newReply,
          replier: gusername,
        }
      );
      navigate(`/reply/${id}`);
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:4000/api/discussion/${id}`).then((res) => {
      setSingleDiscussion(res.data.post);
      setLoading(false);
      setNewReply(newReply);
    });
  }, []);
  return (
    <>
      <NavBar />
      {loading ? (
        <></>
      ) : (
        <Wrapper>
          <div className="container">
            {/* <h1>Discussion Forum</h1> */}
            <h1>
              <span> Discussion topic:</span> {singleDiscussion.title}
            </h1>
            <h3>
              <span>Author:</span> {singleDiscussion.name}
            </h3>
            <p className="description">Description:</p>

            <p>{singleDiscussion.description}</p>
            <p className="description">Replies:</p>
            {singleDiscussion.replies.length === 0 ? (
              <>
                <p>no replies for this discussion</p>
              </>
            ) : (
              <>
                <div className="list-container">
                  {singleDiscussion.replies.map((item, index) => {
                    return (
                      <section className="single-item-reply">
                        <p className="replier">{item.replier}</p>
                        <p className="reply">{item.reply}</p>
                      </section>
                    );
                  })}
                </div>
              </>
            )}

            {!isLogin ? (
              <div className="list-container">
                <h3 className="bottom-heading">
                  please{" "}
                  <a href="/login" className="color">
                    login
                  </a>{" "}
                  to reply
                </h3>
              </div>
            ) : (
              <section>
                <form onSubmit={submitHandler} className="form-control">
                  <label className="reply-label">send a reply:</label>
                  <textarea
                    type="text"
                    placeholder="enter message"
                    rows="4"
                    cols="50"
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                  />
                  <button className="reply-btn">send</button>
                </form>
              </section>
            )}
          </div>
        </Wrapper>
      )}
    </>
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

  .replier {
    font-weight: 700;
    font-size: medium;
  }

  .single-item-reply {
    background: #c9ffe6;
    border: black solid;
    padding: 0.5rem;
    margin-bottom: 1rem;
  }

  .reply-label {
    font-size: 1.1rem;
    font-weight: 400;
  }
  .reply {
    font-weight: 400;
    font-size: medium;
  }
  .reply-btn {
    padding: 0.5rem 1.5rem;
    font: 2rem;
    text-transform: capitalize;
    width: 15%;
    background-color: var(--primaryColor);
    color: white;
    font-weight: 400;
  }

  .form-control {
    display: flex;
    flex-direction: column;
  }
  .container h1 {
    margin-top: 0rem;
    margin-bottom: 2rem;
  }

  span {
    color: var(--primaryColor);
    text-decoration: underline;
  }

  p {
    font-size: 1.4rem;
  }
  .color {
    color: var(--primaryColor);
    text-decoration: underline;
  }
  .description {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--primaryColor);
    text-decoration: underline;
  }
  .btn {
    margin-right: auto;
    margin-left: auto;
    width: 100%;
  }
`;
// export default ReplyPage;
