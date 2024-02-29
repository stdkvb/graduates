import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import PasswordRecovery from "./pages/PasswordRecovery";
import NewPassword from "./pages/NewPassword";

import Api from "./utils/api";

interface App {
  errors: object;
  onLoginSubmit: (arg: object) => void;
}

function App() {
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [error, setError] = useState();

  //login submit
  const handleLoginSubmit = ({ login, password }) => {
    Api.post(`auth/login`, { login, password })
      .then((res) => {
        setLoggedIn(true);
        localStorage.setItem("token", res.data.token);
      })
      .catch((error) => setError(error.response.data));
  };

  return (
    <Routes>
      {loading ? (
        <Route
          path="/"
          element={
            <CircularProgress
              sx={{
                position: "absolute",
                top: "0",
                bottom: "0",
                left: "0",
                right: "0",
                margin: "auto",
              }}
            />
          }
        />
      ) : loggedIn ? (
        <Route path="/" element={<MainLayout />}></Route>
      ) : (
        <Route path="/" element={<AuthLayout />}>
          <Route
            index
            path="/"
            element={<Login onLoginSubmit={handleLoginSubmit} error={error} />}
          />
          <Route path="password-recovery" element={<PasswordRecovery />} />
          <Route
            path="check/password-recovery-code"
            element={<NewPassword />}
          />
        </Route>
      )}
    </Routes>
  );
}

export default App;
