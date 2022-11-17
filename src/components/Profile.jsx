import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let config = {
      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("token"),
      },
    };
    axios
      .get("https://react-test-backend28.herokuapp.com/api/user", config)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container">
      <h3>Profile</h3>
      <br />
      {profile && (
        <div>
          <p>Name: {profile.name}</p>
          <p>Mobile: {profile.mobile}</p>
          <p>Address: {profile.address}</p>
          <p>Email: {profile.email}</p>
          <p>Aadhaar:</p>
          <img src={profile.aadhaar} />
          <p>Profile Picture: </p>
          <img src={profile.photo} />
          <br />
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
