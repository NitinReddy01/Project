import { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../Api/axios";
import { useAuth } from "../Hooks/useAuth";

interface User {
  email: string;
  password: string;
}
const defaultUser: User = {
  email: "",
  password: "",
};

const Login = (): ReactElement => {
  const [user, setUser] = useState<User>(defaultUser);
  const [showPass, setShowPass] = useState<boolean>(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from: string = location.state?.from?.pathname || "/";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    toast.promise(axios.post("/auth/login", user), {
      loading: "Processing...",
      success: (response) => {
        setAuth({
          username: response.data.username,
          accessToken: response.data.accessToken,
        });
        navigate(from, { replace: true });
        return "";
      },
      error: (err) => {
        if (!err?.response) {
          return "No response from the server";
        } else if (err.response?.status === 400) {
          return err.response.message;
        } else if (err.response?.status === 401) {
          return "Check your email or password";
        } else {
          return "login Failed";
        }
      },
    });
  };

  return (
    <>
      <div>
        <Toaster
          position="top-center"
          toastOptions={{
            error: {
              duration: 2500,
            },
            success: {
              duration: 2500,
            },
          }}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-3/4 h-96 sm:w-1/2 lg:w-1/3  m-auto my-40 border border-black rounded-large overflow-hidden flex-column space shadow-xl">
          <div className="h-20 w-full flex justify-center items-center bg-green text-white font-serif text-2xl">
            Sign in
          </div>
          <div className="text-center mt-8">
            <input
              className="border border-black rounded-sm outline-green font-serif"
              type="email"
              name="email"
              value={user.email}
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="text-center mt-4">
            <div style={{ position: "relative", display: "inline-block" }}>
              <input
                className="border border-black rounded-sm outline-green font-serif"
                type={showPass ? "text" : "password"}
                name="password"
                value={user.password}
                placeholder="Password"
                onChange={handleChange}
                required
              />
              <i
                className={showPass ? "fa fa-eye-slash" : "fa fa-eye"}
                aria-hidden="true"
                onClick={() => {
                  setShowPass(!showPass);
                }}
                style={{
                  position: "absolute",
                  right: "0px",
                  top: "20%",
                  transform: "translate(-50%)",
                  cursor: "pointer",
                }}
              ></i>
            </div>
          </div>
          <div className=" text-center mt-5">
            not a member?
            <Link to={"/register"} className="text-green">
              Sign Up now
            </Link>
          </div>
          <div className="text-center mt-3 mb-6 ">
            <button
              className="bg-green w-24 h-12 rounded-sm text-white"
              type="submit"
            >
              Sign in
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
