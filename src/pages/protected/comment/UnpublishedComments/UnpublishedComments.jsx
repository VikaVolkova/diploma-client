import React from 'react';
import { Container } from '@mui/material';
import { CommentsList } from '../../../../components/comment/CommentsList/CommentsList';
import { PAGE_TYPE } from '../../../../helpers';

export const UnpublishedComments = () => {
  return (
    <Container>
      <CommentsList type={PAGE_TYPE.UNPUBLISHED} />
    </Container>
  );
};
