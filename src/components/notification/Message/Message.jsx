import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { React } from 'react';
import PropTypes from 'prop-types';
import { MESSAGE_TYPE, PAGE_TYPE, ROUTES } from '../../../helpers';

export const Message = ({ text, type }) => (
  <Card>
    <CardContent>
      <Typography variant="subtitle1">{text}</Typography>
    </CardContent>
    <CardActions sx={{ marginLeft: '8px' }}>
      {type === PAGE_TYPE.LOGIN && (
        <>
          <Button href={ROUTES.LOGIN} variant="contained">
            Зайти
          </Button>
          <Button href={ROUTES.REGISTER} variant="contained">
            Зареєструватись
          </Button>
        </>
      )}
      {type === PAGE_TYPE.MAIN && (
        <>
          <Button href={ROUTES.HOME} variant="contained">
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
