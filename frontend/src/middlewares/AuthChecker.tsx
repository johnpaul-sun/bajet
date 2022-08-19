import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthChecker = ({ userRoles }: { userRoles: string }): any => {
  // Update type in the future
  // const userData = Cookies.get('user') && JSON.parse(Cookies.get('user') || '{}');

  const userData = {
    is_admin: false
  }

  const user = userData === undefined ? false : !userData?.is_admin ? 'user' : false;
  const admin = userData?.is_admin ? 'admin' : false;

  if (user === admin)
    return userRoles === 'guest' ? <Outlet /> : <Navigate to={"/"} />;

  if (!admin)
    return user === userRoles ? <Outlet /> : <Navigate to={"/dashboard"} />;

  if (!user)
    return admin === userRoles ? <Outlet /> : <Navigate to={"/admin/dashboard"} />;
};

export default AuthChecker;
