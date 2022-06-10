import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import apiClient from "../../services/api";

const ViewPost: FC = () => {
  let params = useParams();
  const [id]= useState(params.id);

  const [post, setPost] = useState(Object);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPost = async () => {
      apiClient.get(`/api/posts/${id}`).then((response) => {
        if (response.status === 200 && response.data.status === "success") {
          setPost(response.data.post);
        }
        setIsLoading(false);
      });
    };

    getPost();
  }, [id]);

    // Like Post
    const likePost = () => {
      apiClient.post(`/api/posts/${id}/likes`).then((response) => {
        if (response.status === 201 && response.data.status === "success") {
          window.alert(response.data.message);
        }
      });
    };
    

  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
            <div>
              <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-black uppercase rounded-full bg-teal-accent-400">
              {post.title && post.title}
              </p>
            </div>
            <Link
                        to={`/view/writer/${post?.user.username}`}
                        aria-label=""
                        className="inline-flex items-center font-semibold transition-colors duration-200 text-green-400 hover:text-deep-purple-800"
                      >
                        By {post?.user.name}
                      </Link>

              <button onClick={likePost} className={`post.likesbg-green-600 text-white p-2 rounded hover:bg-green-900 mb-4 ml-4`}>Like Post</button>
          </div>

          <p className="mb-2 text-xs font-semibold tracking-wide text-blue-600 uppercase">
                Written on: {moment(post?.created_at).format("YYYY-MM-DD")}
              </p>

              <p className="mx-auto mb-2 text-black">
                {post?.body}
              </p>
        </div>
      )}
    </>
  );
};

export default ViewPost;
