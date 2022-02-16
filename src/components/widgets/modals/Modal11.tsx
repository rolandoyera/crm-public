import type { FC } from 'react'
import {
	Avatar,
	Box,
	Button,
	Container,
	IconButton,
	Paper,
	Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import WarningIcon from '@mui/icons-material/WarningOutlined'
import XIcon from '../../../icons/X'

const Modal8: FC = () => (
	<Box
		sx={{
			backgroundColor: 'background.default',
			minHeight: '100%',
			p: 3,
		}}>
		<Container maxWidth='sm'>
			<Paper elevation={12} sx={{ position: 'relative' }}>
				<IconButton
					sx={{
						position: 'absolute',
						top: 8,
						right: 8,
					}}>
					<XIcon />
				</IconButton>
				<Box
					sx={{
						display: 'flex',
						pb: 2,
						pt: 3,
						px: 3,
					}}>
					<Avatar
						sx={{
							backgroundColor: (theme) => alpha(theme.palette.error.main, 0.08),
							color: 'error.main',
							mr: 2,
						}}>
						<WarningIcon />
					</Avatar>
					<Box>
						<Typography color='textPrimary' variant='h5'>
							Deactivate account
						</Typography>
						<Typography color='textSecondary' sx={{ mt: 1 }} variant='body2'>
							Are you sure you want to deactivate your account? All of your data
							will be permanently removed. This action cannot be undone.
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						px: 3,
						py: 1.5,
					}}>
					<Button color='primary' sx={{ mr: 2 }} variant='outlined'>
						Cancel
					</Button>
					<Button
						sx={{
							backgroundColor: 'error.main',
							'&:hover': {
								backgroundColor: 'error.dark',
							},
						}}
						variant='contained'>
						Deactivate
					</Button>
				</Box>
			</Paper>
		</Container>
	</Box>
)

export default Modal8
