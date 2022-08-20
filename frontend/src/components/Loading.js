import React from 'react'
import { Box, CircularProgress } from '@mui/material'

export default function Loading() {
	return (
		<Box key='loading' sx={{ display: 'inline-block' }}>
			<CircularProgress />
		</Box>
	)
}