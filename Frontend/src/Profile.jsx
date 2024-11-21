import { useState, useEffect } from "react";
import "./Profile.css";

export default function Profile({ email, setEmail }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ newEmail: "", newRole: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        `https://client-account-hub.onrender.com/get_user_by_email/${email}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setUser(data.user);
      setLoading(false);
    };

    fetchUser(email);
  }, [email, user.role]);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://client-account-hub.onrender.com/change_email", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          new_email: form.newEmail,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update email");
      }

      const data = await response.json();
      setMsg("Email updated successfully");
      setEmail(form.newEmail);
    } catch (err) {
      setError("Failed to update email");
    }
    setLoading(false);
    setForm({ newEmail: "", newRole: "" });
    setMsg("");
  };

  const updateRole = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://client-account-hub.onrender.com/change_role", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          role: form.newRole,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update role");
      }

      const data = await response.json();
      setMsg("Role updated successfully");
      setUser((prevUser) => ({ ...prevUser, role: form.newRole }));
    } catch (err) {
      setError("Failed to update role");
    }
    setLoading(false);
    setForm({ newEmail: "", newRole: "" });
    setMsg("");
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
