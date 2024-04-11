import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/logo.png";

import { UserAuth } from "../context/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = UserAuth();
  const navigate = useNavigate();

  const handleLogInSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await logIn(email, password);

      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const logInWithTestAccount = async () => {
    try {
      // Use credentials for the test account
      await logIn("test@example.com", "testpassword");

      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="w-full flex justify-center py-10">
        <Link to={"/"}>
          <img
            src={logo}
            alt="myflix logo"
            className="w-56 object-cover cursor-pointer"
          />
        </Link>
      </div>
      <div className="fixed w-full px-4 py-20">
        <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white rounded-md">
          <div className="max-w-[350px] mx-auto py-16">
            <h1 className="text-3xl font-bold">Log In to your Account</h1>
            {error ? (
              <p className="p-3 bg-red-400 rounded my-3">{error}</p>
            ) : null}
            <form
              className="w-full flex flex-col py-8"
              onSubmit={handleLogInSubmit}
            >
              <input
                className="p-3 my-3 bg-zinc-600 rounded"
                type="email"
                placeholder="Email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="p-3 my-6 bg-zinc-600 rounded"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="bg-red-600 py-3 my-6 rounded font-bold">
                Log In
              </button>
              <button
                className="bg-red-600 text-white py-3 mb-6 rounded font-bold"
                onClick={logInWithTestAccount}
              >
                Log In with Test Account
              </button>
              <div className="text-zinc-400 text-sm">
                <p className="mb-6">
                  <input type="checkbox" />
                  Remember Me
                </p>
                <p>
                  Don&apos;t have an account yet?{" "}
                  <Link className="hover:underline text-white" to={"/signup"}>
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
