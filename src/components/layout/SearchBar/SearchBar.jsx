import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Tooltip } from '@mui/material';
import { ACTION } from '../../../helpers';
import { searchIconStyle, textFieldStype } from './SearchBar.helpers';

export const SearchBar = ({ setSearchQuery, label, type, handleClose }) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const toggleSearchBar = () => {
    setShowSearchBar((prev) => !prev);
    !!handleClose && handleClose();
  };
  return (
    <>
      {showSearchBar || type === 'full' ? (
        <div>
          <TextField
            id="search-bar"
            className="text"
            onInput={(e) => {
              setSearchQuery(e.target.value);
            }}
            label={label}
            variant="outlined"
            placeholder="Пошук..."
            size="small"
            sx={textFieldStype(type)}
          />
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
        </div>
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
