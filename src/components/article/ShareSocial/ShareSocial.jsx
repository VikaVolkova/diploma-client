import * as React from 'react';
import { shareSocials, socials, speedDial, WEBSITE_URL } from '../../../helpers';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { useLocation } from 'react-router-dom';
import { Box, SpeedDial, SpeedDialAction } from '@mui/material';

export const ShareSocial = () => {
  const url = useLocation();
  const items = socials(`${WEBSITE_URL}${url.pathname}`);
  console.log(url);
  return (
    <Box sx={shareSocials}>
      <SpeedDial ariaLabel="Share" icon={<ShareOutlinedIcon />} sx={speedDial}>
        {items.map((action) => (
          <SpeedDialAction key={action.name} icon={action.button} tooltipTitle={action.name} />
        ))}
      </SpeedDial>
    </Box>
  );
};
