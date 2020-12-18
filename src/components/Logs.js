import React, { useEffect, useState } from "react";
import { getReminder } from "../apis/api";
import "../styles/logs.css";

export const Logs = ({ logsRefresh }) => {
  const [logs, setLogs] = useState([]);
  const [refersh, setRefresh] = useState(true);

  useEffect(() => {
    getReminder((data) => {
      setLogs(data?.reminders);
    });
  }, [refersh, logsRefresh]);

  const getDate = (date) => {
    let res = new Date(date);
    return `${res.getHours()}:${res.getMinutes()} ${res.getDate()}-${res.getMonth()}-${res.getFullYear()}`;
  };

  return (
    <div id="logs-container">
      <div className="title">
        <span>Logs</span>
        <button onClick={() => setRefresh(!refersh)}>Refresh</button>
      </div>
      <div id="logs">
        {logs.map((log, index) => (
          <span key={index} className="log">
            [{getDate(log.createdAt)}] - Requested <b>{log.to}</b> API for
            <b> {log.email}</b>
          </span>
        ))}
      </div>
    </div>
  );
};
