import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { omit } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../../../store/features/image/imageMiddlewares';
import { updateUser } from '../../../store/features/auth/authMiddlewares';

const UserDto = (user) => {
  return {
    name: user?.name || '',
    email: user?.email || '',
    image: user?.image || '',
  };
};

const validationSchema = yup
  .object({
    name: yup.string().max(20),
    email: yup.string().max(50).email(),
  })
  .required();

export const UpdateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const formRef = useRef();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: UserDto(),
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    reset(UserDto(userInfo));
  }, []);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setServerError('');
      const formData = new FormData(formRef.current);
      const image = formData.get('image');

      setServerError('');
      setIsLoading(true);
      await dispatch(uploadImage({ image })).then((res) => {
        dispatch(updateUser({ ...data, image: res.payload.data || userInfo.image }));
        // dispatch(updateUser({ userId, ...data, image: res.payload.data }));
      });
      navigate('/');
    } catch (err) {
      setServerError('Server Error');
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonDisabled = Object.keys(errors).length > 0;

  return (
    <Container maxWidth="md">
      <Stack ref={formRef} component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" variantMapping={{ h4: 'h1' }} gutterBottom>
          Оновіть дані користувача
        </Typography>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Box sx={{ mt: '10px' }}>
              <TextField
                margin="normal"
                label="Name:"
                fullWidth
                {...field}
                error={!!errors?.name}
                helperText={
                  errors.name?.message ? errors.name.message : 'The title is require field'
                }
              />
            </Box>
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Box sx={{ mt: '10px' }}>
              <TextField
                margin="normal"
                label="email:"
                fullWidth
                {...field}
                error={!!errors?.email}
                helperText={errors.email?.message ? errors.email.message : 'The field is require'}
              />
            </Box>
          )}
        />

        <Controller
          name="image"
          control={control}
          render={({ field }) => {
            const fieldProps = omit(['value'], field);
            return (
              <>
                <input hidden type="file" accept="image/*" id="image" {...fieldProps} />
                <Button htmlFor="image" variant="contained" component="label" fullWidth>
                  Upload Image
                </Button>
                {errors.image && <FormHelperText error>{errors.image?.message}</FormHelperText>}
              </>
            );
          }}
        />

        {!!serverError && <FormHelperText error>{serverError}</FormHelperText>}
        <Button
          type="submit"
          variant="contained"
          disabled={isButtonDisabled}
          startIcon={isLoading && <CircularProgress size={20} />}
        >
          Save user
        </Button>
      </Stack>
    </Container>
  );
};
