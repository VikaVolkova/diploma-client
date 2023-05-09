import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { React } from 'react';
import PropTypes from 'prop-types';
import {
  BUTTON_VARIANT,
  MESSAGE_TYPE,
  PAGE_TYPE,
  ROUTES,
  SIZE_TYPES,
  TYPOGRAPHY_VARIANTS,
  getDeviceSize,
} from '../../../helpers';

export const Message = ({ text, type }) => {
  const { isTablet } = getDeviceSize();
  const buttonSize = isTablet ? SIZE_TYPES.SMALL : SIZE_TYPES.MEDIUM;
  return (
    <Card>
      <CardContent>
        <Typography variant={TYPOGRAPHY_VARIANTS.SUBTITLE1} sx={{ fontSize: isTablet && '14px' }}>
          {text}
        </Typography>
      </CardContent>
      <CardActions sx={{ marginLeft: '8px' }}>
        {type === PAGE_TYPE.LOGIN && (
          <>
            <Button href={ROUTES.LOGIN} variant={BUTTON_VARIANT.CONTAINED} size={buttonSize}>
              Зайти
            </Button>
            <Button href={ROUTES.REGISTER} variant={BUTTON_VARIANT.CONTAINED} size={buttonSize}>
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
};

Message.propTypes = {
  type: PropTypes.oneOf([MESSAGE_TYPE.LOGIN, MESSAGE_TYPE.MAIN]),
  text: PropTypes.string,
};
