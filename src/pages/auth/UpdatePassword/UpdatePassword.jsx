import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormContainer } from '../../../shared/components/FormContainer/FormContainer';
import {
  BUTTON_VARIANT,
  HELPER_TEXT,
  INPUT_TYPE,
  MESSAGES,
  NAME_TYPE,
  ROUTES,
  validatePassword,
} from '../../../helpers';
import { useDispatch, useSelector } from 'react-redux';
import { checkOldPassword, updatePassword } from '../../../store/features/auth/authMiddlewares';
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
  const [isUpdated, setIsUpdated] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accessToken);
  const { loading } = useSelector((state) => state.auth);

  const handleClickShowPassword = (password) => {
    switch (password) {
      case NAME_TYPE.PASSWORD1:
        setShowPassword1(!showPassword1);
        break;
      case NAME_TYPE.PASSWORD2:
        setShowPassword2(!showPassword2);
        break;
      case NAME_TYPE.OLD_PASSWORD:
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

    dispatch(checkOldPassword({ oldPassword, token }))
      .then((res) =>
        res.error
          ? setBadPassword(true)
          : dispatch(updatePassword({ oldPassword, password1, password2, token })),
      )
      .then((res) => !res.error && setIsUpdated(true));

    setPassword1('');
    setPassword2('');
    setOldPassword('');
  };

  useEffect(() => {
    if (isUpdated) {
      alert(MESSAGES.PASSWORD_UPDATE);
      setBadPassword(false);
      navigate(ROUTES.LOGIN);
    }
  }, [isUpdated, loading]);

  const hundleBlur = () => {
    setPasswordDirty(true);
  };

  return (
    <FormContainer>
      <h2>Введіть ваш новий пароль</h2>
      <h3>{badPassword && 'Неправильний старий пароль'}</h3>
      <FormControl fullWidth sx={{ mt: 1, mb: 2 }} variant="outlined">
        <InputLabel htmlFor={NAME_TYPE.OLD_PASSWORD}>Старий пароль</InputLabel>
        <OutlinedInput
          id={NAME_TYPE.OLD_PASSWORD}
          label="Старий пароль"
          type={showOldPassword ? INPUT_TYPE.TEXT : INPUT_TYPE.PASSWORD}
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
        <InputLabel htmlFor={NAME_TYPE.PASSWORD1}>Новий пароль</InputLabel>
        <OutlinedInput
          id={NAME_TYPE.PASSWORD1}
          label="Новий пароль"
          type={showPassword1 ? INPUT_TYPE.TEXT : INPUT_TYPE.PASSWORD}
          value={password1}
          onChange={changePassword}
          onBlur={hundleBlur}
          placeholder={HELPER_TEXT.PASS_PLACEHOLDER}
          error={passwordDirty && validationError}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => handleClickShowPassword(NAME_TYPE.PASSWORD1)}
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
        <InputLabel htmlFor={NAME_TYPE.PASSWORD2}>Підтвердіть новий пароль</InputLabel>
        <OutlinedInput
          id={NAME_TYPE.PASSWORD2}
          label="Підтвердіть новий пароль"
          type={showPassword2 ? INPUT_TYPE.TEXT : INPUT_TYPE.PASSWORD}
          value={password2}
          onChange={changeSecondPassword}
          placeholder={HELPER_TEXT.PASS_PLACEHOLDER}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => handleClickShowPassword(NAME_TYPE.PASSWORD2)}
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
        <Button onClick={onSubmit} variant={BUTTON_VARIANT.CONTAINED} sx={{ mb: 2 }}>
          Оновити пароль
        </Button>
        <Button component={Link} to={ROUTES.FORGOT_PASSWORD} variant={BUTTON_VARIANT.OUTLINED}>
          Забув пароль
        </Button>
      </Stack>
    </FormContainer>
  );
};
