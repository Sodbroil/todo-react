import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
// @mui
import { Alert, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { fetchRegister, selectIsAuth } from '../../../redux/slices/auth';

// ----------------------------------------------------------------------

export default function RegisterForm() {
	const isAuth = useSelector(selectIsAuth);
	const dispatch = useDispatch();
	const [showPassword, setShowPassword] = useState(false);
	const [hasError, setHasError] = useState(false);

	const {
		register,
		handleSubmit,
		setError,
		formState: {errors, isValid},
	} = useForm({
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
		},
		mode: 'onChange',
	});


	const onSubmit = async (values) => {
		try {
			const data = await dispatch(fetchRegister(values));
			if ('token' in data.payload) {
				window.localStorage.setItem('token', data.payload.token);
			}
		} catch (e) {
			setHasError(true);
		}
	};

	function ErrorComponent() {
		return <Alert severity="error" sx={{mb: 2}}>Ошибка регистрации. Обратитесь в поддержку.</Alert>
	}

	if (isAuth) {
		return <Navigate to="/app/todo"/>;
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{hasError && <ErrorComponent/>}
			<Alert severity="info" sx={{mb: 2}}>Фамилия и Имя должны состоять как минимум из 3 символов </Alert>
			<Alert severity="info" sx={{mb: 2}}>Пароль должен состоять минимум из 6 символов</Alert>
			<Stack spacing={3}>
				<TextField
					name="fullName"
					label="Фамилия Имя"
					error={Boolean(errors.fullName?.message)}
					helperText={errors.fullName?.message}
					{...register('fullName', {required: 'Укажите Фамилию и Имя', minLength: 3})}
				/>

				<TextField
					name="email"
					label="Email address"
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					{...register('email', {
						required: 'Укажите почту', pattern: {
							value: /\S+@\S+\.\S+/,
							message: "Введенное значение не соответствует формату электронной почты"
						}
					})}
				/>

				<TextField
					name="password"
					label="Пароль"
					type={showPassword ? 'text' : 'password'}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
									<Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
								</IconButton>
							</InputAdornment>
						),
					}}
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					{...register('password', {required: 'Укажите пароль', minLength: 6})}
				/>

				<LoadingButton disabled={!isValid} fullWidth size="large" type="submit" variant="contained">
					Зарегистрироваться
				</LoadingButton>
			</Stack>
		</form>
	);
}
