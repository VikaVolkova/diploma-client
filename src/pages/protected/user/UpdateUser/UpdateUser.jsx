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
import { uploadImage } from '../../../../store/features/image/imageMiddlewares';
import { updateUser } from '../../../../store/features/auth/authMiddlewares';
import { BUTTON_TYPE, BUTTON_VARIANT, ROUTES, TYPOGRAPHY_VARIANTS } from '../../../../helpers';

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
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [imgBtnText, setImgBtnText] = useState('Завантажити зображення');
  const formRef = useRef();
  const { userInfo, loading } = useSelector((state) => state.auth);
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

  const onUploadImage = (e) => {
    e.target.name === 'image' && e.target.files[0] && setImgBtnText('Завантажено');
  };

  const onSubmit = async (data) => {
    try {
      setServerError('');
      const formData = new FormData(formRef.current);
      const image = formData.get('image');

      setServerError('');
      await dispatch(uploadImage({ image })).then((res) => {
        dispatch(updateUser({ ...data, image: res.payload.data || userInfo.image }));
      });
      navigate(ROUTES.USER);
    } catch (err) {
      setServerError('Server Error');
    }
  };

  const isButtonDisabled = Object.keys(errors).length > 0;

  return (
    <Container maxWidth="md">
      <Stack
        ref={formRef}
        component="form"
        spacing={2}
        onSubmit={handleSubmit(onSubmit)}
        onChange={onUploadImage}
      >
        <Typography variant={TYPOGRAPHY_VARIANTS.H5} gutterBottom>
          Оновіть дані користувача
        </Typography>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Box sx={{ mt: '10px' }}>
              <TextField
                margin="normal"
                label="Ім'я:"
                fullWidth
                {...field}
                error={!!errors?.name}
                helperText={!!errors?.name?.message}
              />
            </Box>
          )}
        />

        {!userInfo.googleUser && (
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Box sx={{ mt: '10px' }}>
                <TextField
                  margin="normal"
                  label="E-mail:"
                  fullWidth
                  {...field}
                  error={!!errors?.email}
                  helperText={!!errors?.email?.message}
                />
              </Box>
            )}
          />
        )}

        <Controller
          name="image"
          control={control}
          render={({ field }) => {
            const fieldProps = omit(['value'], field);
            return (
              <>
                <input hidden type="file" accept="image/*" id="image" {...fieldProps} />
                <Button
                  htmlFor="image"
                  variant={BUTTON_VARIANT.CONTAINED}
                  component="label"
                  fullWidth
                >
                  {imgBtnText}
                </Button>
                {errors.image && <FormHelperText error>{errors.image?.message}</FormHelperText>}
              </>
            );
          }}
        />

        {!!serverError && <FormHelperText error>{serverError}</FormHelperText>}
        <Button
          type={BUTTON_TYPE.SUBMIT}
          variant={BUTTON_VARIANT.CONTAINED}
          disabled={isButtonDisabled}
        >
          {loading ? <CircularProgress size={20} color="white" /> : 'Зберегти'}
        </Button>
      </Stack>
    </Container>
  );
};
