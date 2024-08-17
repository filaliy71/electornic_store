import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/AuthSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, pass } = e.target;
    const info = {
      username: username.value,
      pass: pass.value,
    };
    dispatch(login(info));
    navigate("/card");
  };
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6 mt-14">
      {alert("login : Bret, password : Bret")}
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold">Sign In</h1>
        <p className="text-sm">Sign in to access your account</p>
      </div>
      <form onSubmit={handleSubmit} className="form-group">
        <div className="form-field">
          <label htmlFor="username" className="form-label">
            Username
          </label>

          <input
            placeholder="Type here"
            type="text"
            className="input max-w-full"
            name="username"
            id="username"
          />
          <label className="form-label">
            <span className="form-label-alt">
              Please enter a valid username.
            </span>
          </label>
        </div>
        <div className="form-field">
          <label htmlFor="pass" className="form-label">
            Password
          </label>
          <div className="form-control">
            <input
              placeholder="Type here"
              type="password"
              className="input max-w-full"
              name="pass"
              id="pass"
            />
          </div>
        </div>
        <div className="form-field">
          <div className="form-control justify-between">
            <div className="flex gap-2">
              <input id="show" type="checkbox" className="checkbox" />
              <label htmlFor="show">Show Password</label>
            </div>
            <label className="form-label">
              <a className="link link-underline-hover link-primary text-sm">
                Forgot your password?
              </a>
            </label>
          </div>
        </div>
        <div className="form-field pt-5">
          <div className="form-control justify-between">
            <button type="submit" className="btn btn-primary w-full">
              Sign in
            </button>
          </div>
        </div>

        <div className="form-field">
          <div className="form-control justify-center">
            <Link
              to="/inscription"
              className="link link-underline-hover link-primary text-sm"
            >
              Don't have an account yet? Sign up.
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
