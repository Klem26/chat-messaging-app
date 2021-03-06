import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import signinImage from "../../assets/signup.jpg";
import styles from "./Auth.module.css";

const cookies = new Cookies();

const initialState = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  avatarURL: "",
};

const Auth = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password, phoneNumber, avatarURL } = form;
    const URL = "http://localhost:8080/auth";
    // const URL = "https://medical-chat-messaging.herokuapp.com/auth";
    const {
      data: { token, userId, hashedPassword, fullName },
    } = await axios.post(`${URL}/${isSignup ? "signup" : "login"}`, {
      fullName: form.fullName,
      username,
      password,
      phoneNumber,
      avatarURL,
    });

    cookies.set("token", token);
    cookies.set("fullName", fullName);
    cookies.set("username", username);
    cookies.set("userId", userId);

    if (isSignup) {
      cookies.set("phoneNumber", phoneNumber);
      cookies.set(" avatarURL", avatarURL);
      cookies.set("hashedPassword ", hashedPassword);
    }
    window.location.reload();
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <p className={styles.text}>{isSignup ? "Sign Up" : "Sign In"}</p>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className={styles.formInput}>
                <label className={styles.label} htmlFor="fullName">
                  Full Name
                </label>
                <input
                  className={styles.input}
                  name="fullName"
                  type="text"
                  placeholder="fullName"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className={styles.formInput}>
              <label className={styles.label} htmlFor="Username">
                Username
              </label>
              <input
                className={styles.input}
                name="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </div>

            {isSignup && (
              <div className={styles.formInput}>
                <label className={styles.label} htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input
                  className={styles.input}
                  name="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignup && (
              <div className={styles.formInput}>
                <label className={styles.label} htmlFor="avatarURL">
                  Avatar URL
                </label>
                <input
                  className={styles.input}
                  name="avatarURL"
                  type="text"
                  placeholder="Avatar URL"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className={styles.formInput}>
              <label className={styles.label} htmlFor="Password">
                Password
              </label>
              <input
                className={styles.input}
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
            {isSignup && (
              <div className={styles.formInput}>
                <label className={styles.label} htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  className={styles.input}
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className={styles.accountBtn}>
              <button className={styles.btn}>
                {isSignup ? "Sign Up" : " Sign In"}
              </button>
            </div>
          </form>

          <div className={styles.account}>
            <p className={styles.question}>
              {isSignup
                ? "Already have an account? "
                : " Don't have an account?"}
              <span className={styles.span} onClick={switchMode}>
                {isSignup ? "Sign In" : " Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.containerImage}>
        <img className={styles.image} src={signinImage} alt="sign in" />
      </div>
    </div>
  );
};

export default Auth;
