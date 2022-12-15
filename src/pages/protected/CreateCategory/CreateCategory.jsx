import React, { useState } from 'react';
import {
  Stack,
  TextField,
  CircularProgress,
  Typography,
  Container,
  FormHelperText,
  Button,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { createCategory } from '../../../store/features/category/categoryMiddlewares';
import * as yup from 'yup';

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
        setServerError('Server Error');
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
                errors.category?.message
                  ? errors.category.message
                  : 'Назва повинна починатися з великої літери'
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
              helperText={
                errors.url?.message
                  ? errors.url.message
                  : 'Будь ласка, використовуйте дефіс замість пробілів або спеціальних символів'
              }
              {...field}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isButtonDisabled}
          loadingPosition="start"
          startIcon={loadingCategories && <CircularProgress size={20} />}
        >
          Зберегти категорію
        </Button>
      </Stack>
    </Container>
  );
};
