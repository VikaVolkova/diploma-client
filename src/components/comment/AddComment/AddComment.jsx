import React from 'react';
import { Button, CircularProgress, FormHelperText, Stack } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../../store/features/comments/commentsMiddlewares';
import PropTypes from 'prop-types';
import MDEditor from '@uiw/react-md-editor';
import { ERROR_MESSAGES } from '../../../helpers';

const validationSchema = yup
  .object({
    text: yup.string().required(),
  })
  .required();

export const AddComment = ({ article }) => {
  const dispatch = useDispatch();
  const { loadingComments, error } = useSelector((state) => state.comments);
  const { userInfo } = useSelector((state) => state.auth);
  const author = userInfo._id;

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      text: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = ({ text }) => {
    dispatch(createComment({ text, article, author })).then(() => {
      reset();
    });
  };

  const isButtonDisabled = Object.keys(errors).length > 0 || loadingComments;

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
      {!!error && <FormHelperText error>{ERROR_MESSAGES.SERVER_ERROR}</FormHelperText>}
      <Controller
        name="text"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <div data-color-mode="light">
            <MDEditor {...field} preview="edit" />
            {errors.text && <FormHelperText error>{errors.text?.message}</FormHelperText>}
          </div>
        )}
      />
      <Button
        type="submit"
        variant="contained"
        size="medium"
        sx={{ mt: '15px' }}
        disabled={isButtonDisabled}
      >
        {loadingComments ? (
          <CircularProgress size={20} sx={{ color: 'white' }} />
        ) : (
          'Додати коментар'
        )}
      </Button>
    </Stack>
  );
};

AddComment.propTypes = {
  article: PropTypes.string.isRequired,
};
