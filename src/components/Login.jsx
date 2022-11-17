import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState(null);

  const handleFormStateChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formState);

    setLoading(true);

    axios
      .post("http://localhost:5000/api/auth", {
        email: formState.email,
        password: formState.password,
      })
      .then((res) => {
        setLoading(false);
        localStorage.setItem("token", res.data.token);
        navigate("/profile");
      })
      .catch((err) => {
        setLoading(false);
        alert("Login failed!");
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div className="container">
      <h3>Login</h3>
      <form onSubmit={handleSubmit} className="row g-1">
        <label>Email</label>
        <input
          required
          type="email"
          name="email"
          value={formState.email}
          onChange={handleFormStateChange}
        />
        <br />

        <label>Password</label>
        <input
          required
          type="password"
          name="password"
          value={formState.password}
          onChange={handleFormStateChange}
        />
        <br />

        {loading ? (
          <div className="spinner-border text-primary"></div>
        ) : (
          <>
            <input type="submit" />
          </>
        )}
      </form>

      <br />

      <label>Or</label>
      <Link to="/">Register</Link>

      <br />
      <br />
      <ul>
        {errors &&
          errors.map((error, index) => <li key={index}>{error.msg}</li>)}
      </ul>
    </div>
  );
};

export default Login;
