import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { getDeviceSize } from '../../../helpers';

export const FormContainer = styled(Container)(() => {
  const { isPhone } = getDeviceSize();

  return {
    border: '1px solid gray',
    borderRadius: '4px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    margin: 'auto',
    width: isPhone ? '250px' : '350px',
  };
});
