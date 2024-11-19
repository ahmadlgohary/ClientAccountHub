import React from "react";
import "./Dashboard.css"

export default function Dashboard({ }) {
    return (
        <>
            <h1>Account Dashboard</h1>
            <div className="dashboard">
                <div className="card">
                    <h2>Point Balance</h2>
                </div>
                <div className="card">
                    <h2>Transaction History</h2>
                </div>
                <div className="card">
                    <h2>Activity Logs</h2>
                </div>
            </div>
        </>
    )
} 