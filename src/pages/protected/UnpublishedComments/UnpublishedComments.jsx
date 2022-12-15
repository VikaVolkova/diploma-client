import React, { useEffect } from 'react';
import { Typography, Container, CircularProgress, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getUnpublishedComments } from '../../../store/features/comments/commentsMiddlewares';
import { CommentsList } from '../../../components/comment/CommentsList/CommentsList';
import { MESSAGES, MESSAGE_TYPE, PAGE_TYPE } from '../../../helpers';
import { Message } from '../../../components/notification/Message/Message';

export const UnpublishedComments = () => {
  const { comments, loadingComments } = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUnpublishedComments());
  }, []);

  if (loadingComments) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }
  if (!loadingComments && comments.length === 0) {
    return (
      <Container>
        <Message text={MESSAGES.NO_UNPUBLISHED_COMMENTS} type={MESSAGE_TYPE.MAIN} />
      </Container>
    );
  }

  return (
    comments && (
      <Container>
        <Typography variant="h4" variantMapping={{ h4: 'h1' }} gutterBottom>
          Неопубліковані коментарі
        </Typography>
        <CommentsList data={comments} type={PAGE_TYPE.UNPUBLISHED} />
      </Container>
    )
  );
};
