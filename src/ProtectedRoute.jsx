import * as React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import roles from "./constants/roles";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ roles, children, redirectPath }) => {
  const { userInfo, loading } = useSelector((state) => state.auth);
  let isAllowed;
  if (loading) {
    return <h1>loading...</h1>;
  }

  userInfo && (isAllowed = !!userInfo && roles.includes(userInfo.role));
  console.log(userInfo);

  if (!isAllowed && !loading) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

ProtectedRoute.defaultProps = {
  roles: [roles.user, roles.manager, roles.admin],
  redirectPath: "/",
};

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  roles: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  redirectPath: PropTypes.string,
};

export default ProtectedRoute;
