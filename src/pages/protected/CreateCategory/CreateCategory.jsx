import React, { useState } from 'react';
import {
  Stack,
  TextField,
  Typography,
  Container,
  FormHelperText,
  Button,
  CircularProgress,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { createCategory } from '../../../store/features/category/categoryMiddlewares';
import * as yup from 'yup';
import { ERROR_MESSAGES, HELPER_TEXT } from '../../../helpers';

const validationSchema = yup
  .object({
    category: yup.string().required(),
    url: yup.string().required(),
  })
  .required();

export const CreateCategory = () => {
  const [serverError, setServerError] = useState('');
  const { loadingCategories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      category: '',
      url: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    setServerError('');
    dispatch(createCategory({ ...data }))
      .then(() => {
        reset();
      })
      .catch(() => {
        setServerError(ERROR_MESSAGES.SERVER_ERROR);
      });
  };

  const isButtonDisabled = Object.keys(errors).length > 0 || loadingCategories;

  return (
    <Container maxWidth="md">
      <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" variantMapping={{ h4: 'h1' }} gutterBottom>
          Будь ласка введіть дані нової категорії
        </Typography>
        {!!serverError && <FormHelperText error>{serverError}</FormHelperText>}
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Назва категорії"
              placeholder="UI/UX"
              error={!!errors?.category}
              helperText={
                errors.category?.message ? errors.category.message : HELPER_TEXT.CATEGORY_TIP
              }
              {...field}
            />
          )}
        />

        <Controller
          name="url"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="URL-адреса категорії"
              placeholder="ui-ux"
              error={!!errors?.url}
              helperText={errors.url?.message ? errors.url.message : HELPER_TEXT.URL_TIP}
              {...field}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isButtonDisabled}
          startIcon={loadingCategories && <CircularProgress size={20} sx={{ color: 'white' }} />}
        >
          Зберегти категорію
        </Button>
      </Stack>
    </Container>
  );
};
