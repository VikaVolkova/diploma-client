import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  TextField,
  Stack,
  Button,
  CircularProgress,
  Box,
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Link } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import { validateEmail, validatePassword } from "../../validation/validate";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authActions";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState("");

  const { userInfo, loading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const updateLogin = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
    setEmailError(!validateEmail(e.target.value));
  };

  const updatePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
    setPasswordError(!validatePassword(e.target.value));
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const hundleBlur = (e) => {
    e.preventDefault();
    switch (e.target.name) {
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

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    setEmail("");
    setPassword("");
  };

  if (userInfo?._id) return <Navigate to="/" />;

  return (
    <FormContainer>
      <h2>Увійти в обліковий запис</h2>
      <h3>{error ? "Невірний пароль" : null}</h3>
      <Box>
        <TextField
          fullWidth
          margin="normal"
          id="outlined-basic"
          label="E-mail"
          type="email"
          variant="outlined"
          value={email}
          onBlur={hundleBlur}
          onChange={updateLogin}
          placeholder="mango@gmail.com"
          error={emailDirty && emailError}
          helperText={emailError ? "невірний e-mail" : null}
          name="email"
        />

        <FormControl fullWidth sx={{ mt: 1, mb: 2 }} variant="outlined">
          <InputLabel htmlFor="password">Пароль</InputLabel>
          <OutlinedInput
            id="password"
            label="Пароль"
            type={showPassword ? "text" : "password"}
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
      </Box>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button type="submit" variant="contained" onClick={onSubmit}>
          {loading ? <CircularProgress sx={{ color: "white" }} /> : "Увійти"}
        </Button>
        <Button component={Link} to="/forgot-password" variant="outlined">
          Забув пароль
        </Button>
      </Stack>
    </FormContainer>
  );
}

export default Login;
