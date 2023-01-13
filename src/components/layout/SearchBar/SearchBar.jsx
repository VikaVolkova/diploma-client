import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Box, Tooltip } from '@mui/material';
import { ACTION, getDeviceSize, PREVIEW_TYPE, SIZE_TYPES } from '../../../helpers';
import { getBoxStyle, searchIconStyle, textFieldStyle } from './SearchBar.helpers';

export const SearchBar = ({ setSearchQuery, label, type, handleClose }) => {
  const { isPhone } = getDeviceSize();
  const boxStyle = getBoxStyle(type, isPhone);
  const [showSearchBar, setShowSearchBar] = useState(isPhone ? true : false);
  const toggleSearchBar = () => {
    setShowSearchBar((prev) => !prev);
    !!handleClose && handleClose();
  };

  return (
    <>
      {showSearchBar || type === PREVIEW_TYPE.FULL ? (
        <Box sx={boxStyle}>
          <TextField
            id="search-bar"
            className="text"
            onInput={(e) => {
              setSearchQuery(e.target.value);
            }}
            label={label}
            variant="outlined"
            placeholder="Пошук..."
            size={SIZE_TYPES.SMALL}
            sx={textFieldStyle(type, isPhone)}
          />
          {!isPhone && (
            <>
              <Tooltip title={ACTION.SEARCH}>
                <IconButton type="submit" aria-label={ACTION.SEARCH}>
                  <SearchIcon style={searchIconStyle(type, 'blue')} />
                </IconButton>
              </Tooltip>
              <Tooltip title={ACTION.CLOSE}>
                <IconButton type="submit" aria-label={ACTION.CLOSE} onClick={toggleSearchBar}>
                  <CloseIcon style={searchIconStyle(type, 'red')} />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Box>
      ) : (
        <Tooltip title={ACTION.SEARCH}>
          <IconButton aria-label={ACTION.SEARCH} size="medium" onClick={toggleSearchBar}>
            <SearchIcon />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};

SearchBar.propTypes = {
  label: PropTypes.string,
  setSearchQuery: PropTypes.func,
  handleClose: PropTypes.func,
  type: PropTypes.string,
};
