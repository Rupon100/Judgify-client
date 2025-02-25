import Lottie from "react-lottie-player";
import { Link, useNavigate } from "react-router-dom";
import login from "../assets/Lottie/signin.json";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const { user, signIn, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSigninUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const pass = form.pass.value;

    signIn(email, pass)
      .then((result) => {
        const { data } = axios.post(
          `${import.meta.env.VITE_API_URL}/jwt`,
          { email: result.user.email },
          {
            withCredentials: true,
          }
        );

        navigate("/");
        toast.success("Logged in successfull!");
      })
      .catch((error) => {
        toast.error(`${error.message}`);
      });
  };

  const handleGoogle = () => {
    signInWithGoogle().then((restlt) => {
      const { data } = axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        { email: restlt.user.email },
        {
          withCredentials: true,
        }
      );

      toast.success("Logged in successfull!");
      navigate("/");
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center max-w-5xl mx-auto p-10">
      <div className="flex flex-col-reverse md:flex-row justify-between items-center w-full h-full p-1 gap-4">
        <div className="w-full">
          <div className="max-w-lg shadow-md dark:bg-gray-800 dark:text-white card  w-full shrink-0">
            <form onSubmit={handleSigninUser} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text dark:text-white">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text dark:text-white">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="pass"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-gray-800 text-white hover:bg-gray-700">
                  Log in
                </button>
                <div className="divider">OR</div>
                <button
                  onClick={handleGoogle}
                  type="button"
                  className="btn bg-gray-800 text-white hover:bg-gray-700"
                >
                  Google
                </button>
              </div>
              <div></div>
            </form>
            <small className="ml-8">
              New in this Application?
              <Link className="btn btn-link" to="/signin">
                Sign up
              </Link>
            </small>
          </div>
        </div>
        <div className="hidden md:block" >
          <Lottie loop animationData={login} play />
        </div>
      </div>
    </div>
  );
};

export default Login;
