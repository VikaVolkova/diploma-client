import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Stack, Tooltip, IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { ConfirmDialog } from '../../notification/ConfirmDialog/ConfirmDialog';
import { ACTION, CONFIRM_MESSAGE } from '../../../helpers';

export const ActionPanel = ({ handleEdit, handlePublish, handleDelete, handleUnpublish }) => {
  const [openPublish, setOpenPublish] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUnpublish, setOpenUnpublish] = useState(false);
  const large = 'large';
  return (
    <>
      <div>
        <Stack direction="row" justifyContent="flex-end">
          {!!handleEdit && (
            <Tooltip title={ACTION.EDIT}>
              <IconButton aria-label={ACTION.EDIT} size={large} onClick={handleEdit}>
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
          )}

          {!!handlePublish && (
            <>
              <Tooltip title={ACTION.PUBLISH}>
                <IconButton
                  aria-label={ACTION.PUBLISH}
                  size={large}
                  onClick={() => setOpenPublish(true)}
                >
                  <AddBoxOutlinedIcon />
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
                  size={large}
                  onClick={() => setOpenUnpublish(true)}
                >
                  <IndeterminateCheckBoxOutlinedIcon />
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
                  size={large}
                  onClick={() => setOpenDelete(true)}
                >
                  <DeleteOutlineOutlinedIcon />
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
