import React from 'react';
import { PropTypes } from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { getDeviceSize, SIZE_TYPES } from '../../../helpers';

export const ConfirmDialog = ({ open, onClose, title, content, handleConfirm }) => {
  const confirm = () => {
    handleConfirm();
    onClose();
  };
  const { isPhone, isTablet } = getDeviceSize();
  const btnSize = isPhone ? SIZE_TYPES.SMALL : SIZE_TYPES.MEDIUM;
  const titleSize = { fontSize: isPhone ? 16 : isTablet ? 18 : 20 };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={titleSize}>{title}</DialogTitle>
      {content && <DialogContent>{content}</DialogContent>}
      <DialogActions>
        <Button variant="contained" onClick={confirm} color="primary" size={btnSize}>
          Підтвердити
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.string,
  handleConfirm: PropTypes.func,
};
