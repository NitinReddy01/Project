import { ChangeEvent, FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "../Api/axios";

interface User {
  username: string;
  email: string;
  password: string;
}
const defaultUser: User = {
  username: "",
  email: "",
  password: "",
};
const Register = () => {
  const [user, setUser] = useState<User>(defaultUser);
  const [showPass, setShowPass] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validatePass = (pass: string): boolean => {
    if (pass.length < 8) {
      toast.error("Password must contain atleast 8 characters ");
      return false;
    }
    const hasUpper: RegExp = /[A-Z]/;
    const hasLower: RegExp = /[a-z]/;
    const hasDigit: RegExp = /\d/;
    const hasSpecial: RegExp = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/;
    if (!hasUpper.test(pass)) {
      toast.error("Password must contain atleast 1 uppercase character");
      return false;
    } else if (!hasLower.test(pass)) {
      toast.error("Password must contain atleast 1 lowercase character");
      return false;
    } else if (!hasDigit.test(pass)) {
      toast.error("Password must contain atleast 1 number");
      return false;
    } else if (!hasSpecial.test(pass)) {
      toast.error("Password must contain atleast 1 special character");
      return false;
    }
    return true;
  };

  const register = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (!user.username || !user.email || !user.password) {
      toast.error("Please provide all the fields");
    } else {
      if (!validatePass(user.password)) return;
      toast.promise(axios.post("/auth/register", user), {
        loading: "Processing...",
        success: (response) => {
          navigate("/login", { replace: true });
          return response.data.message;
        },
        error: (err) => {
          if (!err?.response) {
            return "No response from the server";
          } else if (err.response?.status === 409) {
            return err.response.data.message;
          } else {
            return "Registration Failed";
          }
        },
      });
    }
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
      <form onSubmit={register}>
        <div className="w-3/4 h-96 sm:w-1/2 lg:w-1/3  m-auto my-40 border border-black rounded-large overflow-hidden flex-column space shadow-xl">
          <div className="h-20 w-full flex justify-center items-center bg-green text-white font-serif text-2xl">
            Sign Up
          </div>
          <div className="text-center mt-8">
            <input
              className="border border-black rounded-sm outline-green font-serif"
              value={user.username}
              name="username"
              onChange={handleChange}
              type="text"
              placeholder="username"
              required
            />
          </div>
          <div className="text-center mt-4">
            <input
              className="border border-black rounded-sm outline-green font-serif"
              value={user.email}
              name="email"
              onChange={handleChange}
              type="email"
              placeholder="email"
              required
            />
          </div>
          <div className="text-center mt-4">
            <div style={{ position: "relative", display: "inline-block" }}>
              <input
                className="border border-black rounded-sm outline-green font-serif"
                value={user.password}
                name="password"
                onChange={handleChange}
                type={showPass ? "text" : "password"}
                placeholder="password"
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
            <br />
            <span>*must contain one upper,lower,digit,special character</span>
          </div>
          <div className="text-center mt-5">
            already a member?
            <Link className="text-green" to="/login">
              signin
            </Link>
            <br></br>
          </div>
          <div className="text-center mt-3 mb-6">
            <button
              className="bg-green w-24 h-12 rounded-sm text-white"
              type="submit"
            >
              SIGN UP
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;
