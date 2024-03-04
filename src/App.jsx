import { useEffect, useState, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import PasswordRecovery from "./pages/PasswordRecovery";
import NewPassword from "./pages/NewPassword";
import Profile from "./pages/Profile";

import Api from "./utils/api";

//current user
export const UserContext = createContext(null);

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState();
  const [currentUser, setCurrentUser] = useState({});

  //login submit
  const logIn = ({ login, password }) => {
    Api.post(`auth/login`, { login, password })
      .then((res) => {
        setLoggedIn(true);
        localStorage.setItem("token", res.data.token);
      })
      .catch((error) => setError(error.response.data));
  };

  //logout
  const logOut = () => {
    Api.get(`auth/logout`, {})
      .then(() => {
        setLoggedIn(false);
        localStorage.clear();
        navigate("/");
      })
      .catch((error) => console.log(error.response.data));
  };

  //get user info
  const getUserInfo = () => {
    Api.get(`user`)
      .then((res) => {
        setLoggedIn(true);
        setLoading(false);
        setCurrentUser(res.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        setLoading(false);
      });
  };

  useEffect(getUserInfo, []);

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
        <Route
          path="/"
          element={
            <UserContext.Provider value={currentUser}>
              <MainLayout onLogout={logOut} />
            </UserContext.Provider>
          }
        >
          <Route index path="/" element={<Profile />} />
        </Route>
      ) : (
        <Route path="/" element={<AuthLayout />}>
          <Route
            index
            path="/"
            element={<Login onLoginSubmit={logIn} error={error} />}
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
