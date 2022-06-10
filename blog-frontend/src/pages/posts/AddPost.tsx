import { FC, useState } from "react";
import apiClient from "../../services/api";

interface postType {
  title: string;
  excerpt: string;
  slug: string;
  body: string;
}

const AddPost: FC = () => {
  const [postData, setPostData] = useState<postType>({
    title: "",
    excerpt: "",
    slug: "",
    body: "",
  });
  const [message, setMessage] = useState("");

  // Add Post
  const handleSubmit = (e: any) => {
    e.preventDefault();

    apiClient.post("/api/posts", postData).then((response) => {
      if (response.status === 201 && response.data.status === "success") {
        setMessage(response.data.message);
        window.alert(message);
      }
    });

    setTimeout(() => {
      setPostData({
        title: "",
        excerpt: "",
        slug: "",
        body: "",
      });
    }, 2000);
  };
  const submitValue = (e: any) => {
    setPostData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="w-8/12 bg-white p-6 rounded-lg">
          {message && (
            <div className="w-full bg-green-600 text-center text-black">
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit} method="post" className="mb-4">
            <div className="mb-4">
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                value={postData.title}
                required
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
                required
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
                required
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
                required
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
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPost;
