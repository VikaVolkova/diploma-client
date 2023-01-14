import React, { useState } from 'react';
import { TextField, Stack, Button } from '@mui/material';
import { FormContainer } from '../../../shared/components/FormContainer/FormContainer';
import {
  BUTTON_VARIANT,
  ERROR_MESSAGES,
  HELPER_TEXT,
  MESSAGES,
  validateEmail,
} from '../../../helpers';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../../store/features/auth/authMiddlewares';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);

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
      <h2>Забули пароль?</h2>
      <h3>{!!error}</h3>

      <TextField
        fullWidth
        margin="normal"
        id="outlined-basic"
        type="email"
        label="E-mail"
        variant="outlined"
        value={email}
        onChange={changeEmail}
        onBlur={hundleBlur}
        placeholder={HELPER_TEXT.EMAIL_PLACEHOLDER}
        error={emailDirty && emailError}
        helperText={emailError && ERROR_MESSAGES.EMAIL}
        sx={{ mb: 2 }}
      />

      <Stack marginBottom="10px">
        <Button onClick={onSubmit} variant={BUTTON_VARIANT.CONTAINED} sx={{ mb: 2 }}>
          Відправити листа
        </Button>
      </Stack>
    </FormContainer>
  );
};
