import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Alert, Container, Snackbar, Stack, Typography } from '@mui/material'
import { fetchRemoveTodo } from '../redux/slices/todo'
import Page from '../components/Page'
import axios from '../axios'
import Loading from '../components/Loading'
import { DialogEdit, DialogRemove, TodoOneInfo } from '../components/Todo'
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
			console.log(fields)
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
			setTitle(res.data.title)
			setGroup(res.data.group)
			setComment(res.data.comment)
			setStatus(res.data.status)
			setLoading(false)
		}).catch(err => {
			navigate('/404')
			// navigate(`/`)
		})
	}, [])

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
					<DialogEdit
						key={data.group}
						open={openEdit}
						onClose={handleCloseEdit}
						onSubmit={handleSubmit(onSubmit)}
						data={data}
						onChange={(e) => setTitle(e.target.value)}
						onChange1={(e) => setGroup(e.target.value)}
						onChange2={(e) => setComment(e.target.value)}
						onChange3={(e) => setStatus(e.target.value)}
						valid={isValid}/>
					<DialogRemove open={open} onClose={handleClose} onClick={onClickRemove}/>
					<TodoOneInfo data={data} s={fDate(data.createdAt)} onClick={handleClickOpenEdit}
					             onClick1={handleClickOpen}/>
				</Container>
			</Page>
		</div>
	)
}
