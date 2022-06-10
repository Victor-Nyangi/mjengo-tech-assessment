import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import apiClient from "../../services/api";

const Posts: FC = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      apiClient.get("/api/posts").then((response) => {
        if (response.status === 200 && response.data.status === "success") {
          setPosts(response.data.posts);
        }
      });
    };
    getPosts();
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <div className="w-10/12 bg-white p-6 rounded-lg">
          <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
              <Link
                to={`/add/post/`}
                className="inline-block max-w-xs mx-auto  p-2 rounded mb-3 bg-green-600 text-sm leading-7 text-white hover:bg-green-900"
              >
                Add Post
              </Link>
              <div>
                <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                  The Dev Blog
                </p>
              </div>
              <p className="text-base text-gray-700 md:text-lg">
                Just a bunch of dummy blogs
              </p>
            </div>

            <div className="grid max-w-sm gap-5 mb-8 lg:grid-cols-3 sm:mx-auto lg:max-w-full">
              {posts.length > 0 ? (
                <>
                  {posts.map((post: any, index: number) => (
                    <div
                      key={index}
                      className="px-10 py-10 text-center border rounded lg:px-5 lg:py-10 xl:py-20"
                    >
                      <p className="mb-2 text-xs font-semibold tracking-wide text-gray-600 uppercase">
                        {moment(post?.created_at).format("YYYY-MM-DD")}
                      </p>
                      <Link
                        to={`/view/post/${post?.id}`}
                        className="inline-block max-w-xs mx-auto mb-3 text-2xl font-extrabold leading-7 transition-colors duration-200 hover:text-yellow-400"
                        aria-label="Read article"
                      >
                        {post?.title}{" "}
                      </Link>
                      <p className="max-w-xs mx-auto mb-2 text-gray-700">
                        {post?.excerpt}
                      </p>
                      <Link
                        to={`/view/writer/${post?.user.username}`}
                        aria-label=""
                        className="inline-flex items-center font-semibold transition-colors duration-200 text-green-400 hover:text-deep-purple-800"
                      >
                        By {post?.user.name}
                      </Link>
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
    </>
  );
};

export default Posts;
