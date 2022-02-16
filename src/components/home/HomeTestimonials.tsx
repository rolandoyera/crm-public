import type { FC } from 'react'
import { Avatar, Box, Container, Typography } from '@mui/material'

const HomeTestimonials: FC = (props) => (
	<Box
		sx={{
			backgroundColor: 'background.paper',
			py: 15,
		}}
		{...props}>
		<Container
			maxWidth='md'
			sx={{
				alignItems: 'center',
				display: 'flex',
				flexDirection: 'column',
			}}>
			<Typography align='center' color='textPrimary' variant='h3'>
				&quot;Rolando builds some of the best CRM's you can find. They will save
				you time and make you and your employees more productive.&quot;
			</Typography>
			<Box
				sx={{
					alignItems: 'center',
					display: 'flex',
					mt: 3,
				}}>
				<Avatar src='/static/home/olivier.jpeg' sx={{ mr: 2 }} />
				<Typography color='textSecondary' variant='body2'>
					Olivier Tassinari,
					<br />
					co-creator of @MaterialUI
				</Typography>
			</Box>
		</Container>
	</Box>
)

export default HomeTestimonials
