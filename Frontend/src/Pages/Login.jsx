import React, { useContext, useEffect, useState } from "react";
import Titel from "../Components/Titel";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="flex justify-center items-center right-0 top-0 absolute loginbg z-50 w-[100vw] h-[100vh]">
      <NavLink to={"/"} className={"absolute top-10 sm:left-16  left-4" } >
                  <img width={120} src={assets.logo01} alt="" />
      </NavLink>
      {isSubmitted || token ? (
        <div className="text-center p-8 ">
          <h2 className="text-3xl font-bold mb-4 text-green-500">
            Account Created Successfully!
          </h2>
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
          <div className="flex  ">
            {signUpsignIn ? (
              <div className=" font-semibold mb-5 text-2xl sm:text-4xl">
              <p className=" text-blue-500">
              Sign Up
              </p>
            </div>
            ) : (
              <div className=" font-semibold mb-5 text-2xl sm:text-4xl">
              <p className=" text-blue-500">
                Login
              </p>
            </div>
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
                  className={`w-full px-4 py-2 border rounded-md outline-none  text-black`}
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
                className={`w-full px-4 py-2 border rounded-md outline-none  text-black`}
                required
              />
            </div>
            <div className="mb-4 relative">
              <input
                type={`${showPassword ? "text" : "password"}`}
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4  py-2 border rounded-md outline-none    text-black`}
                required
                
              />
              {
                showPassword ? (<div><FaEyeSlash  onClick={() => setShowPassword(false)} className={`absolute top-[15px] right-4 ${darkmode && "text-black"}`}/></div> ):( <div><FaRegEye onClick={() => setShowPassword(true)}className={`absolute top-[15px] right-4 ${darkmode && "text-black"}`}/></div>)

              }
              {signUpsignIn && (<p className={`text-xs mt-1 ${darkmode ? "text-red-600" : "text-red-600"}`}>
                    Password must be at least 6 characters, include one uppercase letter and one number and make sure strong password.
              </p>)}
              
            </div>
            <div className="flex justify-between items-center mb-4">
              <Link to={"/login/forgot-password"}
                className={`cursor-pointer text-sm 
                  text-gray-300
                }`}
              >
                Forgot your password?
              </Link>

              {signUpsignIn ? (
                <p
                  onClick={() => setSignUpsignIn(false)}
                  className={`cursor-pointer text-sm  text-blue-400`}
                >
                  Login Here
                </p>
              ) : (
                <p
                  onClick={() => setSignUpsignIn(true)}
                  className={`cursor-pointer text-sm text-blue-400
                  }`}
                >
                  Create account
                </p>
              )}
            </div>
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md text-white transition-all duration-300  bgbtn hbgbtn`}
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
