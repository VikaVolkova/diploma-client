import React from 'react';
import { Typography, Container } from '@mui/material';
import { CommentsList } from '../../../components/comment/CommentsList/CommentsList';
import { PAGE_TYPE } from '../../../helpers';

export const UnpublishedComments = () => {
  return (
    <Container>
      <Typography variant="h4" variantMapping={{ h4: 'h1' }} gutterBottom>
        Неопубліковані коментарі
      </Typography>
      <CommentsList type={PAGE_TYPE.UNPUBLISHED} />
    </Container>
  );
};
