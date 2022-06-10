import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../services/api";

interface PostType {
  title: string;
  excerpt: string;
  slug: string;
  body: string;
}

const EditPost: FC = () => {
  const [postData, setPostData] = useState<PostType>({
    title: "",
    excerpt: "",
    slug: "",
    body: "",
  });

  let params = useParams();
  const id = params.id;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPost = async () => {
      apiClient.get(`/api/posts/${id}`).then((response) => {
        if (response.status === 200 && response.data.status === "success") {
          setPostData(response.data.post);
        }
        setIsLoading(false);
      });
    };

    getPost();
  }, [id]);

  // Edit Post
  const handleSubmit = (e: any) => {
    e.preventDefault();

    apiClient.post(`/api/posts/update/${id}`, postData).then((response) => {
      if (response.status === 201 && response.data.status === "success") {
        window.alert(response.data.message);
      }
    });
  };
  const submitValue = (e: any) => {
    setPostData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div className="flex justify-center">
          <div className="w-8/12 bg-white p-6 rounded-lg">
            <form onSubmit={handleSubmit} method="post" className="mb-4">
              <div className="mb-4">
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Title"
                  value={postData.title}
                  onChange={submitValue}
                  className="border-2 w-full p-4 rounded-lg border-gray-500"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="slug"
                  id="slug"
                  placeholder="Slug"
                  value={postData.slug}
                  onChange={submitValue}
                  className="border-2 w-full p-4 rounded-lg border-gray-500"
                />
              </div>

              <div className="mb-4">
                <textarea
                  name="excerpt"
                  id="excerpt"
                  value={postData.excerpt}
                  onChange={submitValue}
                  cols={30}
                  rows={4}
                  className="bg-gray-100 border-2 w-full p-4 rounded-lg border-gray-500"
                  placeholder="Add a short description"
                />
              </div>
              <div className="mb-4">
                <textarea
                  name="body"
                  id="body"
                  value={postData.body}
                  onChange={submitValue}
                  cols={30}
                  rows={4}
                  className="bg-gray-100 border-2 w-full p-4 rounded-lg border-gray-500"
                  placeholder="Post something!"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded font-medium"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditPost;
