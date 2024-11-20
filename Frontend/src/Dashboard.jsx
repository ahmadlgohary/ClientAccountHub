import React from "react";
import "./Dashboard.css"
import Navbar from "./Navbar";

export default function Dashboard({ }) {
    return (
        <>
            <Navbar />  
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
                    </table>
                </div>
                <div className="bottomCard">
                    <div className="card">
                        <h2>Point Balance</h2>
                        <h3 className="pointBalance">000</h3>
                    </div>
                    <div className="card">
                        <h2>Activity Logs</h2>
                        <ul>
                            <li>log</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
} 