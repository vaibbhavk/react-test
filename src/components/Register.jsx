import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formState, setFormState] = useState({
    name: "",
    mobile: "",
    address: "",
    email: "",
    password: "",
    dob: "",
    aadhaar: null,
    photo: null,
  });

  const [errors, setErrors] = useState(null);

  const handleFileChange = (e) => {
    readFile(e.target.files[0], e.target.name);
  };

  const handleFormStateChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const reader = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.readAsDataURL(file);
    });
  };
  const readFile = (file, name) => {
    reader(file).then((result) => {
      setFormState({
        ...formState,
        [name]: result,
      });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formState);

    setLoading(true);

    axios
      .post("https://react-test-backend28.herokuapp.com/api/user", {
        name: formState.name,
        mobile: formState.mobile,
        address: formState.address,
        email: formState.email,
        password: formState.password,
        dob: formState.dob,
        aadhaar: formState.aadhaar,
        photo: formState.photo,
      })
      .then((res) => {
        setLoading(false);
        alert(res.data.message);
        navigate("/login");
      })
      .catch((err) => {
        setLoading(false);
        alert("Registration failed!");
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div className="container">
      <h3>Register</h3>
      <form onSubmit={handleSubmit} className="row g-1">
        <label>Name</label>
        <input
          required
          type="text"
          name="name"
          value={formState.name}
          onChange={handleFormStateChange}
        />
        <br />
        <label>Mobile</label>
        <input
          required
          type="text"
          name="mobile"
          value={formState.mobile}
          onChange={handleFormStateChange}
        />
        <br />

        <label>Address</label>
        <input
          required
          type="text"
          name="address"
          value={formState.address}
          onChange={handleFormStateChange}
        />
        <br />

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

        <label>Date of Birth</label>
        <input
          required
          type="date"
          name="dob"
          value={formState.dob}
          onChange={handleFormStateChange}
        />
        <br />

        <label>Aadhaar (.png, .jpeg, .jpg)</label>
        <input
          required
          onChange={handleFileChange}
          name="aadhaar"
          type="file"
          accept="image/jpg, image/jpeg, image/png"
        />
        <br />

        <label>Profile Picture (.png, .jpeg, .jpg)</label>
        <input
          required
          onChange={handleFileChange}
          name="photo"
          type="file"
          accept="image/jpg, image/jpeg, image/png"
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
      <Link to="/login">Login</Link>

      <br />
      <br />
      <ul>
        {errors &&
          errors.map((error, index) => <li key={index}>{error.msg}</li>)}
      </ul>
    </div>
  );
};

export default Register;
