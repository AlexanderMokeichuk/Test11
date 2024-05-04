import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { RegisterMutation } from '../../type';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { registration } from './usersThunks';
import { selectRegisterError } from './usersSlice';

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();

  const [state, setState] = useState<RegisterMutation>({
    username: '',
    password: '',
    displayName: '',
    phoneNumber: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(registration(state)).unwrap();
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'white',
          padding: 2,
          borderRadius: 2,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                name="username"
                autoComplete="new-username"
                required={true}

                value={state.username}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('username'))}
                helperText={getFieldError('username')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                required={true}

                value={state.password}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('password'))}
                helperText={getFieldError('password')}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="displayName"
                label="Display name"
                type="text"
                autoComplete="new-displayName"
                required={true}

                value={state.displayName}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('displayName'))}
                helperText={getFieldError('displayName')}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="phoneNumber"
                label="Phone"
                type="tel"
                placeholder="+(996)"
                autoComplete="new-phoneNumber"
                required={true}

                value={state.phoneNumber}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('phoneNumber'))}
                helperText={getFieldError('phoneNumber')}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default Register;
