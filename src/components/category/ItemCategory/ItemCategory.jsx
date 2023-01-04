import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, ListItem, ListItemText, Tooltip, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { ACTION, listStyle, ROUTES } from '../../../helpers';
import { ActionPanel } from '../../article/ActionPanel/ActionPanel';
import { useNavigate } from 'react-router-dom';
import { deleteCategory } from '../../../store/features/category/categoryMiddlewares';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export const ItemCategory = ({ category }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleCategoryActive = (id) => {
    dispatch(deleteCategory({ id }));
  };
  return (
    <ListItem sx={listStyle}>
      <ListItemText
        primary={category.category}
        primaryTypographyProps={{ color: 'primary' }}
        secondary={`URL: ${category.url}`}
      />
      {category.isDeleted ? (
        <>
          <Typography color="error">Видалено</Typography>
          <Tooltip title={ACTION.RESTORE}>
            <IconButton
              aria-label={ACTION.RESTORE}
              size="large"
              onClick={() => toggleCategoryActive(category._id)}
            >
              <AddCircleOutlineOutlinedIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <ActionPanel
          handleEdit={() => navigate(`${ROUTES.UPDATE_CATEGORY}${category.url}`)}
          handleDelete={() => toggleCategoryActive(category._id)}
        />
      )}
    </ListItem>
  );
};

ItemCategory.propTypes = {
  category: PropTypes.object,
};
