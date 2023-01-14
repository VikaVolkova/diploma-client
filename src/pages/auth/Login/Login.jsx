import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Stack,
  Button,
  Box,
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormControl,
  CircularProgress,
  ThemeProvider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { FormContainer } from '../../../shared/components/FormContainer/FormContainer';
import {
  BUTTON_TYPE,
  BUTTON_VARIANT,
  decodeToken,
  ERROR_MESSAGES,
  HELPER_TEXT,
  INPUT_TYPE,
  NAME_TYPE,
  ROUTES,
  selectErrorMessage,
  theme,
  validateEmail,
  validatePassword,
} from '../../../helpers';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../store/features/auth/authMiddlewares';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { GoogleLogin } from '@react-oauth/google';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState('');

  const navigate = useNavigate();

  const { userInfo, loading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const errorMessage = selectErrorMessage(error);

  const updateLogin = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
    setEmailError(!validateEmail(e.target.value));
  };

  const updatePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
    setPasswordError(!validatePassword(e.target.value));
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const hundleBlur = (e) => {
    e.preventDefault();
    switch (e.target.name) {
      case NAME_TYPE.EMAIL:
        setEmailDirty(true);
        break;
      case NAME_TYPE.PASSWORD:
        setPasswordDirty(true);
        break;
      default:
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setEmail('');
    setPassword('');
    dispatch(login({ email, password, googleUser: false }));
  };

  const googleLogin = (response) => {
    const googleToken = response.credential;
    const { email } = decodeToken(googleToken);
    dispatch(login({ email, googleUser: true })).then((res) => {
      !res.error && navigate(ROUTES.HOME);
    });
  };

  if (userInfo) navigate(ROUTES.HOME);

  return (
    <FormContainer>
      <h2>Увійти в обліковий запис</h2>
      <h3>{errorMessage}</h3>
      <Box>
        <TextField
          fullWidth
          margin="normal"
          id="outlined-basic"
          label="E-mail"
          type={INPUT_TYPE.EMAIL}
          variant="outlined"
          value={email}
          onBlur={hundleBlur}
          onChange={updateLogin}
          placeholder={HELPER_TEXT.EMAIL_PLACEHOLDER}
          error={emailDirty && emailError}
          helperText={emailError && ERROR_MESSAGES.EMAIL}
          name={NAME_TYPE.EMAIL}
        />

        <FormControl fullWidth sx={{ mt: 1, mb: 2 }} variant="outlined">
          <InputLabel htmlFor={NAME_TYPE.PASSWORD}>Пароль</InputLabel>
          <OutlinedInput
            id={NAME_TYPE.PASSWORD}
            label="Пароль"
            type={showPassword ? INPUT_TYPE.TEXT : INPUT_TYPE.PASSWORD}
            value={password}
            onChange={updatePassword}
            onBlur={hundleBlur}
            placeholder={HELPER_TEXT.PASS_PLACEHOLDER}
            error={passwordDirty && passwordError}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleClickShowPassword()}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
      <GoogleLogin
        theme="outline"
        size="large"
        text="signin_with"
        width="300"
        locale="uk"
        onSuccess={(credentialResponse) => googleLogin(credentialResponse)}
        useOneTap
      />

      <Stack direction="row" spacing={2} sx={{ mb: 2, mt: 2 }}>
        <ThemeProvider theme={theme}>
          <Button type={BUTTON_TYPE.SUBMIT} variant={BUTTON_VARIANT.CONTAINED} onClick={onSubmit}>
            {loading ? <CircularProgress size={20} color="white" /> : 'Увійти'}
          </Button>
          <Button component={Link} to={ROUTES.FORGOT_PASSWORD} variant={BUTTON_VARIANT.OUTLINED}>
            Забув пароль
          </Button>
        </ThemeProvider>
      </Stack>
    </FormContainer>
  );
};
