import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  TextField,
  Stack,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
} from '@mui/material';
import { FormContainer } from '../../shared/FormContainer/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { validateName, validateEmail, validatePassword } from '../../helpers/validate';
import { register } from '../../features/auth/authActions';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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

  if (registered) return <Navigate to="/login" />;

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
      <h3>{error ? error : null}</h3>

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
        placeholder="mango@gmail.com"
        error={emailDirty && emailError}
        helperText={emailError ? 'Невірний e-mail' : null}
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
          placeholder="Мінімум 8 символів"
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

      <Stack marginBottom="10px">
        <Button variant="contained" onClick={onSubmit} sx={{ mb: 2 }}>
          {loading ? <CircularProgress sx={{ color: 'white' }} /> : 'Зареєструвати'}
        </Button>
      </Stack>
    </FormContainer>
  );
};
