import * as React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Message } from '../../../notification/Message/Message';
import { Container } from '../../Container/Container';
import { MESSAGES, MESSAGE_TYPE, ROLES, ROUTES } from '../../../../helpers';
import { Box, CircularProgress } from '@mui/material';

export const ProtectedRoute = ({ roles, children }) => {
  const { userInfo, loading } = useSelector((state) => state.auth);
  const isAllowed = !!userInfo && roles.includes(userInfo.role);

  loading && (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  );

  !isAllowed && !loading && (
    <Container>
      <Message text={MESSAGES.NO_RIGHTS} type={MESSAGE_TYPE.MAIN} />
    </Container>
  );

  return children;
};

ProtectedRoute.defaultProps = {
  roles: [ROLES.USER, ROLES.MANAGER, ROLES.ADMIN],
  redirectPath: ROUTES.HOME,
};

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  roles: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  redirectPath: PropTypes.string,
};
