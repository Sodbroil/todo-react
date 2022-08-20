import React from 'react'
import { useForm } from 'react-hook-form'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Card, CardActions, CardContent, Container, Divider, Grid, Stack, Typography } from '@mui/material'
// components
import Page from '../components/Page'
import Iconify from '../components/Iconify'
import { fetchGroup, fetchNewGroup } from '../redux/slices/group'
import Loading from '../components/Loading'
import { DialogNew } from '../components/Group'

export default function Group() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { group } = useSelector((state) => state.group)
	const isGroupLoading = group.status === 'loading'
	const [open, setOpen] = React.useState(false)
	
	const handleClickOpen = () => {
		setOpen(true)
	}
	
	const handleClose = () => {
		setOpen(false)
	}
	
	React.useEffect(() => {
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
			priority: ''
			
		},
		mode: 'onChange'
	})
	
	const onSubmit = async (values) => {
		try {
			const data = await dispatch(fetchNewGroup(values))
			const id = data.payload._id
			
			navigate(`/app/groups/${id}`)
		} catch (e) {
			console.warn(e)
			alert('Не удалось сделать пост')
		}
	}
	
	if (isGroupLoading) {
		return <Loading />
	}
	
	return (
		<Page title='Группы'>
			<Container>
				<DialogNew
					open={open}
					onClose={handleClose}
					onSubmit={handleSubmit(onSubmit)}
					errors={errors}
					register={register('title', { required: 'Укажите название' })}
					register1={register('priority', { required: 'Укажите приоритет' })}
					valid={isValid} />
				<Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
					<Typography variant='h4' gutterBottom>
						Группы
					</Typography>
					<Button
						variant='contained'
						onClick={handleClickOpen}
						startIcon={<Iconify icon='eva:plus-fill' />}
					>
						Создать
					</Button>
				</Stack>
				<Grid container spacing={3}>
					{Object.values(group.items).map((obj) => (
							<Box ml={2} mb={2} key={obj.title}>
								<Card sx={{ minWidth: 275 }} key={obj.title}>
									<CardContent>
										<Typography variant='h5' component='div'>
											{obj.title}
										</Typography>
									</CardContent>
									<Divider variant='middle' />
									<CardActions>
										<Button
											component={RouterLink}
											to={`/app/groups/${obj._id}`}
											size='small'>Подробнее</Button>
									</CardActions>
								</Card>
							</Box>
						)
					)}
				</Grid>
				{/* </Grid>1 */}
			</Container>
		</Page>
	)
}
