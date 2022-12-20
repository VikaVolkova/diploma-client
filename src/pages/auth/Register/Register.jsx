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
  ThemeProvider,
} from '@mui/material';
import { FormContainer } from '../../../shared/components/FormContainer/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import {
  validateName,
  validateEmail,
  validatePassword,
  ERROR_MESSAGES,
  HELPER_TEXT,
  theme,
  ROUTES,
} from '../../../helpers';
import { register, signInGoogle } from '../../../store/features/auth/authMiddlewares';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { GoogleLogin } from '@react-oauth/google';

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

  const { registered, loading, error } = useSelector((state) => state.auth);

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
    dispatch(register({ name, email, password }));
    setName('');
    setEmail('');
    setPassword('');
  };

  if (registered) navigate(ROUTES.LOGIN);

  const hundleBlur = (e) => {
    switch (e.target.name) {
      case 'name':
        setNameDirty(true);
        break;
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
      default:
        break;
    }
  };

  return (
    <FormContainer>
      <h2>Зареєструвати новий аккаунт</h2>
      <h3>{!!error}</h3>

      <TextField
        fullWidth
        margin="normal"
        id="outlined-basic"
        label="Ім'я"
        type="text"
        name="name"
        variant="outlined"
        value={name}
        onChange={updateName}
        onBlur={hundleBlur}
        placeholder="Ім'я"
        error={nameDirty && nameError}
      />

      <TextField
        fullWidth
        margin="normal"
        id="outlined-basic"
        label="E-mail"
        type="email"
        name="email"
        variant="outlined"
        value={email}
        onChange={updateEmail}
        onBlur={hundleBlur}
        placeholder={HELPER_TEXT.EMAIL_PLACEHOLDER}
        error={emailDirty && emailError}
        helperText={emailError && ERROR_MESSAGES.EMAIL}
      />

      <FormControl fullWidth sx={{ mt: 1, mb: 2 }} variant="outlined">
        <InputLabel htmlFor="password">Пароль</InputLabel>
        <OutlinedInput
          id="password"
          label="Пароль"
          type={showPassword ? 'text' : 'password'}
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
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const googleToken = credentialResponse.credential;
          dispatch(signInGoogle({ googleToken }));
          navigate(ROUTES.HOME);
        }}
        onError={() => {
          console.log('Registration Failed');
        }}
      />

      <Stack marginBottom="10px">
        <ThemeProvider theme={theme}>
          <Button variant="contained" onClick={onSubmit} sx={{ mb: 2, mt: 2 }}>
            {loading ? <CircularProgress size={20} color="white" /> : 'Зареєструвати'}
          </Button>
        </ThemeProvider>
      </Stack>
    </FormContainer>
  );
};
