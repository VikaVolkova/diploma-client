import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, ListItem, ListItemText, Tooltip, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { ACTION, getDeviceSize, listStyle, ROUTES, SIZE_TYPES } from '../../../helpers';
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
  const { isPhone } = getDeviceSize();
  const size = isPhone ? SIZE_TYPES.SMALL : SIZE_TYPES.MEDIUM;
  const fontSize = isPhone ? 'var(--xs-font-size)' : 'var(--sm-font-size)';

  return (
    <ListItem sx={listStyle}>
      <ListItemText
        primary={category.name}
        primaryTypographyProps={{ color: 'primary', fontSize: fontSize }}
        secondary={`URL: ${category.url}`}
        secondaryTypographyProps={{ fontSize: fontSize }}
      />
      {category.isDeleted ? (
        <>
          <Typography color="error" variant={isPhone ? 'caption' : 'subtitle1'}>
            Видалено
          </Typography>
          <Tooltip title={ACTION.RESTORE}>
            <IconButton
              aria-label={ACTION.RESTORE}
              size={size}
              onClick={() => toggleCategoryActive(category._id)}
            >
              <AddCircleOutlineOutlinedIcon fontSize={size} />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <ActionPanel
          handleEdit={
            category.isEditable && (() => navigate(`${ROUTES.UPDATE_CATEGORY}${category.id}`))
          }
          handleDelete={() => toggleCategoryActive(category._id)}
        />
      )}
    </ListItem>
  );
};

ItemCategory.propTypes = {
  category: PropTypes.object,
};
