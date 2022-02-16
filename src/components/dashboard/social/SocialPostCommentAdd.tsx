import { useRef, useState } from 'react'
import type { ChangeEvent, FC } from 'react'
import {
	Avatar,
	Box,
	Divider,
	IconButton,
	TextField,
	Tooltip,
} from '@mui/material'
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import SendIcon from '@mui/icons-material/Send'
import useAuth from '../../../hooks/useAuth'

const SocialPostCommentAdd: FC = (props) => {
	const { user } = useAuth()
	const fileInputRef = useRef<HTMLInputElement | null>(null)
	const [value, setValue] = useState<string>('')

	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setValue(event.target.value)
	}

	const handleAttach = (): void => {
		fileInputRef.current.click()
	}

	return (
		<Box
			sx={{
				alignItems: 'center',
				display: 'flex',
			}}
			{...props}>
			<Avatar src={user.avatar} sx={{ mr: 1 }} />
			<TextField
				fullWidth
				onChange={handleChange}
				placeholder='Leave a message'
				size='small'
				variant='outlined'
			/>
			<Tooltip title='Send'>
				<IconButton
					color={value ? 'primary' : 'inherit'}
					component={value ? 'button' : 'span'}
					disabled={!value}>
					<SendIcon fontSize='small' />
				</IconButton>
			</Tooltip>
			<Box sx={{ height: 24 }}>
				<Divider orientation='vertical' />
			</Box>
			<Tooltip title='Attach image'>
				<IconButton edge='end' onClick={handleAttach}>
					<AddPhotoIcon fontSize='small' />
				</IconButton>
			</Tooltip>
			<Tooltip title='Attach file'>
				<IconButton edge='end' onClick={handleAttach}>
					<AttachFileIcon fontSize='small' />
				</IconButton>
			</Tooltip>
			<input hidden ref={fileInputRef} type='file' />
		</Box>
	)
}

export default SocialPostCommentAdd
