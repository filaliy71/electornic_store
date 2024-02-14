import React from "react";
import { useDispatch } from "react-redux";
import { insc } from "../store/AuthSlice";
import { Link } from "react-router-dom";

function Inscription() {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, pass } = e.target;
    const info = {
      username: username.value,
      pass: pass.value,
    };
    dispatch(insc(info));
  };
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6 mt-14">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold">Sign up</h1>
        <p className="text-sm">Create your account</p>
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
              to="/login"
              className="link link-underline-hover link-primary text-sm"
            >
              I have already an account? Sign in.
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Inscription;
