import { FC, useState } from "react";
import apiClient from "../../services/api";

interface authType {
  name: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const Register: FC = () => {
  const [authData, setAuthData] = useState<authType>({
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    apiClient.get("/sanctum/csrf-cookie").then((response) => {
      apiClient.post("/api/register", authData).then((response) => {
        if (response.status === 201 && response.data.status === "success") {
          console.log(response, "res");
          if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            if (response.data.user.name && response.data.user.username) {
              localStorage.setItem("name", response.data.user.name);
              localStorage.setItem("role_id", response.data.user.role_id);
              localStorage.setItem("email", response.data.user.email);
              localStorage.setItem("username", response.data.user.username);
            }
            localStorage.setItem("isLoggedIn", "true");
            window.location.pathname = "/profile";
          }
        }
      });
    });

    setTimeout(() => {
      setAuthData({
        name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
      });
    }, 2000);
  };

  const submitValue = (e: any) => {
    setAuthData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {" "}
      <div className="flex justify-center">
        <div className="w-4/12 bg-white p-6 rounded-lg">
          <div className="bg-green-500 p-4 rounded-lg mb-6 text-white text-center">
            REGISTER
          </div>
          <form onSubmit={handleSubmit} method="post">
            <div className="mb-4">
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your name"
                value={authData.name}
                onChange={submitValue}
                className="border-2 w-full p-4 rounded-lg border-gray-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={authData.username}
                onChange={submitValue}
                className="border-2 w-full p-4 rounded-lg border-gray-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Your email"
                value={authData.email}
                onChange={submitValue}
                className="border-2 w-full p-4 rounded-lg border-gray-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Choose a password"
                value={authData.password}
                onChange={submitValue}
                className="border-2 w-full p-4 rounded-lg border-gray-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password_confirmation" className="sr-only">
                Password again
              </label>
              <input
                type="password"
                name="password_confirmation"
                id="password_confirmation"
                value={authData.password_confirmation}
                onChange={submitValue}
                placeholder="Repeat your password"
                className="border-2 w-full p-4 rounded-lg border-gray-500"
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-3 rounded font-medium w-full"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
