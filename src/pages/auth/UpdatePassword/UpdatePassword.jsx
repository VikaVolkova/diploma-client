import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormContainer } from '../../../shared/components/FormContainer/FormContainer';
import { HELPER_TEXT, MESSAGES, ROUTES, validatePassword } from '../../../helpers';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../../../store/features/auth/authMiddlewares';
import {
  Stack,
  Button,
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useEffect } from 'react';

export const UpdatePassword = () => {
  const navigate = useNavigate();

  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [showPassword1, setShowPassword1] = useState('');
  const [showPassword2, setShowPassword2] = useState('');
  const [showOldPassword, setShowOldPassword] = useState('');
  const [validationError, setValidationError] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [badPassword, setBadPassword] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accessToken);
  const { success, error, loading } = useSelector((state) => state.auth);

  const handleClickShowPassword = (password) => {
    switch (password) {
      case 'password1':
        setShowPassword1(!showPassword1);
        break;
      case 'password2':
        setShowPassword2(!showPassword2);
        break;
      case 'oldPassword':
        setShowOldPassword(!showOldPassword);
        break;
    }
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const changeOldPassword = (e) => {
    setOldPassword(e.target.value);
  };

  const changePassword = (e) => {
    setPassword1(e.target.value);
    setValidationError(!validatePassword(e.target.value));
  };

  const changeSecondPassword = (e) => {
    setPassword2(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      alert(MESSAGES.PASSWORDS_NOT_MATCH);
      return;
    }

    dispatch(updatePassword({ oldPassword, password1, password2, token }));

    setPassword1('');
    setPassword2('');
    setOldPassword('');
  };

  useEffect(() => {
    !!error && !loading && setBadPassword(true);
    if (success) {
      alert(MESSAGES.PASSWORD_UPDATE);
      setBadPassword(false);
      navigate(ROUTES.LOGIN);
    }
  }, [success, error, loading]);

  const hundleBlur = () => {
    setPasswordDirty(true);
  };

  return (
    <FormContainer>
      <h2>Введіть ваш новий пароль</h2>
      <h3>{badPassword && 'Неправильний старий пароль'}</h3>
      <FormControl fullWidth sx={{ mt: 1, mb: 2 }} variant="outlined">
        <InputLabel htmlFor="oldPassword">Старий пароль</InputLabel>
        <OutlinedInput
          id="oldPassword"
          label="Старий пароль"
          type={showOldPassword ? 'text' : 'password'}
          value={oldPassword}
          onChange={changeOldPassword}
          onBlur={hundleBlur}
          placeholder={HELPER_TEXT.PASS_PLACEHOLDER}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => handleClickShowPassword('oldPassword')}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showOldPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <FormControl fullWidth sx={{ mt: 1, mb: 2 }} variant="outlined">
        <InputLabel htmlFor="password1">Новий пароль</InputLabel>
        <OutlinedInput
          id="password1"
          label="Новий пароль"
          type={showPassword1 ? 'text' : 'password'}
          value={password1}
          onChange={changePassword}
          onBlur={hundleBlur}
          placeholder={HELPER_TEXT.PASS_PLACEHOLDER}
          error={passwordDirty && validationError}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => handleClickShowPassword('password1')}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword1 ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <FormControl fullWidth sx={{ mt: 1, mb: 2 }} variant="outlined">
        <InputLabel htmlFor="password2">Підтвердіть новий пароль</InputLabel>
        <OutlinedInput
          id="password2"
          label="Підтвердіть новий пароль"
          type={showPassword2 ? 'text' : 'password'}
          value={password2}
          onChange={changeSecondPassword}
          placeholder={HELPER_TEXT.PASS_PLACEHOLDER}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => handleClickShowPassword('password2')}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword2 ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <Stack marginBottom="10px">
        <Button onClick={onSubmit} variant="contained" sx={{ mb: 2 }}>
          Оновити пароль
        </Button>
        <Button component={Link} to={ROUTES.FORGOT_PASSWORD} variant="outlined">
          Забув пароль
        </Button>
      </Stack>
    </FormContainer>
  );
};
