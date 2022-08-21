import React, { useState } from 'react'
import { useDispatch } from "react-redux";
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Typography } from '@mui/material';
// components
import Page from '../components/Page';
// sections
import { AppWidgetSummary, } from '../sections/@dashboard/app';
import axios from '../axios'
import Loading from "../components/Loading";


// ----------------------------------------------------------------------

export default function Dashboard() {
	const theme = useTheme();
	const dispatch = useDispatch()
	const [data, setData] = React.useState()
	const [isLoading, setLoading] = useState(true)


	React.useEffect(() => {
		try {
			axios.get('/app/getCount').then((res) => {
				setData(res.data)
				setLoading(false)
			})
		} catch (e) {
			console.log(e)
			alert('Ошибка. Обратитесь в поддержку')
		}
	}, [])

	if (isLoading) {
		return <Loading/>
	}

	return (
		<Page title="Главная">
			<Container maxWidth="xl">
				<Typography variant="h4" sx={{mb: 5}}>
					Привет, с возвращением
				</Typography>

				<Grid container spacing={3}>
					<Grid item xs={12} sm={6} md={3}>
						<AppWidgetSummary title="Количество задач" total={data.todo} icon={'ant-design:book-filled'}/>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<AppWidgetSummary title="Количество групп" total={data.group} color="info"
						                  icon={'ant-design:folder-filled'}/>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<AppWidgetSummary title="Незавершенные задачи" total={data.todoStart} color="warning"
						                  icon={'ant-design:file-exclamation-filled'}/>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<AppWidgetSummary title="Завершенные задачи" total={data.todoEnd} color="error"
						                  icon={'ant-design:file-filled'}/>
					</Grid>

				</Grid>
			</Container>
		</Page>
	);
}
