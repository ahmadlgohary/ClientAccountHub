import { useState, useEffect } from "react";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ newEmail: "", newRole: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("http://localhost:4545/get_user_by_email/user1@example.com", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => (data.user ? setUser(data.user) : setError("User not found")))
      .catch((err) => setError("Failed to fetch user data"))
      .finally(() => setLoading(false));
  }, [user]);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateEmail = (e) => {
    e.preventDefault();
    //do something
  };

  const updateRole = (e) => {
    e.preventDefault();
    //do something
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="profile">
        <h1>Profile</h1>
        <div className="container">
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
        <div className="form-container">
          <h2>Update Information</h2>
          <div className="form-group">
            <label htmlFor="newEmail">New Email:</label>
            <input
              type="email"
              id="newEmail"
              name="newEmail"
              placeholder="Enter new email"
              value={form.newEmail}
              onChange={handleInput}
            />
            <button onClick={updateEmail}>Update Email</button>
          </div>
          <div className="form-group">
            <label htmlFor="newRole">New Role:</label>
            <select
              id="newRole"
              name="newRole"
              value={form.newRole}
              onChange={handleInput}
              className="select-role"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
              <option value="primary_user">Primary User</option>
              <option value="secondary_user">Secondary User</option>
            </select>
            <button onClick={updateRole}>Update Role</button>
          </div>
        </div>
        {msg && <p className="message">{msg}</p>}
      </div>
    </>
  );
}
