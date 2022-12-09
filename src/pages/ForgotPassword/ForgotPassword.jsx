import React, { useState } from 'react';
import { TextField, Stack, Button } from '@mui/material';
import { FormContainer } from '../../shared/FormContainer/FormContainer';
import { validateEmail } from '../../validation/validate';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../features/auth/authActions';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const message = 'Письмо було відправлено. Перевірте почту для відновлення паролю';

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
    alert(message);
  };
  const hundleBlur = () => {
    setEmailDirty(true);
  };

  return (
    <FormContainer>
      <h2>Забули пароль?</h2>
      <h3>{error ? error : null}</h3>

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
        placeholder="mango@gmail.com"
        error={emailDirty && emailError}
        helperText={emailError ? 'невірний e-mail' : null}
        sx={{ mb: 2 }}
      />

      <Stack marginBottom="10px">
        <Button onClick={onSubmit} variant="contained" sx={{ mb: 2 }}>
          Відправити листа
        </Button>
      </Stack>
    </FormContainer>
  );
};
