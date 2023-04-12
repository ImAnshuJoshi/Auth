import React, { useEffect, useState } from "react";
import swal from "sweetalert2";
import styles from "./Auth.module.css";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [logIn, setLogIn] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleToggle = async () => {
    setLogIn(!logIn);
  };
  const navigate = useNavigate();
  /**This is handle log in form with alert and error messages **/
  const handleLogIn = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      console.log(email, password);
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + `api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const { status, message, user } = await response.json();
      console.log(status, message);
      if (status === "success") {
        localStorage.setItem(`user_${user._id}` , user._id);
        navigate(`/user/${user._id}`);
        swal.fire({
          position: "top-end",
          icon: "success",
          text: message,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        swal.fire({
          position: "middle",
          icon: "error",
          title: "Please try again!",
          text: message.errorMessage,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.log(err);
      const { status, message } = err.response.data;
      swal.fire({
        position: "middle",
        icon: "error",
        title: "Please try again!",
        text: message.errorMessage,
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**This is handle log in form with alert and error messages **/
  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log(email, password);
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + `api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );
      const { status, message, user } = await response.json();
      console.log(status, message);
      if (status === "success") {
        localStorage.setItem(`user_${user._id}` , user._id);
        navigate(`/user/${user._id}`);
        swal.fire({
          position: "top-end",
          icon: "success",
          text: message,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        swal.fire({
          position: "center",
          icon: "error",
          title: "Please try again!",
          text: message.errorMessage,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.log(err);
      const { status, message } = err.response.data;
      swal.fire({
        position: "middle",
        icon: "error",
        title: "Please try again!",
        text: message.errorMessage,
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.registrationForm}>
      <div className={styles.parentForm}>
        <h1>{logIn ? "Log In" : "Sign Up"}</h1>
        <form
          className={styles.form}
          onSubmit={logIn ? handleLogIn : handleSignUp}
        >
          {!logIn && (
            <>
              <label htmlFor="name">Name</label>
              <input
                type=""
                name="name"
                id="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </>
          )}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
              console.log(email);
            }}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
              console.log(password);
            }}
          />
          <button type="submit">
            {" "}
            {isLoading ? "Loading..." : logIn ? "Log In" : "Sign Up"}
          </button>
          <div className={styles.message} onClick={handleToggle}>
            {logIn ? (
              <div>Don't have an account ?</div>
            ) : (
              <div>Already have an account?</div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Auth;
