import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { TextField, Stack, Button, CircularProgress } from "@mui/material";
import FormContainerMUI from "../../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  validateName,
  validateEmail,
  validatePassword,
} from "../../validation/validate";
import { register } from "../../features/auth/authActions";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameDirty, setNameDirty] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const { success, loading, error } = useSelector((state) => state.auth);

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

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
    setName("");
    setEmail("");
    setPassword("");
  };

  if (success) return <Navigate to="/login" />;

  const hundleBlur = (e) => {
    switch (e.target.name) {
      case "name":
        setNameDirty(true);
        break;
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
      default:
        break;
    }
  };

  return (
    <FormContainerMUI>
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
        helperText={emailError ? "Невірний e-mail" : null}
      />

      <TextField
        fullWidth
        margin="normal"
        name="password"
        id="outlined-password-input"
        label="Пароль"
        type="password"
        value={password}
        onChange={updatePassword}
        autoComplete="current-password"
        onBlur={hundleBlur}
        error={passwordDirty && passwordError}
        helperText="Пароль має бути не менше 8 символів"
      />

      <Stack marginBottom="10px">
        <Button variant="contained" onClick={onSubmit} sx={{ mb: 2 }}>
          {loading ? (
            <CircularProgress sx={{ color: "white" }} />
          ) : (
            "Зареєструвати"
          )}
        </Button>
      </Stack>
    </FormContainerMUI>
  );
}

export default Register;
