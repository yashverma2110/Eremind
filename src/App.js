import { useEffect, useState } from "react";
import { Logs } from "./components/Logs";
import { UserForm } from "./components/UserForm";

function App() {
  const [msg, setMsg] = useState(null);
  const [logsRefresh, setLogsRefresh] = useState(false);

  useEffect(() => {
    if (msg) setTimeout(() => setMsg(null), 2000);
  }, [msg]);

  return (
    <div className="App">
      <header>E-Remind</header>
      <div id="content">
        <UserForm
          setMsg={setMsg}
          logsRefresh={logsRefresh}
          setLogsRefresh={setLogsRefresh}
        />
        <Logs logsRefresh={logsRefresh} />
        <div
          id="notif"
          style={{
            background: Boolean(msg) ? msg.background : "#fff",
            transform: `translateY(${Boolean(msg) ? "30px" : "-50px"})`,
          }}
        >
          <span>{msg?.msg}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
