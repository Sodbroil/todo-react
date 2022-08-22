import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Container, Stack, Typography } from '@mui/material'
// components
import Page from '../components/Page'
import axios from '../axios'
import { fetchRemoveGroup } from '../redux/slices/group'
import Loading from '../components/Loading'
import { DialogEdit, DialogRemove, GroupOneInfo } from '../components/Group'
import { fDate } from '../utils/formatTime'

export default function GroupOne() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const {id} = useParams()
	const [data, setData] = React.useState()
	const [isLoading, setLoading] = React.useState(true)
	const [open, setOpen] = React.useState(false)
	const [openEdit, setOpenEdit] = React.useState(false)
	const [title, setTitle] = React.useState('')
	const [priority, setPriority] = React.useState('')

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
		dispatch(fetchRemoveGroup(id))
		setOpen(false)
		navigate(`/app/groups`)
	}

	const {
		handleSubmit,
		formState: {errors, isValid}
	} = useForm({
		defaultValues: {
			title: '',
			priority: ''

		},
		mode: 'onChange'
	})

	const onSubmit = async () => {
		try {
			const fields = {title, priority}
			const {data} = await axios.patch(`/app/groups/${id}`, fields)
			navigate(`/app/groups`)
		} catch (e) {
			console.warn(e)
			alert('Не удалось обновить пост')
		}
	}

	React.useEffect(() => {
		axios.get(`/app/groups/${id}`).then(res => {
			setData(res.data)
			setTitle(res.data.title)
			setPriority(res.data.priority)
			setLoading(false)
		}).catch(err => {
			console.warn(err)
			alert('Не удалось получить группу')
		})
	}, [])

	if (isLoading) {
		return <Loading/>
	}

	return (
		<Page title='Информация о группе'>
			<Container key={data.title}>
				<DialogRemove open={open} onClose={handleClose} onClick={onClickRemove}/>
				<DialogEdit
					open={openEdit}
					onClose={handleCloseEdit}
					onSubmit={handleSubmit(onSubmit)}
					data={data}
					onChange={(e) => setTitle(e.target.value)}
					onChange1={(e) => setPriority(e.target.value)}
					valid={isValid}
				/>
				<Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
					<Typography variant='h4' gutterBottom>
						Информация о группе
					</Typography>
				</Stack>
				<GroupOneInfo data={data} s={fDate(data.createdAt)} onClick={handleClickOpenEdit} onClick1={handleClickOpen}/>
			</Container>
		</Page>
	)
}
