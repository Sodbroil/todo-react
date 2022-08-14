import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { fetchRegister, selectIsAuth } from '../../../redux/slices/auth';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  // const [showPassword, setShowPassword] = useState(false);

  // const RegisterSchema = Yup.object().shape({
  //   firstName: Yup.string().required('First name required'),
  //   lastName: Yup.string().required('Last name required'),
  //   email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  //   password: Yup.string().required('Password is required'),
  // });

  // const defaultValues = {
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   password: '',
  // };

  // const methods = useForm({
  //   resolver: yupResolver(RegisterSchema),
  //   defaultValues,
  // });

  // const {
  //   handleSubmit,
  //   formState: { isSubmitting },
  // } = methods;

  // const onSubmit = async () => {
  //   navigate('/dashboard', { replace: true });
  // };

  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  //  console.log(setError);

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert('Не удалось зарегистрироваться');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/app/todo" />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <TextField
          name="fullName"
          label="ФИО"
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Укажите ФИО' })}
        />

        <TextField
          name="email"
          label="Email address"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Укажите почту' })}
        />

        <TextField
          name="password"
          label="Пароль"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите пароль' })}
        />

        <LoadingButton disabled={!isValid} fullWidth size="large" type="submit" variant="contained">
          Зарегистрироваться
        </LoadingButton>
      </Stack>
    </form>
  );
}
