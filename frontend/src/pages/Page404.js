import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({theme}) => ({
	maxWidth: 480,
	margin: 'auto',
	minHeight: '100vh',
	display: 'flex',
	justifyContent: 'center',
	flexDirection: 'column',
	padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Page404() {
	return (
		<Page title="404 Страница не найдена">
			<Container>
				<ContentStyle sx={{textAlign: 'center', alignItems: 'center'}}>
					<Typography variant="h3" paragraph>
						Извините, страница не найдена!
					</Typography>

					<Typography sx={{color: 'text.secondary'}}>
						Извините, мы не смогли найти страницу, которую вы ищете. Возможно, вы ошиблись адресом?
						Обязательно проверьте правописание.
					</Typography>

					<Box
						component="img"
						src="/static/illustrations/illustration_404.svg"
						sx={{height: 260, mx: 'auto', my: {xs: 5, sm: 10}}}
					/>

					<Button to="/" size="large" variant="contained" component={RouterLink}>
						Вернуться домой
					</Button>
				</ContentStyle>
			</Container>
		</Page>
	);
}
