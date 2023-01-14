import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Container,
  TextField,
  Button,
  Select,
  MenuItem,
  Box,
  FormHelperText,
  Stack,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
} from '@mui/material';
import { omit } from 'ramda';
import MDEditor from '@uiw/react-md-editor';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../../store/features/category/categoryMiddlewares';
import { BUTTON_VARIANT, formMargin, ROUTES } from '../../../../helpers';
import { uploadImage } from '../../../../store/features/image/imageMiddlewares';
import {
  getArticleByUrl,
  updateArticle,
} from '../../../../store/features/article/articleMiddlewares';

const ArticleDto = (article) => {
  return {
    title: article?.title || '',
    url: article?.url || '',
    spoiler: article?.spoiler || '',
    content: article?.content || '',
    category: article?.category._id || '',
    coverImage: article?.coverImage || '',
  };
};

const validationSchema = yup
  .object({
    title: yup.string().max(255).required(),
    url: yup.string().max(255).required(),
    spoiler: yup.string().max(1000).required(),
    content: yup.string().max(10000).required(),
  })
  .required();

export const UpdateArticle = () => {
  const { newsUrl } = useParams();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [imgBtnText, setImgBtnText] = useState('Оновити зображення');
  const formRef = useRef();

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { article, loadingArticle } = useSelector((state) => state.article);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: ArticleDto(),
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    dispatch(getArticleByUrl({ newsUrl })).then((res) => reset(ArticleDto(res.payload.article)));
    dispatch(getCategories());
  }, []);

  const onUploadImage = (e) => {
    e.target.name === 'coverImage' && e.target.files[0] && setImgBtnText('Завантажено');
  };

  const onSubmit = async (data) => {
    try {
      setServerError('');
      const formData = new FormData(formRef.current);
      const image = formData.get('image');

      setServerError('');
      await dispatch(uploadImage({ image })).then((res) => {
        dispatch(
          updateArticle({
            id: article._id,
            ...data,
            coverImage: res.payload.data || article.coverImage,
          }),
        );
      });
      navigate(ROUTES.HOME);
    } catch (err) {
      setServerError('Server Error');
    }
  };

  const isButtonDisabled = Object.keys(errors).length > 0;

  return (
    article &&
    categories && (
      <Container maxWidth="md">
        <Stack
          ref={formRef}
          component="form"
          spacing={2}
          onSubmit={handleSubmit(onSubmit)}
          onChange={onUploadImage}
        >
          <Typography variant="h4" variantMapping={{ h4: 'h1' }} gutterBottom>
            Oновіть дані статті
          </Typography>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Box sx={formMargin}>
                <TextField
                  margin="normal"
                  label="Заголовок:"
                  fullWidth
                  {...field}
                  error={!!errors?.title}
                  helperText={!!errors.title?.message}
                />
              </Box>
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
          <Controller
            name="spoiler"
            control={control}
            render={({ field }) => (
              <Box sx={formMargin}>
                <TextField
                  multiline
                  label="Спойлер:"
                  rows={3}
                  margin="normal"
                  fullWidth
                  {...field}
                  error={!!errors?.spoiler}
                  helperText={!!errors.spoiler?.message}
                />
              </Box>
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
                  <Button
                    htmlFor="coverImage"
                    variant={BUTTON_VARIANT.CONTAINED}
                    component="label"
                    fullWidth
                  >
                    {imgBtnText}
                  </Button>
                  {errors.coverImage && (
                    <FormHelperText error>{errors.coverImage?.message}</FormHelperText>
                  )}
                </>
              );
            }}
          />

          {!!serverError && <FormHelperText error>{serverError}</FormHelperText>}
          <Button
            type="submit"
            variant="contained"
            disabled={isButtonDisabled}
            startIcon={loadingArticle && <CircularProgress size={20} />}
          >
            Зберегти статтю
          </Button>
        </Stack>
      </Container>
    )
  );
};
