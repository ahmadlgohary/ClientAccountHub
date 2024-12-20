import React from "react";
import { useState, useEffect } from "react";
import "./Dashboard.css";

export default function Dashboard({ email }) {
  //state variables
  const [user, setUser] = useState({}); // user data
  const [loading, setLoading] = useState(true); // loading state
  const [popularRewards, setPopularRewards] = useState([]); // rewards data

  //fetch rewards data from another groups API
  const fetchPopularRewards = async () => {
    //turns on the loading state
    setLoading(true);
    //fetches the rewards
    try {
      const response = await fetch("http://192.18.153.58:3000/api/analytics/popular-rewards");
      if (!response.ok) {
        throw new Error("Failed to fetch rewards");
      }
      const data = await response.json();
      setPopularRewards(data.data);
    } catch (err) {
      setTimeout(() => {
        setError(null);
      }, 1000);
    }
    setLoading(false);
  };

  // runs code when email changes
  useEffect(() => {
    // fetch user data
    const fetchUser = async () => {
      // sends a get request to the API
      const response = await fetch(
        `https://client-account-hub.onrender.com/get_user_by_email/${email}`,
        {
          method: "GET",
        }
      );

      // checks if the request was successful
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      // gets the data from the response
      const data = await response.json();
      // sets the user data
      setUser(data.user);
      // sets the loading state to false
      setLoading(false);
    };
    fetchUser(email);
    fetchPopularRewards();
    console.log(popularRewards);
  }, [email]);

  // if the loading state is true, return a loading message
  if (loading) return <p>Loading...</p>;

  //render transactions for large screen
  const renderTransactions = () => {
    // gets the transactions from the user
    const transactions = Object.entries(user.transaction_history || {});
    // checks if there are any transactions
    return transactions.length > 0 ? (
      // maps through the transactions
      transactions.map(([transactionId, transaction]) => (
        <tr key={transactionId}>
          <td>{transactionId}</td>
          <td>{transaction.transaction_type}</td>
          {/* formats the date to YYYY-MM-DD */}
          <td>{new Date(transaction.transaction_date).toISOString().split("T")[0]}</td>
          <td>{transaction.transaction_cost}</td>
          <td>{transaction.productName}</td>
          <td>{transaction.points_change}</td>
          <td>{transaction.description}</td>
        </tr>
      ))
    ) : (
      // if there are no transactions, return a message
      <tr>
        <td colSpan="6">No transactions found</td>
      </tr>
    );
  };

  //render transactions for small screen
  const renderTransactionsSmall = () => {
    const transactions = Object.entries(user.transaction_history || {});
    return transactions.length > 0 ? (
      transactions.map(([transactionId, transaction]) => (
        <div className="transactionGrid" key={transactionId}>
          <div className="transactionHeader">TransactionID</div>
          <div>{transactionId}</div>
          <div className="transactionHeader">Type</div>
          <div>{transaction.transaction_type}</div>
          <div className="transactionHeader">Date</div>
          <div>{new Date(transaction.transaction_date).toISOString().split("T")[0]}</div>
          <div className="transactionHeader">Cost</div>
          <div>{transaction.transaction_cost}</div>
          <div className="transactionHeader">Product Name</div>
          <div>{transaction.productName}</div>
          <div className="transactionHeader">Points Change</div>
          <div>{transaction.points_change}</div>
          <div className="transactionHeader">Description</div>
          <div>{transaction.description}</div>
        </div>
      ))
    ) : (
      <div>No transactions found</div>
    );
  };

  return (
    <>
      <h1>Account Dashboard</h1>
      <div className="dashboard">
        <div className="points">
          <h2>Point Balance</h2>
          <h3 className="pointBalance">{user.points_balance || 0}</h3>
        </div>
        <div className="transactionCard large">
          <h2>Transaction History</h2>
          <table>
            <thead className="tableHeader">
              <tr>
                <th>Transaction ID</th>
                <th>Type</th>
                <th>Date</th>
                <th>Cost</th>
                <th>Product Name</th>
                <th>Points Change</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>{renderTransactions()}</tbody>
          </table>
        </div>
        <div className="transactionCard small">
          <h2>Transaction History</h2>
          {renderTransactionsSmall()}
        </div>
        <div className="bottomCard">
          <div className="card activity">
            <h2>Activity Logs</h2>
            <ul className="activityList">
              {user.activity_log && user.activity_log.length > 0 ? (
                user.activity_log.map((activity, index) => (
                  <li key={index} className="activityItem">
                    <p>{activity.activity_type}</p>
                    <p>{activity.activity_field}</p>
                    <p>{new Date(activity.activity_date).toISOString().split("T")[0]}</p>
                  </li>
                ))
              ) : (
                <li>No activity logs found</li>
              )}
            </ul>
          </div>
        </div>
        <div className="card activity rewards">
          <h2>Popular Rewards</h2>
          <ul className="activityList rewardsList">
            {popularRewards && Object.keys(popularRewards).length > 0 ? (
              Object.entries(popularRewards)
                .sort((a, b) => b[1] - a[1]) // sort by count
                .map(([reward, count], index) => (
                  <li key={index} className="activityItem rewards">
                    <p>Reward: {reward}</p>
                    <p>Count: {count}</p>
                  </li>
                ))
            ) : (
              <li>No Popular Rewards found</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
