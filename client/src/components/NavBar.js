import React from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
const NavBar = ({}) => {
  const { isLogin, setIsLogin, gusername } = useGlobalContext();
  return (
    <nav>
      <div className="nav-center">
        <Link to="/">
          <h3>Discussions Forum</h3>
        </Link>
        {/* {isLogin && (
          <Link to="/login">
            <button className="btn-nav">login</button>
          </Link>
        )} */}
        {isLogin ? (
          <section className="nav-left">
            <p className="welcome-msg">welcome {gusername}!</p>
            <button className="btn-nav" onClick={() => setIsLogin(false)}>
              logout
            </button>
          </section>
        ) : (
          <Link to="/login">
            <button className="btn-nav">login</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
