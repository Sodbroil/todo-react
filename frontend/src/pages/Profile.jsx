import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardContent, Container, Grid, Stack, Typography } from '@mui/material'
import Page from '../components/Page'
import axios from '../axios'
import Loading from '../components/Loading'
import { fDate } from "../utils/formatTime";

export default function Profile() {
	const navigate = useNavigate()
	const {id} = useParams()
	const [data, setData] = React.useState()
	const [isLoading, setLoading] = React.useState(true)

	React.useEffect(() => {
		axios.get(`/app/profile/${id}`).then(res => {
			setData(res.data)
			setLoading(false)
		}).catch(err => {
			navigate('/404')
		})
	}, [])

	console.log(data)

	if (isLoading) {
		return <Loading/>
	}

	return (
		<div>
			<Page title='Профиль'>
				<Container key={data.fullName}>
					<Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
						<Typography variant='h4' gutterBottom>
							Информация о пользователе
						</Typography>
					</Stack>
					<Grid item xs={12} md={6} lg={4}>
						<Card sx={{minWidth: 275}}>
							<CardContent>
								<Typography sx={{mb: 1.5}} variant='h5' component='div'>
									{data.userData.fullName}
								</Typography>
								<Typography sx={{fontSize: 12}} color='text.secondary'>
									Почта: {data.userData.email}
								</Typography>
								<Typography sx={{fontSize: 12}} color='text.secondary'>
									Дата создания: {fDate(data.userData.createdAt)}
								</Typography>
								<Typography sx={{fontSize: 12}} color='text.secondary'>
									ID: {data.userData._id}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Container>
			</Page>
		</div>
	)
}
