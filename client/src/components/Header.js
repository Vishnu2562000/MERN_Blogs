import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch(`${process.env.API_URL}/api/profile`, {
      credentials: "include",
    }).then((res) => {
      res.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]);

  const logoutHandler = () => {
    fetch(`${process.env.API_URL}/api/logout`, {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  };

  return (
    <header>
      <Link to="/" className="logo">
        MernBlogs
      </Link>
      <nav>
        {userInfo && (
          <>
            <Link to="/create">Create new post</Link>
            <Link to="/" onClick={logoutHandler}>
              Logout ({userInfo.username})
            </Link>
          </>
        )}
        {!userInfo && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
