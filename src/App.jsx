import { useEffect, useState, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import PasswordRecovery from "./pages/PasswordRecovery";
import NewPassword from "./pages/NewPassword";
import Profile from "./pages/Profile";
import Help from "./pages/Help";
import CreatePerson from "./pages/CreatePerson";
import Person from "./pages/Person";
import Materials from "./pages/Materials";
import PageNotFound from "./pages/PageNotFound";

import Api from "./utils/api";
import { UserContext } from "./utils/context";

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState();
  const { user, setUser } = useContext(UserContext);

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
        setUser(res.data.data);
        setLoggedIn(true);
        setLoading(false);
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
        <Route path="/">
          <Route path="/" element={<MainLayout onLogout={logOut} />}>
            <Route index path="profile" element={<Profile />} />
            <Route path="help" element={<Help />} />
            <Route path="create" element={<CreatePerson />} />
            <Route path="person/:personId" element={<Person />} />
            <Route path="materials" element={<Materials />} />
          </Route>
          <Route path="*" element={<PageNotFound loggedIn={loggedIn} />} />
        </Route>
      ) : (
        <Route path="/">
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
          <Route path="*" element={<PageNotFound loggedIn={loggedIn} />} />
        </Route>
      )}
    </Routes>
  );
}

export default App;
