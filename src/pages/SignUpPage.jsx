import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import logo from "../img/logo.png";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signUp } = UserAuth();

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
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
            <h1 className="text-3xl font-bold">Sign Up Now!</h1>
            {error ? (
              <p className="p-3 bg-red-400 rounded my-3">{error}</p>
            ) : null}
            <form
              className="w-full flex flex-col py-8"
              onSubmit={handleSignUpSubmit}
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
                Sign Up
              </button>
              <div className="text-zinc-400 text-sm">
                <p className="mb-6">
                  <input type="checkbox" />
                  Remember Me
                </p>
                <p>
                  Already have an account?{" "}
                  <Link className="hover:underline text-white" to={"/login"}>
                    Sign In
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

export default SignUpPage;
