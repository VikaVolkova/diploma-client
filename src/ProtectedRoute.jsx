import * as React from "react";
import PropTypes from "prop-types";
import roles from "./constants/roles";
import { useSelector } from "react-redux";
import Message from "./components/Message";
import Container from "./components/Container";

const ProtectedRoute = ({ roles, children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const isAllowed = !!userInfo && roles.includes(userInfo.role);

  if (!isAllowed) {
    return (
      <Container>
        <Message
          text="Сторінка доступна тільки користувачам з роллю адміністратора або менеджера"
          type="main"
        />
      </Container>
    );
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
