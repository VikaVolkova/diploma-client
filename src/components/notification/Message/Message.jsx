import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { React } from 'react';
import PropTypes from 'prop-types';
import { MESSAGE_TYPE } from '../../../helpers';

export const Message = ({ text, type }) => (
  <Card>
    <CardContent>
      <Typography variant="subtitle1">{text}</Typography>
    </CardContent>
    <CardActions sx={{ marginLeft: '8px' }}>
      {type === 'login' && (
        <>
          <Button href="/login" variant="contained">
            Зайти
          </Button>
          <Button href="/register" variant="contained">
            Зареєструватись
          </Button>
        </>
      )}
      {type === 'main' && (
        <>
          <Button href="/" variant="contained">
            Повернутись на головну
          </Button>
        </>
      )}
    </CardActions>
  </Card>
);

Message.propTypes = {
  type: PropTypes.oneOf([MESSAGE_TYPE.LOGIN, MESSAGE_TYPE.MAIN]),
  text: PropTypes.string,
};
