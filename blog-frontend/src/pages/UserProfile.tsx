import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import apiClient from "../services/api";

const UserProfile: FC = () => {
  const [username, setUserName] = useState<any>("");
  const [profile, setProfile] = useState(Object);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("username")) {
      setUserName(localStorage.getItem("username"));
    }
  }, []);

  useEffect(() => {
    if (username) {
      const getProfile = async () => {
        apiClient.get(`/api/users/${username}/posts`).then((response: any) => {
          if (response.data.status === "success") {
            const { user, posts } = response.data;
            setProfile(user);
            setPosts(posts);
          }
        });
      };

      getProfile();
    }
  }, [username]);

  const deletePost = async (id: any) => {
    apiClient.delete(`/api/posts/${id}`).then((response: any) => {
      if (response.data.status === "success") {
         window.alert(response.data.message);

      }
    });
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="w-8/12">
          <div className="p-6">
            <h1 className="text-2xl font-medium mb-1">Username: {username}</h1>
            <h1 className="text-2xl font-medium mb-1">
              Full Name: {profile.name && profile.name}
            </h1>
            <h1 className="text-2xl font-medium mb-1">
              Email: {profile.email && profile.email}
            </h1>
            <h1 className="text-xl font-medium mb-1">
              Total Posts: {posts.length ? posts.length : 0}
            </h1>
            <Link
              to={`/add/post/`}
              className="inline-block max-w-xs mx-auto  p-2 rounded bg-green-600 text-sm leading-7 text-white hover:bg-green-900"
            >
              Add Post
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg">
            <div className="mb-4">
              <div className="grid max-w-sm gap-5 my-8 lg:grid-cols-3 sm:mx-auto lg:max-w-full">
                {posts.length > 0 ? (
                  <>
                    {posts.map((post: any, index: number) => (
                      <div
                        key={index}
                        className="px-10 py-5 text-center border rounded lg:px-5 lg:py-5 xl:py-6"
                      >
                        <p className="mb-2 text-xs font-semibold tracking-wide text-gray-600 uppercase">
                          {moment(post?.created_at).format("YYYY-MM-DD")}
                        </p>
                        <Link
                          to={`/view/post/${post?.id}`}
                          className="inline-block max-w-xs mx-auto mb-3 text-2xl font-extrabold leading-7 hover:text-yellow-400"
                          aria-label="Read article"
                        >
                          {post?.title}{" "}
                        </Link>
                        <p className="max-w-xs mx-auto mb-2 text-gray-700">
                          {post?.excerpt}
                        </p>

                        <div className="flex mx-4 mt-2">
                          <span>
                            <Link
                              to={`/edit/post/${post?.id}`}
                              className="inline-block max-w-xs mx-auto  p-2 rounded bg-green-600 text-sm leading-7 text-white hover:bg-green-900"
                            >
                              Edit
                            </Link>
                          </span>
                          <button onClick={(e) => deletePost(post.id)} className="inline-block max-w-xs mx-auto p-2 rounded bg-red-600 text-sm leading-7 duration-200 text-white hover:bg-red-900">
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <p>There are no posts</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
