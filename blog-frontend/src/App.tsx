import { FC, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AddPost from "./pages/posts/AddPost";
import EditPost from "./pages/posts/EditPost";
import Posts from "./pages/posts/Posts";
import ViewPost from "./pages/posts/ViewPost";
import UserProfile from "./pages/UserProfile";
import ViewWriter from "./pages/writers/ViewWriter";
import Writers from "./pages/writers/Writers";

const App: FC = (props: any) => {
  const [isUserLogged, setUserLoggedIn] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);

  const { isLoggedIn } = props;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUserLoggedIn(true);
      localStorage.getItem("role_id") === "1" && setisAdmin(true);
    } else {
      setUserLoggedIn(false);
    }
  }, [isLoggedIn]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {isUserLogged === false && !localStorage.getItem("token") ? (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </>
        ) : (
          <>
            {isAdmin && <Route path="/writers" element={<Writers />} />}
            <Route path="/posts" element={<Posts />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/view/writer/:username" element={<ViewWriter />} />
            <Route path="/view/post/:id" element={<ViewPost />} />
            <Route path="/edit/post/:id" element={<EditPost />} />
            <Route path="/add/post" element={<AddPost />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
