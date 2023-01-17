import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { React } from 'react';
import PropTypes from 'prop-types';
import {
  BUTTON_VARIANT,
  MESSAGE_TYPE,
  PAGE_TYPE,
  ROUTES,
  TYPOGRAPHY_VARIANTS,
} from '../../../helpers';

export const Message = ({ text, type }) => (
  <Card>
    <CardContent>
      <Typography variant={TYPOGRAPHY_VARIANTS.SUBTITLE2}>{text}</Typography>
    </CardContent>
    <CardActions sx={{ marginLeft: '8px' }}>
      {type === PAGE_TYPE.LOGIN && (
        <>
          <Button href={ROUTES.LOGIN} variant={BUTTON_VARIANT.CONTAINED}>
            Зайти
          </Button>
          <Button href={ROUTES.REGISTER} variant={BUTTON_VARIANT.CONTAINED}>
            Зареєструватись
          </Button>
        </>
      )}
      {type === PAGE_TYPE.MAIN && (
        <>
          <Button href={ROUTES.HOME} variant={BUTTON_VARIANT.CONTAINED}>
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
