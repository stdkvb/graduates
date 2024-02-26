import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import AuthLayout from "./layouts/AuthLayout";
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
  const [loggedIn, setLoggedIn] = useState(false);
  const [errors, setErrors] = useState([]);

  //login submit
  const handleLoginSubmit = (login: string, password: string) => {
    Api.post(`auth/login`, { login, password }).then((res) => {
      if (res.status == 200) {
        setLoggedIn(true);
        localStorage.setItem("token", res.data.token);
      } else {
      }
    });
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
        <></>
      ) : (
        <Route path="/" element={<AuthLayout />}>
          <Route
            index
            path="/"
            element={
              <Login onLoginSubmit={handleLoginSubmit} errors={errors} />
            }
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
