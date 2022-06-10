import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import apiClient from '../../services/api';
import { Link } from "react-router-dom";
const ViewWriter: FC = () => {
  let params = useParams();
  const [username]= useState(params.username);
  const [posts, setPosts] = useState([]);

  const [writer, setWriter] = useState(Object);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    () => {
      if(username) {

        const getProfile = async () => {
          apiClient.get(`/api/users/${username}/posts`).then((response: any) => {
            if(response.data.status === "success"){
              const {user, posts} = response.data;
              setWriter(user)
              setPosts(posts)
            }
            setIsLoading(false)
          })
        }

        getProfile();
      }
    },
    [username]
    );

  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Writer's Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Personal details and application.
            </p>
          </div>
          <div className="px-10">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {writer.name && writer.name}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">User Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {writer.username && writer.username}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {writer.email && writer.email}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Joined On</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {writer.created_at &&
                    moment(writer?.created_at).format("YYYY-MM-DD")}
                </dd>
              </div>
            </dl>
          </div>
          <div className="bg-white p-6 rounded-lg">
          <div className="mb-4">
            <div className="grid max-w-sm gap-5 my-8 lg:grid-cols-3 sm:mx-auto lg:max-w-full">
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
      )}
    </>
  );
};

export default ViewWriter;
