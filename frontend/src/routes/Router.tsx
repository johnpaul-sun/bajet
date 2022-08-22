import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import AuthChecker from "../middlewares/AuthChecker";
import Error from "../pages/public/Error/Error";
import Login from "../pages/public/user/Login";
import Register from "../pages/public/user/Register/Register";
import Dashborad from "../pages/private/admin/Dashboard/Dashborad";
import Dashboard from "../pages/private/user/Dashboard/Dashboard";
import VerifyEmail from "src/pages/private/user/VerifyEmail/VerifyEmail";
import ForgotPassword from "src/pages/public/user/ForgotPassword/ForgotPassword";

export const roles: {
  admin: string,
  user: string,
  guest: string,
} = {
  admin: 'admin',
  user: 'user',
  guest: 'guest',
};

function Router() {

  return (
    <BrowserRouter>
      <Routes>
        {/*--------------- Public Routes ---------------*/}
        <Route path="*" element={<Error />} />
        <Route element={<AuthChecker userRoles={roles.guest} />}>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Route>

        {/*--------------- User Private Routes ---------------*/}
        <Route element={<AuthChecker userRoles={roles.user} />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/*--------------- Admin Private Routes ---------------*/}
        <Route element={<AuthChecker userRoles={roles.admin} />}>
          <Route path="/" element={<Navigate to="/admin/dashboard" />} />
          <Route path="/admin/dashboard" element={<Dashborad />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router

