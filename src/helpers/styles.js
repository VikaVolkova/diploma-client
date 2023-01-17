import { createTheme } from '@mui/material/styles';

export let theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    white: {
      main: 'white',
    },
    grey: {
      main: 'grey',
    },
  },
});

theme.typography.h5 = {
  fontWeight: 600,
  [theme.breakpoints.up('md')]: {
    fontSize: '1.3rem',
  },
  '@media (max-width:1200px)': {
    fontSize: '1.2rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.1rem',
  },
};

theme.typography.subtitle2 = {
  fontWeight: 400,
  [theme.breakpoints.up('md')]: {
    fontSize: '0.9rem',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '0.8rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.7rem',
  },
};

theme.typography.body1 = {
  fontWeight: 400,
  [theme.breakpoints.up('md')]: {
    fontSize: '1rem',
  },
  '@media (max-width:1200px)': {
    fontSize: '0.9rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
};

theme.typography.body2 = {
  fontSize: '0.8rem',
};

export const paperProps = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 18,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
};

export const shareSocials = {
  height: 320,
  transform: 'translateZ(0px)',
  flexGrow: 1,
  position: 'fixed',
  zIndex: '1',
  bottom: 70,
  right: 40,
};

export const speedDial = { '& .MuiFab-default': { width: 0, height: 0 } };

export const formMargin = { mt: '10px' };
export const formBottomMargin = { mb: '20px' };
export const controlMargin = { m: '20px 0' };

export const categoriesButton = {
  color: 'gray',
  cursor: 'pointer',
  padding: 0,
};

export const listStyle = { justifyContent: 'space-between', borderBottom: '1px solid blue ' };

export const loadingBoxStyle = { display: 'flex', justifyContent: 'center' };
