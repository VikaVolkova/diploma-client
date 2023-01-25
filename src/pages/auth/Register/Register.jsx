import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Stack,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
  CircularProgress,
  Typography,
  FormHelperText,
} from '@mui/material';
import { FormContainer } from '../../../shared/components/FormContainer/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import {
  validateName,
  validateEmail,
  validatePassword,
  ERROR_MESSAGES,
  HELPER_TEXT,
  ROUTES,
  decodeToken,
  BUTTON_VARIANT,
  INPUT_TYPE,
  NAME_TYPE,
  TYPOGRAPHY_VARIANTS,
  SIZE_TYPES,
  getDeviceSize,
  selectErrorMessage,
  controlMargin,
  getGoogleLoginWidth,
  formMargin,
  formBottomMargin,
  AUTH_ACTION_TYPE,
  titleMargin,
  formContainerStyle,
  errorStyle,
} from '../../../helpers';
import { register } from '../../../store/features/auth/authMiddlewares';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { GoogleLogin } from '@react-oauth/google';
import { useEffect } from 'react';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameDirty, setNameDirty] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  const { registered, loading } = useSelector((state) => state.auth);
  const { isPhone, isMonitor } = getDeviceSize();
  const googleLoginWidth = getGoogleLoginWidth(isPhone, isMonitor);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateName = (e) => {
    setName(e.target.value);
    setNameError(!validateName(e.target.value));
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
    setEmailError(!validateEmail(e.target.value));
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError(!validatePassword(e.target.value));
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password, googleUser: false })).then(
      (res) =>
        res.error &&
        setErrorMessage(
          selectErrorMessage(
            res.payload,
            AUTH_ACTION_TYPE.REGISTER,
            passwordError ? true : false,
            isDirty,
          ),
        ),
    );
  };

  const googleRegister = (response) => {
    const googleToken = response.credential;
    const { email, name, image } = decodeToken(googleToken);
    dispatch(register({ email, name, image, googleUser: true }));
    navigate(ROUTES.LOGIN);
  };

  if (registered) navigate(ROUTES.LOGIN);

  const hundleBlur = (e) => {
    switch (e.target.name) {
      case NAME_TYPE.NAME:
        setNameDirty(true);
        break;
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

  useEffect(() => {
    email && password && name && setIsDirty(true);
  }, [name, password, email]);

  return (
    <FormContainer sx={formContainerStyle}>
      <Typography variant={TYPOGRAPHY_VARIANTS.H5} sx={titleMargin}>
        Зареєструвати новий аккаунт
      </Typography>
      <Typography variant={TYPOGRAPHY_VARIANTS.SUBTITLE1} sx={errorStyle}>
        {errorMessage}
      </Typography>

      <TextField
        fullWidth
        id={NAME_TYPE.NAME}
        label="Ім'я"
        type={INPUT_TYPE.TEXT}
        name={NAME_TYPE.NAME}
        variant={BUTTON_VARIANT.OUTLINED}
        value={name}
        size={isPhone ? SIZE_TYPES.SMALL : SIZE_TYPES.MEDIUM}
        onChange={updateName}
        onBlur={hundleBlur}
        placeholder="Ім'я"
        error={nameDirty && nameError}
        helperText={nameError && HELPER_TEXT.NAME_PLACEHOLDER}
      />

      <TextField
        fullWidth
        id={NAME_TYPE.EMAIL}
        label="E-mail"
        type={INPUT_TYPE.EMAIL}
        name={NAME_TYPE.EMAIL}
        variant={BUTTON_VARIANT.OUTLINED}
        value={email}
        sx={formMargin}
        onChange={updateEmail}
        onBlur={hundleBlur}
        size={isPhone ? SIZE_TYPES.SMALL : SIZE_TYPES.MEDIUM}
        placeholder={HELPER_TEXT.EMAIL_PLACEHOLDER}
        error={emailDirty && emailError}
        helperText={emailError && ERROR_MESSAGES.EMAIL}
      />

      <FormControl fullWidth sx={[formMargin, formBottomMargin]} variant={BUTTON_VARIANT.OUTLINED}>
        <InputLabel htmlFor={NAME_TYPE.PASSWORD}>Пароль</InputLabel>
        <OutlinedInput
          id={NAME_TYPE.PASSWORD}
          label="Пароль"
          type={showPassword ? INPUT_TYPE.TEXT : INPUT_TYPE.PASSWORD}
          value={password}
          onChange={updatePassword}
          onBlur={hundleBlur}
          size={isPhone ? SIZE_TYPES.SMALL : SIZE_TYPES.MEDIUM}
          placeholder={HELPER_TEXT.PASS_PLACEHOLDER}
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
        {(passwordDirty || passwordError) && (
          <FormHelperText error id={NAME_TYPE.PASSWORD}>
            {HELPER_TEXT.PASS_PLACEHOLDER}
          </FormHelperText>
        )}
      </FormControl>
      <GoogleLogin
        theme="outline"
        size={SIZE_TYPES.MEDIUM}
        text="signup_with"
        width={googleLoginWidth}
        locale="uk"
        onSuccess={(credentialResponse) => googleRegister(credentialResponse)}
      />

      <Stack sx={controlMargin}>
        <Button
          variant={BUTTON_VARIANT.CONTAINED}
          onClick={onSubmit}
          size={isPhone ? SIZE_TYPES.SMALL : SIZE_TYPES.LARGE}
        >
          {loading ? <CircularProgress size={20} color="white" /> : 'Зареєструвати'}
        </Button>
      </Stack>
    </FormContainer>
  );
};
