import React, { useEffect } from 'react';
import { Typography, Container, CircularProgress, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getUnpublishedComments } from '../../features/comments/commentsActions';
import { CommentsList } from '../../components/CommentsList/CommentsList';
import { MESSAGES, MESSAGE_TYPE, PAGE_TYPE } from '../../helpers';
import { Message } from '../../components/Message/Message';

function UnpublishedComments() {
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
    return <Message text={MESSAGES.NO_UNPUBLISHED_COMMENTS} type={MESSAGE_TYPE.MAIN} />;
  }

  return (
    comments && (
      <Container maxWidth="md">
        <Typography variant="h4" variantMapping={{ h4: 'h1' }} gutterBottom>
          Неопубліковані коментарі
        </Typography>
        <CommentsList data={comments} type={PAGE_TYPE.UNPUBLISHED} />
      </Container>
    )
  );
}
export default UnpublishedComments;
