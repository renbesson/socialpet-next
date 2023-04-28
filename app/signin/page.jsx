"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../utils/authProvider";

export default function SignIn() {
  const { user, fetchUser } = useAuth();

  ////////////////////////////////////////////////////////////////////////////////
  // Function for signing in
  ////////////////////////////////////////////////////////////////////////////////
  const handleSignin = async (event) => {
    event.preventDefault();

    try {
      const form = new FormData(event.currentTarget);

      const res = await fetch("/api/auth/signin/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          password: form.get("password"),
        }),
      });
      const { token, message } = await res.json();

      if (res.status === 404) return toast("Wrong Email!");
      if (res.status === 401) return toast("Wrong Password!");
      if (!res.ok) return toast(`Message: ${message} | Code: ${res.status}`);
      if (res.status === 200) {
        // Saves user state

        fetchUser();
        toast(`Welcome back, ${user.name}!`);

        // Sends the user back to original page they were
        navigate(origin, { replace: true });
      }
    } catch (err) {
      console.error(err);
      toast(err.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className="bg-no-repeat bg-cover bg-center relative"
        style={{
          backgroundImage: "url(/images/signin.jpeg)",
        }}
      >
        <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
          <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
            <div className="self-start hidden lg:flex flex-col  text-white">
              <img src="" className="mb-3" />
              <h1 className="mb-3 font-bold text-5xl">Welcome Back!</h1>
            </div>
          </div>
          <div className="flex justify-center self-center  z-10">
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title font-semibold text-2xl text-gray-800">Sign In</h2>
                <form className="form-control w-full max-w-xs gap-2" onSubmit={handleSignin}>
                  <div>
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="Type you email"
                      className="input input-bordered w-full max-w-xs"
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      minLength="8"
                      placeholder="Type you password"
                      className="input input-bordered w-full max-w-xs"
                    />
                  </div>

                  <div className="text-sm">
                    <a href="#" className="text-green-400 hover:text-green-500">
                      Forgot your password?
                    </a>
                  </div>

                  <div>
                    <button type="submit" className="btn btn-primary w-full">
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
