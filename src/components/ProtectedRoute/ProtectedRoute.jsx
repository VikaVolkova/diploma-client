import * as React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Message } from '../Message/Message';
import { Container } from '../Container/Container';
import { MESSAGE_TYPE, ROLES } from '../../helpers';

export const ProtectedRoute = ({ roles, children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const isAllowed = !!userInfo && roles.includes(userInfo.role);

  if (!isAllowed) {
    return (
      <Container>
        <Message
          text="Сторінка доступна тільки користувачам з роллю адміністратора"
          type={MESSAGE_TYPE.MAIN}
        />
      </Container>
    );
  }

  return children;
};

ProtectedRoute.defaultProps = {
  roles: [ROLES.USER, ROLES.MANAGER, ROLES.ADMIN],
  redirectPath: '/',
};

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  roles: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  redirectPath: PropTypes.string,
};
