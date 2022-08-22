import React from 'react'
import * as PropTypes from 'prop-types'
import {
	Button,
	Card,
	CardActions,
	CardContent,
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
	Stack,
	TextField,
	Typography
} from '@mui/material'
import { LoadingButton } from '@mui/lab'

DialogNew.propTypes = {
	open: PropTypes.bool,
	onClose: PropTypes.func,
	onSubmit: PropTypes.func,
	errors: PropTypes.any,
	register: PropTypes.any,
	register1: PropTypes.any,
	valid: PropTypes.bool
}

GroupOneInfo.propTypes = {
	data: PropTypes.func,
	s: PropTypes.string,
	onClick: PropTypes.func,
	onClick1: PropTypes.func
}

DialogRemove.propTypes = {
	open: PropTypes.bool,
	onClose: PropTypes.func,
	onClick: PropTypes.func
}

DialogEdit.propTypes = {
	open: PropTypes.bool,
	onClose: PropTypes.func,
	onSubmit: PropTypes.func,
	data: PropTypes.func,
	onChange: PropTypes.func,
	onChange1: PropTypes.func,
	valid: PropTypes.bool
}

export function DialogNew(props) {
	return <Dialog
		open={props.open}
		onClose={props.onClose}
		aria-labelledby='new-group-title'
		aria-describedby='new-group-description'
	>
		<form onSubmit={props.onSubmit}>
			<DialogTitle id='new-group-title'>
				{'Создать группу'}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id='new-group-description'>
					<Grid container direction='center' justifyContent='center' alignItems='center'>
						<Stack spacing={2} sx={{minWidth: 300, m: 0.5}}>
							<TextField
								defaultValue=''
								name='title'
								label='Название'
								error={Boolean(props.errors.title?.message)}
								helperText={props.errors.title?.message}
								{...props.register}
							/>
							<FormControl>
								<InputLabel htmlFor='priority-select'>Приоритет</InputLabel>
								<Select
									defaultValue=''
									id='priority-select'
									label='Приоритет'
									name='priority'
									error={Boolean(props.errors.priority?.message)}
									helperText={props.errors.priority?.message}
									{...props.register1}
								>
									<MenuItem value='1'>1</MenuItem>
									<MenuItem value='2'>2</MenuItem>
									<MenuItem value='3'>3</MenuItem>
									<MenuItem value='4'>4</MenuItem>
									<MenuItem value='5'>5</MenuItem>
									<MenuItem value='6'>6</MenuItem>
									<MenuItem value='7'>7</MenuItem>
									<MenuItem value='8'>8</MenuItem>
									<MenuItem value='9'>9</MenuItem>
									<MenuItem value='10'>10</MenuItem>
								</Select>
							</FormControl>
						</Stack>
					</Grid>
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<LoadingButton disabled={!props.valid} fullWidth size='large' type='submit' variant='contained'>
					Создать
				</LoadingButton>
			</DialogActions>
		</form>
	</Dialog>
}

export function GroupOneInfo(props) {
	return <Grid item xs={12} md={6} lg={4}>
		<Card sx={{minWidth: 275}}>
			<CardContent>
				<Typography sx={{mb: 1.5}} variant='h5' component='div'>
					{props.data.title}
				</Typography>
				<Typography sx={{fontSize: 12}} color='text.secondary'>
					Приоритет: {props.data.priority}
				</Typography>
				<Typography sx={{fontSize: 12}} color='text.secondary'>
					Дата создания: {props.s}
				</Typography>
				<Typography sx={{fontSize: 12}} color='text.secondary'>
					ID: {props.data._id}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size='small' onClick={props.onClick}>Изменить</Button>
				<Button color='error' size='small' onClick={props.onClick1}>Удалить</Button>
			</CardActions>
		</Card>
	</Grid>
}

export function DialogRemove(props) {
	return <Dialog
		open={props.open}
		onClose={props.onClose}
		aria-labelledby='alert-dialog'
		aria-describedby='alert-dialog'
	>
		<DialogTitle id='alert-dialog'>
			{'Вы действительно хотите удалить группу?'}
		</DialogTitle>
		<DialogActions>
			<Button onClick={props.onClose}>Отмена</Button>
			<Button color='error' onClick={props.onClick}>
				Удалить
			</Button>
		</DialogActions>
	</Dialog>
}

export function DialogEdit(props) {
	return <Dialog
		open={props.open}
		onClose={props.onClose}
		aria-labelledby='edit-group-title'
		aria-describedby='edit-group-description'
	>
		<form onSubmit={props.onSubmit}>
			<DialogTitle id='edit-group-title'>
				{'Редактировать группу'}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id='edit-group-description'>
					<Grid container direction='center' justifyContent='center' alignItems='center'>
						<Stack spacing={2} sx={{minWidth: 300, m: 0.5}}>
							<TextField
								defaultValue={props.data.title}
								name='title'
								label='Название'
								onChange={props.onChange}
							/>
							<FormControl>
								<InputLabel htmlFor='priority-select'>Приоритет</InputLabel>
								<Select
									defaultValue={props.data.priority}
									id='priority-select'
									label='Приоритет'
									name='priority'
									onChange={props.onChange1}
								>
									<MenuItem value='1'>1</MenuItem>
									<MenuItem value='2'>2</MenuItem>
									<MenuItem value='3'>3</MenuItem>
									<MenuItem value='4'>4</MenuItem>
									<MenuItem value='5'>5</MenuItem>
									<MenuItem value='6'>6</MenuItem>
									<MenuItem value='7'>7</MenuItem>
									<MenuItem value='8'>8</MenuItem>
									<MenuItem value='9'>9</MenuItem>
									<MenuItem value='10'>10</MenuItem>
								</Select>
							</FormControl>
						</Stack>
					</Grid>
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<LoadingButton disabled={!props.valid} fullWidth size='large' type='submit' variant='contained'>
					Редактировать
				</LoadingButton>
			</DialogActions>
		</form>
	</Dialog>
}


