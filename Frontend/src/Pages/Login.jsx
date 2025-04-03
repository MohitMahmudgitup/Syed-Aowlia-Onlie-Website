import React, { useContext, useEffect, useState } from "react";
import Titel from "../Components/Titel";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [signUpsignIn, setSignUpsignIn] = useState(false);

  const { token, setToken, backend, navigate, darkmode } =
    useContext(ShopContext);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const signUpData = { username, email, password };

    try {
      const url = signUpsignIn
        ? `${backend}/api/user/register`
        : `${backend}/api/user/login`;

      // Make an Axios POST request to your backend signup/login endpoint
      const response = await axios.post(url, signUpData);

      if (response.data.success) {
        toast.success(response.data.message); // Show success toast
        const token = response.data.token;

        setToken(token); // Set the token in your context or state
        localStorage.setItem("token", token);
        setIsSubmitted(true); // Simulate a successful sign-up/login
      } else {
        toast.error(response.data.message); // Show error toast for failed request
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again."); // Show error toast for exceptions
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="flex justify-center items-center h-screen -mt-16 ">
      {isSubmitted || token ? (
        <div className="text-center p-8 ">
          <h2 className="text-3xl font-bold mb-4 text-green-500">
            Account Created Successfully!
          </h2>
          {/* <p className="text-gray-700 mb-6">Welcome, {username}! Your account has been created.</p> */}
          <div className="flex items-center justify-center">
            <img
              className="w-40"
              src="https://m.media-amazon.com/images/I/715vwvP5ZEL._h1_.png"
              alt=""
            />
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md  p-8 ">
          <div className="flex justify-center">
            {signUpsignIn ? (
              <Titel
                text2={`Sign Up`}
                color2={"text-3xl font-bold text-center mb-6 prata-regular"}
              />
            ) : (
              <Titel
                text2={`Login`}
                color2={"text-3xl font-bold text-center mb-6 prata-regular"}
              />
            )}
          </div>
          <form onSubmit={handleSignUp}>
            {signUpsignIn && (
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="User Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                required
              />
            </div>
            <div className="mb-4 ">
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                required
              />
            </div>
            <div className="flex justify-between items-center mb-4">
              <p
                className={`cursor-pointer text-sm ${
                  darkmode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Forgot your password?
              </p>

              {signUpsignIn ? (
                <p
                  onClick={() => setSignUpsignIn(false)}
                  className={`cursor-pointer text-sm ${
                    darkmode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Login Here
                </p>
              ) : (
                <p
                  onClick={() => setSignUpsignIn(true)}
                  className={`cursor-pointer text-sm ${
                    darkmode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Create account
                </p>
              )}
            </div>
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md transition duration-300 
                ${
                  darkmode
                    ? "bg-white text-black hover:bg-gray-300"
                    : "bg-black text-white hover:bg-gray-600"
                }`}
            >
              {signUpsignIn ? "Create Account" : "Login Now"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default SignUp;
