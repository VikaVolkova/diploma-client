import React from 'react';
import PropTypes from 'prop-types';
import { SearchBar } from '../../layout/SearchBar/SearchBar';
import { Box, ImageList, ImageListItem, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterData } from '../../../helpers';
import { ArticleSearchItem } from '../ArticleSearchItem/ArticleSearchItem';
import {
  boxStyle,
  imageListStyle,
  modalStyle,
  typographyStyle,
} from './SearchArticleModal.helpers';
import { useEffect } from 'react';
import { getArticles } from '../../../store/features/article/articleMiddlewares';

export const SearchArticleModal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    setSearchQuery('');
    setIsOpen(false);
  };
  const [searchQuery, setSearchQuery] = useState('');
  const { loadingArticles, articles } = useSelector((state) => state.article);

  let data = filterData(searchQuery, articles, 'article');
  useEffect(() => {
    dispatch(getArticles());
  }, []);

  return (
    <>
      {!loadingArticles && (
        <Modal
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={modalStyle}
        >
          <Box sx={boxStyle}>
            <SearchBar setSearchQuery={setSearchQuery} type="full" handleClose={handleClose} />
            {searchQuery.length > 2 && (
              <ImageList sx={imageListStyle} cols={1} rowHeight={160}>
                {data.length > 0 ? (
                  data.map((article) => (
                    <ImageListItem key={article._id}>
                      <ArticleSearchItem article={article} handleClose={handleClose} />
                    </ImageListItem>
                  ))
                ) : (
                  <Typography sx={typographyStyle} variant="subtitle1">
                    Статей не знайдено
                  </Typography>
                )}
              </ImageList>
            )}
          </Box>
        </Modal>
      )}
    </>
  );
};

SearchArticleModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};
