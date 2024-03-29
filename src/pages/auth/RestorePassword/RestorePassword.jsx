import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormContainer } from '../../../shared/components/FormContainer/FormContainer';
import {
  BUTTON_VARIANT,
  controlMargin,
  errorStyle,
  ERROR_MESSAGES,
  formBottomMargin,
  formContainerStyle,
  getDeviceSize,
  HELPER_TEXT,
  INPUT_TYPE,
  MESSAGES,
  NAME_TYPE,
  ROUTES,
  SIZE_TYPES,
  titleMargin,
  TYPOGRAPHY_VARIANTS,
  validatePassword,
} from '../../../helpers';
import { useDispatch } from 'react-redux';
import { restorePassword } from '../../../store/features/auth/authMiddlewares';
import {
  Stack,
  Button,
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormControl,
  Typography,
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
  const [errorMessage, setErrorMessage] = useState('');
  const { isPhone } = getDeviceSize();

  const dispatch = useDispatch();

  const handleClickShowPassword = (password) => {
    password === NAME_TYPE.PASSWORD1
      ? setShowPassword1(!showPassword1)
      : setShowPassword2(!showPassword2);
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

  const onSuccess = () => {
    alert(MESSAGES.PASSWORD_UPDATE);
    navigate(ROUTES.LOGIN);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      setErrorMessage(ERROR_MESSAGES.DOES_NOT_MATCH);
      return;
    }
    if (password1.length == 0 && password2.length == 0) {
      setErrorMessage(ERROR_MESSAGES.REQUIRED_FIELDS);
      return;
    }
    const token = query.get('token');

    dispatch(restorePassword({ password1, password2, token })).then(
      (res) => !res.error && onSuccess(),
    );
    setPassword1('');
    setPassword2('');
  };

  const hundleBlur = () => {
    setPasswordDirty(true);
  };

  return (
    <FormContainer sx={formContainerStyle}>
      <Typography variant={TYPOGRAPHY_VARIANTS.H5} sx={titleMargin}>
        Введіть ваш новий пароль
      </Typography>
      <Typography variant={TYPOGRAPHY_VARIANTS.SUBTITLE1} sx={errorStyle}>
        {errorMessage}
      </Typography>
      <FormControl fullWidth variant={BUTTON_VARIANT.OUTLINED}>
        <InputLabel htmlFor={NAME_TYPE.PASSWORD1}>Новий пароль</InputLabel>
        <OutlinedInput
          id={NAME_TYPE.PASSWORD1}
          label="Новий пароль"
          type={showPassword1 ? INPUT_TYPE.TEXT : INPUT_TYPE.PASSWORD}
          value={password1}
          size={isPhone ? SIZE_TYPES.SMALL : SIZE_TYPES.MEDIUM}
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

      <FormControl fullWidth sx={controlMargin} variant={BUTTON_VARIANT.OUTLINED}>
        <InputLabel htmlFor={NAME_TYPE.PASSWORD2}>Підтвердіть новий пароль</InputLabel>
        <OutlinedInput
          id={NAME_TYPE.PASSWORD2}
          label="Підтвердіть новий пароль"
          type={showPassword2 ? INPUT_TYPE.TEXT : INPUT_TYPE.PASSWORD}
          value={password2}
          size={isPhone ? SIZE_TYPES.SMALL : SIZE_TYPES.MEDIUM}
          onChange={changeDoublePassword}
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

      <Stack sx={formBottomMargin}>
        <Button
          onClick={onSubmit}
          variant={BUTTON_VARIANT.CONTAINED}
          size={isPhone ? SIZE_TYPES.SMALL : SIZE_TYPES.LARGE}
        >
          Оновити пароль
        </Button>
      </Stack>
    </FormContainer>
  );
};
