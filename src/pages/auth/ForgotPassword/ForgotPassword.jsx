import React, { useState } from 'react';
import { TextField, Stack, Button, Typography } from '@mui/material';
import { FormContainer } from '../../../shared/components/FormContainer/FormContainer';
import {
  BUTTON_VARIANT,
  controlMargin,
  ERROR_MESSAGES,
  getDeviceSize,
  HELPER_TEXT,
  MESSAGES,
  NAME_TYPE,
  SIZE_TYPES,
  TYPOGRAPHY_VARIANTS,
  validateEmail,
} from '../../../helpers';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../../store/features/auth/authMiddlewares';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const { isPhone } = getDeviceSize();

  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const changeEmail = (e) => {
    setEmail(e.target.value);
    setEmailError(!validateEmail(e.target.value));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(forgotPassword({ email }));
    setEmail('');
    alert(MESSAGES.EMAIL_SENT);
  };
  const hundleBlur = () => {
    setEmailDirty(true);
  };

  return (
    <FormContainer>
      <Typography variant={TYPOGRAPHY_VARIANTS.H5} sx={controlMargin}>
        Забули пароль?
      </Typography>
      <h3>{!!error}</h3>

      <TextField
        fullWidth
        id={NAME_TYPE.EMAIL}
        type={NAME_TYPE.EMAIL}
        size={isPhone ? SIZE_TYPES.SMALL : SIZE_TYPES.MEDIUM}
        label="E-mail"
        variant={BUTTON_VARIANT.OUTLINED}
        value={email}
        onChange={changeEmail}
        onBlur={hundleBlur}
        placeholder={HELPER_TEXT.EMAIL_PLACEHOLDER}
        error={emailDirty && emailError}
        helperText={emailError && ERROR_MESSAGES.EMAIL}
      />

      <Stack sx={controlMargin}>
        <Button
          onClick={onSubmit}
          variant={BUTTON_VARIANT.CONTAINED}
          size={isPhone ? SIZE_TYPES.SMALL : SIZE_TYPES.MEDIUM}
        >
          Відправити листа
        </Button>
      </Stack>
    </FormContainer>
  );
};
