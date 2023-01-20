import { Button, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BUTTON_VARIANT,
  COLORS,
  NOT_FOUND_ILLUSTRATION,
  TYPOGRAPHY_VARIANTS,
  formBottomMargin,
  ROUTES,
  getDeviceSize,
  NOT_FOUND_ALT,
} from '../../../helpers';
import { btnText, errorSubtitle, errorTitle, getGridItemStyle } from './NotFound.helpers';

export const NotFound = () => {
  const navigate = useNavigate();
  const { isPhone } = getDeviceSize();
  const gridItemStyle = getGridItemStyle(isPhone);
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} sx={gridItemStyle}>
          <Typography variant={TYPOGRAPHY_VARIANTS.H1} color={COLORS.PRIMARY}>
            {errorTitle}
          </Typography>
          <Typography variant={TYPOGRAPHY_VARIANTS.H6} sx={formBottomMargin}>
            {errorSubtitle}
          </Typography>
          <Button variant={BUTTON_VARIANT.CONTAINED} onClick={() => navigate(ROUTES.HOME)}>
            {btnText}
          </Button>
        </Grid>
        {!isPhone && (
          <Grid item sm={6}>
            <img src={NOT_FOUND_ILLUSTRATION} alt={NOT_FOUND_ALT} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
