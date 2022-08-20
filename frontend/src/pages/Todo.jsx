import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Chip,
	Container,
	Divider,
	Grid,
	MenuItem,
	Stack,
	Typography
} from '@mui/material'
import { fetchNewTodo, fetchTodo } from '../redux/slices/todo'
import { fetchGroup } from '../redux/slices/group'
import Loading from '../components/Loading'
import { DialogNew } from '../components/Todo'
import Page from '../components/Page'
import Iconify from '../components/Iconify'


export default function Todo() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { todo } = useSelector((state) => state.todo)
	const { group } = useSelector((state) => state.group)
	const isTodoLoading = todo.status === 'loading'
	const [open, setOpen] = React.useState(false)
	
	const handleClickOpen = () => {
		setOpen(true)
	}
	
	const handleClose = () => {
		setOpen(false)
	}
	
	React.useEffect(() => {
		dispatch(fetchTodo())
		dispatch(fetchGroup())
	}, [])
	
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid }
	} = useForm({
		defaultValues: {
			title: '',
			group: '',
			comment: '',
			status: ''
		},
		mode: 'onChange'
	})
	
	const onSubmit = async (values) => {
		const data = await dispatch(fetchNewTodo(values))
		const id = data.payload._id
		
		navigate(`/app/todo/${id}`)
		
		if (!data.payload) {
			return alert('Не удалось сделать пост')
		}
	}
	
	if (isTodoLoading) {
		return <Loading />
	}
	// 1
	return (
		<div>
			<Page title='Задачи'>
				<Container>
					<Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
						<Typography variant='h4' gutterBottom>
							Задачи
						</Typography>
						<Button
							variant='contained'
							onClick={handleClickOpen}
							startIcon={<Iconify icon='eva:plus-fill' />}
						>
							Создать
						</Button>
					</Stack>
					<DialogNew
						open={open}
						onClose={handleClose}
						onSubmit={handleSubmit(onSubmit)}
						errors={errors}
						register={register('title', { required: 'Укажите название' })}
						register1={register('group', { required: 'Укажите группу' })}
						group={group}
						prop7={(option) => (<MenuItem key={option.title} value={option.title}>{option.title}</MenuItem>)}
						register2={register('comment')}
						register3={register('status', { required: 'Укажите статус' })}
						valid={isValid}
					/>
					<Grid container spacing={3}>
						{Object.values(todo.items).map((obj) => (
								<Box ml={2} mb={2} key={obj.title}>
									<Card sx={{ minWidth: 275 }} key={obj.title}>
										<CardContent>
											<Chip color='info' size='small' label={obj.group} sx={{ mb: 0.5 }} />
											<Typography variant='h5' component='div'>
												{obj.title}
											</Typography>
											<Typography color='text.secondary' sx={{ fontSize: 12 }}>{obj.comment}</Typography>
										</CardContent>
										<Divider variant='middle' />
										<CardActions>
											<Button
												size='small'
												component={RouterLink}
												to={`/app/todo/${obj._id}`}>Подробнее</Button>
										</CardActions>
									</Card>
								</Box>
							)
						)}
					</Grid>
				</Container>
			</Page>
		</div>
	)
}
