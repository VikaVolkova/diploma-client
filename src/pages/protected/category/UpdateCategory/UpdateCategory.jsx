import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Container,
  TextField,
  Button,
  Box,
  FormHelperText,
  Stack,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCategoryByUrl,
  updateCategory,
} from '../../../../store/features/category/categoryMiddlewares';
import {
  BUTTON_TYPE,
  BUTTON_VARIANT,
  formMargin,
  ROUTES,
  TYPOGRAPHY_VARIANTS,
} from '../../../../helpers';

const CategoryDto = (category) => {
  return {
    name: category?.name || '',
    url: category?.url || '',
  };
};

const validationSchema = yup
  .object({
    name: yup.string().max(20).required(),
    url: yup.string().max(40).required(),
  })
  .required();

export const UpdateCategory = () => {
  const { categoryUrl } = useParams();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const formRef = useRef();

  const dispatch = useDispatch();
  const { category, loadingCategories } = useSelector((state) => state.category);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: CategoryDto(),
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    dispatch(getCategoryByUrl({ categoryUrl })).then((res) => reset(CategoryDto(res.payload)));
  }, []);

  const onSubmit = async (data) => {
    try {
      setServerError('');

      setServerError('');
      await dispatch(
        updateCategory({
          id: category._id,
          ...data,
        }),
      );
      navigate(ROUTES.EDIT_CATEGORIES);
    } catch (err) {
      setServerError('Server Error');
    }
  };

  const isButtonDisabled = Object.keys(errors).length > 0;

  return (
    category && (
      <Container maxWidth="md">
        <Stack ref={formRef} component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
          <Typography variant={TYPOGRAPHY_VARIANTS.H5} gutterBottom>
            Oновіть дані статті
          </Typography>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Box sx={formMargin}>
                <TextField
                  margin="normal"
                  label="Заголовок:"
                  fullWidth
                  {...field}
                  error={!!errors?.name}
                  helperText={!!errors.name?.message}
                />
              </Box>
            )}
          />

          <Controller
            name="url"
            control={control}
            render={({ field }) => (
              <Box sx={formMargin}>
                <TextField
                  margin="normal"
                  label="Url:"
                  fullWidth
                  {...field}
                  error={!!errors?.url}
                  helperText={!!errors.url?.message}
                />
              </Box>
            )}
          />

          {!!serverError && <FormHelperText error>{serverError}</FormHelperText>}
          <Button
            type={BUTTON_TYPE.SUBMIT}
            variant={BUTTON_VARIANT.CONTAINED}
            disabled={isButtonDisabled}
            startIcon={loadingCategories && <CircularProgress size={20} />}
          >
            Зберегти статтю
          </Button>
        </Stack>
      </Container>
    )
  );
};
