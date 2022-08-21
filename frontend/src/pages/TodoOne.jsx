import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import {
	Alert,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Snackbar,
	Stack,
	TextField,
	Typography
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { fetchRemoveTodo } from '../redux/slices/todo'
import Page from '../components/Page'
import axios from '../axios'
import Loading from '../components/Loading'
import { DialogRemove, TodoOneInfo } from '../components/Todo'
import { fDate } from "../utils/formatTime";

export default function TodoOne() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const {id} = useParams()
	const [data, setData] = React.useState()
	const [isLoading, setLoading] = React.useState(true)
	const [open, setOpen] = React.useState(false)
	const [openEdit, setOpenEdit] = React.useState(false)
	const [title, setTitle] = React.useState('')
	const [group, setGroup] = React.useState('')
	const [comment, setComment] = React.useState('')
	const [status, setStatus] = React.useState('')
	const [errorText, setErrorText] = React.useState('')
	const [hasError, setHasError] = useState(false);


	const date = (param) => {
		const dateNew = new Date(param)
		const data = dateNew.toLocaleDateString('en-US')
		return data
	}

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClickOpenEdit = () => {
		setOpenEdit(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleCloseEdit = () => {
		setOpenEdit(false)
	}

	const onClickRemove = () => {
		dispatch(fetchRemoveTodo(id))
		setOpen(false)
		navigate(`/app/todo`)
	}

	const {
		handleSubmit,
		formState: {errors, isValid}
	} = useForm({
		defaultValues: {
			title: '',
			group: '',
			comment: '',
			status: ''

		},
		mode: 'onChange'
	})

	const onSubmit = async () => {
		try {
			const fields = {title, group, comment, status}
			const {data} = await axios.patch(`/app/todo/${id}`, fields)
			navigate(`/app/todo`)
		} catch (e) {
			console.warn(e)
			setErrorText(e.response.data[0].msg)
			setHasError(true);
		}
	}


	React.useEffect(() => {
		axios.get(`/app/todo/${id}`).then(res => {
			setData(res.data)
			setTitle(res.title)
			setGroup(res.group)
			setComment(res.comment)
			setStatus(res.status)
			setLoading(false)
		}).catch(err => {
			navigate('/404')
			// navigate(`/`)
		})
	}, [])

	console.log(data)

	if (isLoading) {
		return <Loading/>
	}

	return (
		<div>
			<Page title='Информация о задаче'>
				{hasError && <Snackbar
					open
					autoHideDuration={6000}
				>
					<Alert severity="error" sx={{width: '100%'}}>
						{errorText}
					</Alert>
				</Snackbar>
				}
				<Container key={data.title}>
					<Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
						<Typography variant='h4' gutterBottom>
							Информация о группе
						</Typography>
					</Stack>
					<Dialog
						open={openEdit}
						onClose={handleCloseEdit}
						aria-labelledby='alert-dialog-title'
						aria-describedby='alert-dialog-description'
					>
						<form onSubmit={handleSubmit(onSubmit)}>
							<DialogTitle id='alert-dialog-title'>
								{'Редактирование задачи'}
							</DialogTitle>
							<DialogContent>
								<DialogContentText id='alert-dialog-description'>
									<Grid container direction='center' justifyContent='center' alignItems='center'>
										<Stack spacing={2} sx={{minWidth: 300, mb: 2}}>
											<TextField
												name='title'
												label='Название'
												defaultValue={data.title}
												onChange={(e) => setTitle(e.target.value)}
											/>
											<FormControl disabled>
												<InputLabel htmlFor='group-select'>Группа</InputLabel>
												<Select
													id='group-select'
													label='Группа'
													name='group'
													defaultValue={data.group}
													onChange={(e) => setGroup(e.target.value)}
												>
													<MenuItem key={data.group} value={data.group}>{data.group}</MenuItem>
												</Select>
											</FormControl>
											<TextField name='comment' label='Комменатрий' defaultValue={data.comment}
											           onChange={(e) => setComment(e.target.value)}/>
											<FormControl>
												<InputLabel htmlFor='status-select'>Статус</InputLabel>
												<Select
													defaultValue={data.status}
													id='status-select'
													label='status'
													name='status'
													onChange={(e) => setStatus(e.target.value)}
												>
													<MenuItem value='Создана'>Создана</MenuItem>
													<MenuItem value='В процессе'>В процессе</MenuItem>
													<MenuItem value='Завершена'>Завершена</MenuItem>
												</Select>
											</FormControl>
										</Stack>
									</Grid>
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<LoadingButton disabled={!isValid} fullWidth size='large' type='submit' variant='contained'>
									Редактировать
								</LoadingButton>
							</DialogActions>
						</form>
					</Dialog>
					<DialogRemove open={open} onClose={handleClose} onClick={onClickRemove}/>
					<TodoOneInfo data={data} s={fDate(data.createdAt)} onClick={handleClickOpenEdit}
					             onClick1={handleClickOpen}/>
				</Container>
			</Page>
		</div>
	)
}
