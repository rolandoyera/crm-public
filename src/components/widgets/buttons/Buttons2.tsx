import type { FC } from 'react'
import { Box, Button } from '@mui/material'
import ArrowRightIcon from '../../../icons/ArrowRight'
import TrashIcon from '../../../icons/Trash'

const IconButtonsPreview: FC = () => (
	<Box
		sx={{
			backgroundColor: 'background.paper',
			p: 3,
		}}>
		<Button
			sx={{
				backgroundColor: 'error.main',
				mr: 3,
				'&:hover': {
					backgroundColor: 'error.dark',
				},
			}}
			size='small'
			startIcon={<TrashIcon />}
			variant='contained'>
			Delete Account
		</Button>
		<Button
			color='primary'
			endIcon={<ArrowRightIcon />}
			size='small'
			variant='contained'>
			Next Page
		</Button>
	</Box>
)

export default IconButtonsPreview
