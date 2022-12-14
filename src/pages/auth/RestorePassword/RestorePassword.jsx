import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormContainer } from '../../../shared/components/FormContainer/FormContainer';
import { HELPER_TEXT, MESSAGES, ROUTES, validatePassword } from '../../../helpers';
import { useDispatch, useSelector } from 'react-redux';
import { restorePassword } from '../../../store/features/auth/authMiddlewares';
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

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

export const RestorePassword = () => {
  const query = useQuery();
  const navigate = useNavigate();

  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [showPassword1, setShowPassword1] = useState('');
  const [showPassword2, setShowPassword2] = useState('');
  const [validationError, setValidationError] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);

  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const handleClickShowPassword = (password) => {
    password === 'password1' ? setShowPassword1(!showPassword1) : setShowPassword2(!showPassword2);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const changePassword = (e) => {
    setPassword1(e.target.value);
    setValidationError(!validatePassword(e.target.value));
  };

  const changeDoublePassword = (e) => {
    setPassword2(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      alert('fields do not match');
      return;
    }
    const token = query.get('token');

    dispatch(restorePassword({ password1, password2, token }));
    setPassword1('');
    setPassword2('');
    if (!error) {
      alert(MESSAGES.PASSWORD_UPDATE);
      navigate(ROUTES.LOGIN);
    } else {
      alert(error);
    }
  };

  const hundleBlur = () => {
    setPasswordDirty(true);
  };

  return (
    <FormContainer>
      <h2>?????????????? ?????? ?????????? ????????????</h2>
      <h3>{!!error}</h3>
      <FormControl fullWidth sx={{ mt: 1, mb: 2 }} variant="outlined">
        <InputLabel htmlFor="password1">?????????? ????????????</InputLabel>
        <OutlinedInput
          id="password1"
          label="?????????? ????????????"
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
        <InputLabel htmlFor="password2">?????????????????????? ?????????? ????????????</InputLabel>
        <OutlinedInput
          id="password2"
          label="?????????????????????? ?????????? ????????????"
          type={showPassword2 ? 'text' : 'password'}
          value={password2}
          onChange={changeDoublePassword}
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
          ?????????????? ????????????
        </Button>
      </Stack>
    </FormContainer>
  );
};
