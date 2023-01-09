import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
  Stack,
  Typography,
  TextField,
  Button,
  FormHelperText,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { omit } from 'ramda';
import * as yup from 'yup';
import MDEditor from '@uiw/react-md-editor';
import { createArticle } from '../../../../store/features/article/articleMiddlewares';
import { getCategories } from '../../../../store/features/category/categoryMiddlewares';
import { uploadImage } from '../../../../store/features/image/imageMiddlewares';
import { DEFAULT_ARTICLE_IMAGE } from '../../../../helpers/constants/constans';
import { ERROR_MESSAGES, HELPER_TEXT } from '../../../../helpers';

const validationSchema = yup
  .object({
    title: yup.string().required().max(255),
    category: yup.string().required(),
    url: yup.string().required().max(30),
    spoiler: yup.string().required().max(100),
    content: yup.string().required().max(10000),
    picture: yup.string(),
  })
  .required();

export const CreateArticle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [imgBtnText, setImgBtnText] = useState('Завантажити зображення');
  const [serverError, setServerError] = useState('');
  const { userInfo } = useSelector((state) => state.auth);
  const formRef = useRef();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      title: '',
      category: '',
      url: '',
      spoiler: '',
      content: '',
    },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getCategories()).then((res) => {
        setCategories(res.payload);
      });
    }
  }, [categories.length, dispatch]);

  const onUploadImage = (e) => {
    e.target.name === 'coverImage' && e.target.files[0] && setImgBtnText('Завантажено');
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData(formRef.current);
      const image = formData.get('coverImage');

      setServerError('');
      setIsLoading(true);
      await dispatch(uploadImage({ image })).then((res) => {
        dispatch(
          createArticle({
            ...data,
            author: userInfo._id,
            coverImage: res.payload.data || DEFAULT_ARTICLE_IMAGE,
          }),
        );
      });
      reset();
    } catch (err) {
      setServerError(ERROR_MESSAGES.SERVER_ERROR);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonDisabled = Object.keys(errors).length > 0 || isLoading;

  return (
    <>
      <Container maxWidth="md">
        <Stack
          ref={formRef}
          component="form"
          spacing={2}
          onSubmit={handleSubmit(onSubmit)}
          onChange={onUploadImage}
        >
          <Typography variant="h4" variantMapping={{ h4: 'h1' }} gutterBottom>
            Введіть дані статті
          </Typography>
          {!!serverError && <FormHelperText error>{serverError}</FormHelperText>}

          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Заголовок"
                error={!!errors.title}
                helperText={errors.title?.message ? errors.title.message : HELPER_TEXT.TITLE_TIP}
                {...field}
              />
            )}
          />

          <FormHelperText>Виберіть категорію*</FormHelperText>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="select-category">Категорія</InputLabel>
                  <Select
                    {...field}
                    labelId="select-category"
                    fullWidth
                    label="Категорія"
                    error={!!errors.category}
                  >
                    {categories.map(({ _id, category }) => (
                      <MenuItem key={_id} value={_id}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.category && (
                    <FormHelperText error>{errors.category?.message}</FormHelperText>
                  )}
                </FormControl>
              </>
            )}
          />

          <Controller
            name="url"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Url:"
                error={!!errors.url}
                helperText={errors.url?.message ? errors.url.message : HELPER_TEXT.URL_TIP}
                {...field}
              />
            )}
          />

          <Controller
            name="spoiler"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Спойлер"
                error={!!errors.spoiler}
                helperText={
                  errors.spoiler?.message ? errors.spoiler.message : HELPER_TEXT.SPOILER_TIP
                }
                {...field}
              />
            )}
          />

          <Controller
            name="content"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div data-color-mode="light">
                <MDEditor {...field} preview="edit" />
                {errors.content && <FormHelperText error>{errors.content?.message}</FormHelperText>}
              </div>
            )}
          />

          <Controller
            name="coverImage"
            control={control}
            render={({ field }) => {
              const fieldProps = omit(['value'], field);
              return (
                <>
                  <input hidden type="file" accept="image/*" id="coverImage" {...fieldProps} />
                  <Button htmlFor="coverImage" variant="contained" component="label" fullWidth>
                    {imgBtnText}
                  </Button>
                  {errors.coverImage && (
                    <FormHelperText error>{errors.coverImage?.message}</FormHelperText>
                  )}
                </>
              );
            }}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={isButtonDisabled}
            startIcon={isLoading && <CircularProgress size={20} sx={{ color: 'white' }} />}
          >
            Зберегти
          </Button>
        </Stack>
      </Container>
    </>
  );
};
