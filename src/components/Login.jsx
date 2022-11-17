import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

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

    axios
      .post("https://react-test-backend28.herokuapp.com/api/auth", {
        email: formState.email,
        password: formState.password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/profile");
      })
      .catch((err) => {
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div className="container">
      <h3>Login</h3>
      <form onSubmit={handleSubmit} className="row g-1">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={handleFormStateChange}
        />
        <br />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formState.password}
          onChange={handleFormStateChange}
        />
        <br />
        <input type="submit" />
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
