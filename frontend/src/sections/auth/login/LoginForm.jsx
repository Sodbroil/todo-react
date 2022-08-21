import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Alert, Checkbox, FormControlLabel, IconButton, InputAdornment, Link, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/Iconify';
import { fetchAuth, selectIsAuth } from '../../../redux/slices/auth';

// ----------------------------------------------------------------------
export default function LoginForm() {
	// const navigate = useNavigate();
	const isAuth = useSelector(selectIsAuth);
	const [showPassword, setShowPassword] = useState(false);
	const dispatch = useDispatch();
	const [hasError, setHasError] = useState(false);

	const {
		register,
		handleSubmit,
		setError,
		setValue,
		formState: {errors, isValid},
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
	});
	
	const onSubmit = async (values) => {
		try {
			const data = await dispatch(fetchAuth(values));
			window.localStorage.setItem('token', data.payload.token);
		} catch (e) {
			setHasError(true);
		}
	};

	function ErrorComponent() {
		return <Alert severity="error" sx={{mb: 2}}>Неверное имя пользователя или пароль.</Alert>
	}

	if (isAuth) {
		return <Navigate to="/app/todo"/>;
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{hasError && <ErrorComponent/>}
			<Stack spacing={3}>
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
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					type={showPassword ? 'text' : 'password'}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
									<Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
								</IconButton>
							</InputAdornment>
						),
					}}
					// inputRef={passwordLog.ref}
					{...register('password', {required: 'Укажите пароль', minLength: 6})}
				/>
			</Stack>

			<Stack direction="row" alignItems="center" justifyContent="space-between" sx={{my: 2}}>
				<FormControlLabel control={<Checkbox defaultChecked/>} label="Запомнить меня"/>
				<Link variant="subtitle2" underline="hover">
					Забыли пароль?
				</Link>
			</Stack>

			<LoadingButton disabled={!isValid} fullWidth size="large" type="submit" variant="contained">
				Авторизоваться
			</LoadingButton>
		</form>
	);
}
