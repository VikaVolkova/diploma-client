import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Stack, Tooltip, IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { ConfirmDialog } from '../../notification/ConfirmDialog/ConfirmDialog';
import { ACTION, CONFIRM_MESSAGE, getDeviceSize, SIZE_TYPES } from '../../../helpers';

export const ActionPanel = ({ handleEdit, handlePublish, handleDelete, handleUnpublish }) => {
  const [openPublish, setOpenPublish] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUnpublish, setOpenUnpublish] = useState(false);
  const { isPhone } = getDeviceSize();
  const size = isPhone ? SIZE_TYPES.SMALL : SIZE_TYPES.MEDIUM;

  return (
    <>
      <div>
        <Stack direction="row" justifyContent="flex-end">
          {!!handleEdit && (
            <Tooltip title={ACTION.EDIT}>
              <IconButton aria-label={ACTION.EDIT} size={size} onClick={handleEdit}>
                <EditOutlinedIcon fontSize={size} />
              </IconButton>
            </Tooltip>
          )}

          {!!handlePublish && (
            <>
              <Tooltip title={ACTION.PUBLISH}>
                <IconButton
                  aria-label={ACTION.PUBLISH}
                  size={size}
                  onClick={() => setOpenPublish(true)}
                >
                  <AddBoxOutlinedIcon fontSize={size} />
                </IconButton>
              </Tooltip>
              <ConfirmDialog
                open={openPublish}
                onClose={() => setOpenPublish(false)}
                title={CONFIRM_MESSAGE.PUBLISH}
                handleConfirm={handlePublish}
              />
            </>
          )}
          {!!handleUnpublish && (
            <>
              <Tooltip title={ACTION.UNPUBLISH}>
                <IconButton
                  aria-label={ACTION.UNPUBLISH}
                  size={size}
                  onClick={() => setOpenUnpublish(true)}
                >
                  <IndeterminateCheckBoxOutlinedIcon fontSize={size} />
                </IconButton>
              </Tooltip>
              <ConfirmDialog
                open={openUnpublish}
                onClose={() => setOpenUnpublish(false)}
                title={CONFIRM_MESSAGE.UNPUBLISH}
                handleConfirm={handleUnpublish}
              />
            </>
          )}
          {!!handleDelete && (
            <>
              <Tooltip title={ACTION.DELETE}>
                <IconButton
                  aria-label={ACTION.DELETE}
                  size={size}
                  onClick={() => setOpenDelete(true)}
                >
                  <DeleteOutlineOutlinedIcon fontSize={size} />
                </IconButton>
              </Tooltip>
              <ConfirmDialog
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                title={CONFIRM_MESSAGE.DELETE}
                handleConfirm={handleDelete}
              />
            </>
          )}
        </Stack>
      </div>
    </>
  );
};

ActionPanel.propTypes = {
  handleEdit: PropTypes.func,
  handlePublish: PropTypes.func,
  handleDelete: PropTypes.func,
  handleUnpublish: PropTypes.func,
};
