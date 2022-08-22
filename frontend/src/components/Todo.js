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

TodoOneInfo.propTypes = {
	data: PropTypes.func,
	s: PropTypes.string
}

DialogNew.propTypes = {
	open: PropTypes.bool,
	onClose: PropTypes.func,
	onSubmit: PropTypes.func,
	errors: PropTypes.any,
	register: PropTypes.any,
	register1: PropTypes.any,
	group: PropTypes.any,
	prop7: PropTypes.func,
	register2: PropTypes.any,
	register3: PropTypes.any,
	valid: PropTypes.bool
}

DialogEdit.propTypes = {
	open: PropTypes.bool,
	onClose: PropTypes.func,
	onSubmit: PropTypes.func,
	data: PropTypes.func,
	onChange: PropTypes.func,
	onChange1: PropTypes.func,
	onChange2: PropTypes.func,
	onChange3: PropTypes.func,
	valid: PropTypes.bool
};

DialogRemove.propTypes = {
	open: PropTypes.bool,
	onClose: PropTypes.func,
	onClick: PropTypes.func
}

export function TodoOneInfo(props) {
	return <Grid item xs={12} md={6} lg={4}>
		<Card sx={{minWidth: 275}}>
			<CardContent>
				<Typography sx={{mb: 1.5}} variant='h5' component='div'>
					{props.data.title}
				</Typography>
				<Typography sx={{fontSize: 12}} color='text.secondary'>
					Группа: {props.data.group}
				</Typography>
				<Typography sx={{fontSize: 12}} color='text.secondary'>
					Комментарий: {props.data.comment}
				</Typography>
				<Typography sx={{fontSize: 12}} color='text.secondary'>
					Статус: {props.data.status}
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

export function DialogNew(props) {
	return <Dialog
		open={props.open}
		onClose={props.onClose}
		aria-labelledby='new-todo-dialog'
		aria-describedby='new-todo-dialog-description'
	>
		<form onSubmit={props.onSubmit}>
			<DialogTitle id='new-todo-dialog'>
				{'Создание новой задачи'}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id='new-todo-dialog-description'>
					<Grid container direction='center' justifyContent='center' alignItems='center'>
						<Stack spacing={2} sx={{minWidth: 300, m: 0.5}}>
							<TextField
								name='title'
								label='Название'
								error={Boolean(props.errors.title?.message)}
								helperText={props.errors.title?.message}
								{...props.register}
							/>
							<FormControl>
								<InputLabel htmlFor='group-select'>Группа</InputLabel>
								<Select
									defaultValue='Отстутсвует'
									id='group-select'
									label='Группа'
									name='group'
									error={Boolean(props.errors.group?.message)}
									helperText={props.errors.group?.message}
									{...props.register1}
								>
									<MenuItem value='Отстутсвует'>Отстутсвует</MenuItem>
									{(props.group.items).map(props.prop7)}
								</Select>
							</FormControl>
							<TextField name='comment' label='Комменатрий' {...props.register2} />
							<FormControl>
								<InputLabel htmlFor='status-select'>Статус</InputLabel>
								<Select
									defaultValue='Создана'
									id='status-select'
									label='status'
									name='status'
									error={Boolean(props.errors.status?.message)}
									helperText={props.errors.status?.message}
									{...props.register3}
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
				<LoadingButton disabled={!props.valid} fullWidth size='large' type='submit' variant='contained'>
					Создать
				</LoadingButton>
			</DialogActions>
		</form>
	</Dialog>
}

export function DialogEdit(props) {
	return <Dialog
		open={props.open}
		onClose={props.onClose}
		aria-labelledby="alert-dialog-title"
		aria-describedby="alert-dialog-description"
	>
		<form onSubmit={props.onSubmit}>
			<DialogTitle id="alert-dialog-title">
				{"Редактирование задачи"}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					<Grid container direction="center" justifyContent="center" alignItems="center">
						<Stack spacing={2} sx={{minWidth: 300, m: 0.5}}>
							<TextField
								name="title"
								label="Название"
								defaultValue={props.data.title}
								onChange={props.onChange}
							/>
							<FormControl disabled>
								<InputLabel htmlFor="group-select">Группа</InputLabel>
								<Select
									id="group-select"
									label="Группа"
									name="group"
									defaultValue={props.data.group}
									onChange={props.onChange1}
								>
									<MenuItem value={props.data.group}>{props.data.group}</MenuItem>
								</Select>
							</FormControl>
							<TextField name="comment" label="Комменатрий" defaultValue={props.data.comment}
							           onChange={props.onChange2}/>
							<FormControl>
								<InputLabel htmlFor="status-select">Статус</InputLabel>
								<Select
									defaultValue={props.data.status}
									id="status-select"
									label="status"
									name="status"
									onChange={props.onChange3}
								>
									<MenuItem value="Создана">Создана</MenuItem>
									<MenuItem value="В процессе">В процессе</MenuItem>
									<MenuItem value="Завершена">Завершена</MenuItem>
								</Select>
							</FormControl>
						</Stack>
					</Grid>
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<LoadingButton disabled={!props.valid} fullWidth size="large" type="submit" variant="contained">
					Редактировать
				</LoadingButton>
			</DialogActions>
		</form>
	</Dialog>;
}

export function DialogRemove(props) {
	return <Dialog
		open={props.open}
		onClose={props.onClose}
		aria-labelledby='alert-dialog'
		aria-describedby='alert-dialog'
	>
		<DialogTitle id='alert-dialog'>
			{'Вы действительно хотите удалить задачу?'}
		</DialogTitle>
		<DialogActions>
			<Button onClick={props.onClose}>Отмена</Button>
			<Button color='error' onClick={props.onClick}>
				Удалить
			</Button>
		</DialogActions>
	</Dialog>
}
