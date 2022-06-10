import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiClient from "../services/api";

const Header: FC = () => {
  const [isUserLogged, setUserLoggedIn] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);

  const logout = () => {
    apiClient.post("/api/logout").then((response) => {
      if (response.status === 204) {
        setUserLoggedIn(false);
        setTimeout(() => {
          localStorage.clear();
          window.location.pathname = "/";
        }, 1000);
      }
    });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUserLoggedIn(true);
      localStorage.getItem("role_id") === "1" && setisAdmin(true);
    } else {
      setUserLoggedIn(false);
    }
  }, []);

  return (
    <>
      <nav className="p-6 bg-white flex justify-between mb-6">
        <ul className="flex items-center">
          <li>
            <Link to="/" className="p-3">
              Home
            </Link>
          </li>
          <li>
            <Link to="/posts" className="p-3">
              Posts
            </Link>
          </li>
          {isAdmin && (
            <li>
              <Link to="/writers" className="p-3">
                Dashboard
              </Link>
            </li>
          )}
        </ul>
        <ul className="flex items-center">
          {isUserLogged ? (
            <>
              <li>
                <Link to="/profile" className="p-3">
                  My Profile
                </Link>
              </li>
              <li>
                <button type="submit" onClick={logout} className="p-3 inline">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="p-3">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="p-3">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Header;
