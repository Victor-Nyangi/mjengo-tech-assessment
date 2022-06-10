import { FC, useState } from "react";
import apiClient from "../../services/api";

interface authType {
  email: string;
  password: string;
}

const Login: FC = () => {
  const [authData, setAuthData] = useState<authType>({
    email: "",
    password: "",
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();

    apiClient.get("/sanctum/csrf-cookie").then((response) => {
      apiClient.post("/api/login", authData).then((response) => {
        if (response.status === 201 && response.data.status === "success") {
          // login();
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
      setAuthData({ email: "", password: "" });
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
            LOGIN
          </div>
          <form onSubmit={handleSubmit} method="post">
            <div className="mb-4">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={authData.email}
                onChange={submitValue}
                id="email"
                placeholder="Your email"
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
                value={authData.password}
                onChange={submitValue}
                placeholder="Your password"
                id="password"
                className="border-2 w-full p-4 rounded-lg border-gray-500"
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-3 rounded font-medium w-full"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
