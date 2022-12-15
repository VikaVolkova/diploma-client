import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Stack, Tooltip, IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { ConfirmDialog } from '../../notification/ConfirmDialog/ConfirmDialog';

export const ActionPanel = ({ handleEdit, handlePublish, handleDelete, handleUnpublish }) => {
  const [openPublish, setOpenPublish] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUnpublish, setOpenUnpublish] = useState(false);
  return (
    <>
      <div>
        <Stack direction="row" justifyContent="flex-end">
          {!!handleEdit && (
            <Tooltip title="Edit">
              <IconButton aria-label="Edit" size="large" onClick={handleEdit}>
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
          )}

          {!!handlePublish && (
            <>
              <Tooltip title="Publish">
                <IconButton aria-label="Publish" size="large" onClick={() => setOpenPublish(true)}>
                  <AddBoxOutlinedIcon />
                </IconButton>
              </Tooltip>
              <ConfirmDialog
                open={openPublish}
                onClose={() => setOpenPublish(false)}
                title="Are you sure you want to publish it?"
                handleConfirm={handlePublish}
              />
            </>
          )}
          {!!handleUnpublish && (
            <>
              <Tooltip title="Unpublish">
                <IconButton
                  aria-label="Publish"
                  size="large"
                  onClick={() => setOpenUnpublish(true)}
                >
                  <IndeterminateCheckBoxOutlinedIcon />
                </IconButton>
              </Tooltip>
              <ConfirmDialog
                open={openUnpublish}
                onClose={() => setOpenUnpublish(false)}
                title="Are you sure you want to unpublish it?"
                handleConfirm={handleUnpublish}
              />
            </>
          )}
          {!!handleDelete && (
            <>
              <Tooltip title="Delete">
                <IconButton aria-label="Delete" size="large" onClick={() => setOpenDelete(true)}>
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </Tooltip>
              <ConfirmDialog
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                title="Are you sure you want to delete it?"
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
