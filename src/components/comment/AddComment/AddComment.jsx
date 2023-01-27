import React, { useState } from 'react';
import { Button, CircularProgress, FormHelperText, Stack } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../../store/features/comments/commentsMiddlewares';
import PropTypes from 'prop-types';
import MDEditor from '@uiw/react-md-editor';
import {
  BUTTON_VARIANT,
  ERROR_MESSAGES,
  MESSAGES,
  SIZE_TYPES,
  BUTTON_TYPE,
} from '../../../helpers';
import { toggleComment } from '../../../store/features/article/articleMiddlewares';
import ReCAPTCHA from 'react-google-recaptcha';
import { Box } from '@mui/system';
import { boxStyle, buttonMargin } from './AddComment.helpers';

const validationSchema = yup
  .object({
    text: yup.string().required(),
  })
  .required();

export const AddComment = ({ article }) => {
  const dispatch = useDispatch();
  const { loadingComments, error } = useSelector((state) => state.comments);
  const { userInfo } = useSelector((state) => state.auth);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
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

  const recaptchaOnChange = (value) => {
    setRecaptchaToken(value);
  };

  const onSubmit = ({ text }) => {
    dispatch(createComment({ text, article, author })).then((comment) => {
      dispatch(
        toggleComment({ articleId: article, commentId: comment.payload._id, deleted: false }),
      );
      reset();
      alert(MESSAGES.COMMENT_ADDED);
    });
  };

  const isButtonDisabled = Object.keys(errors).length > 0 || loadingComments || !recaptchaToken;

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
      {!!error && <FormHelperText error>{ERROR_MESSAGES.SERVER_ERROR}</FormHelperText>}
      <Controller
        name="text"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <div data-color-mode="light">
            <MDEditor
              {...field}
              preview="edit"
              commandsFilter={(cmd) => (cmd && /(link)/.test(cmd.name) ? false : cmd)}
            />
            {errors.text && <FormHelperText error>{errors.text?.message}</FormHelperText>}
          </div>
        )}
      />
      <Box sx={boxStyle}>
        <ReCAPTCHA
          // eslint-disable-next-line no-undef
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
          onChange={recaptchaOnChange}
          hl="uk"
        />
        <Button
          type={BUTTON_TYPE.SUBMIT}
          variant={BUTTON_VARIANT.CONTAINED}
          size={SIZE_TYPES.MEDIUM}
          sx={buttonMargin}
          disabled={isButtonDisabled}
          fullWidth
        >
          {loadingComments ? <CircularProgress size={20} color="white" /> : 'Додати коментар'}
        </Button>
      </Box>
    </Stack>
  );
};

AddComment.propTypes = {
  article: PropTypes.string.isRequired,
};
