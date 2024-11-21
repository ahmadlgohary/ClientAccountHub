import React from "react";
import { useState, useEffect } from "react";
import "./Dashboard.css";

export default function Dashboard({ email }) {
  const [user, setUser] = useState({});

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
    };

    fetchUser(email);
  }, [email]);

  return (
    <>
      <h1>Account Dashboard</h1>
      <div className="dashboard">
        <div className="transactionCard">
          <h2>Transaction History</h2>
          <table>
            <thead>
              <div className="tableHeader">
                <tr>
                  <th>Transaction ID</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Cost</th>
                  <th>Points Change</th>
                  <th>Description</th>
                </tr>
              </div>
            </thead>
            <tbody></tbody>
          </table>
        </div>
        <div className="bottomCard">
          <div className="card">
            <h2>Point Balance</h2>
            <h3 className="pointBalance">{user.points_balance || 0}</h3>
          </div>
          <div className="card">
            <h2>Activity Logs</h2>
            <ul>
              <li>{user.activity_logs}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
