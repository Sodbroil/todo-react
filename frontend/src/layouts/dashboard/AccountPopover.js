import React, { useRef, useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// @mui
import { alpha } from '@mui/material/styles'
import { Avatar, Box, Divider, IconButton, MenuItem, Stack, Typography } from '@mui/material'
import { logout } from '../../redux/slices/auth'
// components
import MenuPopover from '../../components/MenuPopover'
// mocks_
import axios from '../../axios'
import Loading from '../../components/Loading'

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
	{
		label: 'Главная',
		icon: 'eva:home-fill',
		linkTo: '/app/dashboard'
	},
	{
		label: 'Профиль',
		icon: 'eva:person-fill',
		linkTo: '/app/profile'
	}
	// {
	//   label: 'Настройки',
	//   icon: 'eva:settings-2-fill',
	//   linkTo: '#',
	// },
]

// ----------------------------------------------------------------------

export default function AccountPopover() {
	const anchorRef = useRef(null)

	const [open, setOpen] = useState(null)

	const handleOpen = (event) => {
		setOpen(event.currentTarget)
	}

	const handleClose = () => {
		setOpen(null)
	}

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const onClickLogout = () => {
		dispatch(logout())
		window.localStorage.removeItem('token')
		navigate('/auth/login', {replace: true})
	}

	// const userData = useSelector((state) => state.auth.data);

	const [data, setData] = useState()
	const [isLoading, setLoading] = useState(true)

	React.useEffect(() => {
		(async function () {
			try {
				axios.get('/auth/me').then((res) => {
					setData(res.data)
					setLoading(false)
				})
			} catch (e) {
				console.error(e)
			}
		})()
	}, [])

	if (isLoading) {
		return <Loading/>
	}

	return (
		<>
			<IconButton
				ref={anchorRef}
				onClick={handleOpen}
				sx={{
					p: 0,
					...(open && {
						'&:before': {
							zIndex: 1,
							content: '\'\'',
							width: '100%',
							height: '100%',
							borderRadius: '50%',
							position: 'absolute',
							bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8)
						}
					})
				}}
			>
				<Avatar src='/static/mock-images/avatars/avatar_default.jpg' alt='photoURL'/>
			</IconButton>

			<MenuPopover
				open={Boolean(open)}
				anchorEl={open}
				onClose={handleClose}
				sx={{
					p: 0,
					mt: 1.5,
					ml: 0.75,
					'& .MuiMenuItem-root': {
						typography: 'body2',
						borderRadius: 0.75
					}
				}}
			>
				<Box sx={{my: 1.5, px: 2.5}}>
					<>
						<Typography variant='subtitle2' noWrap>
							{data.userData.fullName}
						</Typography>
						<Typography variant='body2' sx={{color: 'text.secondary'}} noWrap>
							{data.userData.email}
						</Typography>
					</>
				</Box>

				<Divider sx={{borderStyle: 'dashed'}}/>

				<Stack sx={{p: 1}}>
					{MENU_OPTIONS.map((option) => (
						<MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
							{option.label}
						</MenuItem>
					))}
				</Stack>

				<Divider sx={{borderStyle: 'dashed'}}/>

				<MenuItem onClick={onClickLogout} sx={{m: 1}}>
					Выйти
				</MenuItem>
			</MenuPopover>
		</>
	)
}
