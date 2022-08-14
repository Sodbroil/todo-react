import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/Iconify';
import { fetchAuth, selectIsAuth } from '../../../redux/slices/auth';

// ----------------------------------------------------------------------

export default function LoginForm() {
  // const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: 'test@test.ru',
      password: '123456',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return alert('Не удалось залогиниться');
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
          name="email"
          label="Email address"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Укажите почту' })}
        />

        <TextField
          name="password"
          label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          // inputRef={passwordLog.ref}
          {...register('password', { required: 'Укажите пароль' })}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Запомнить меня" />
        <Link variant="subtitle2" underline="hover">
          Забыли пароль?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained">
        Авторизоваться
      </LoadingButton>
    </form>
  );
}
