import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login-signup/Login";
import Landing from "./components/landing/Landing";
import Wallet from "./components/wallet/Wallet";
import Dashboard from "./components/Dashboard/Dashboard";
import Reminders from "./components/Reminders/Reminders";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reminders" element={<Reminders />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
