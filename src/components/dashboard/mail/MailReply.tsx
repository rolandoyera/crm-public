import { useRef, useState } from 'react'
import type { ChangeEvent, FC } from 'react'
import {
	Avatar,
	Box,
	Button,
	IconButton,
	Paper,
	TextareaAutosize,
	Tooltip,
} from '@mui/material'
import { experimentalStyled } from '@mui/material/styles'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate'
import useAuth from '../../../hooks/useAuth'

const MailReplyTextarea = experimentalStyled(TextareaAutosize)(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,
	border: 'none',
	color: theme.palette.text.primary,
	fontFamily: theme.typography.body1.fontFamily,
	fontSize: theme.typography.body1.fontSize,
	lineHeight: theme.typography.body1.lineHeight,
	outline: 'none',
	resize: 'none',
	width: '100%',
	'&::placeholder': {
		color: theme.palette.text.secondary,
	},
}))

const MailReply: FC = (props) => {
	const { user } = useAuth()
	const fileInputRef = useRef<HTMLInputElement | null>(null)
	const [value, setValue] = useState<string>('')

	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
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
				p: 3,
			}}
			{...props}>
			<Avatar src={user.avatar} />
			<Paper
				sx={{
					flexGrow: 1,
					ml: 2,
					p: 2,
				}}
				variant='outlined'>
				<MailReplyTextarea
					minRows={3}
					onChange={handleChange}
					placeholder='Leave a message'
					value={value}
				/>
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
						justifyContent: 'flex-end',
						mt: 2,
					}}>
					<Button color='primary' sx={{ mr: 1 }} variant='contained'>
						Send
					</Button>
					<Tooltip title='Attach image'>
						<IconButton onClick={handleAttach} size='small' sx={{ mr: 1 }}>
							<AddPhotoIcon fontSize='small' />
						</IconButton>
					</Tooltip>
					<Tooltip title='Attach file'>
						<IconButton onClick={handleAttach} size='small' sx={{ mr: 1 }}>
							<AttachFileIcon fontSize='small' />
						</IconButton>
					</Tooltip>
				</Box>
			</Paper>
			<input hidden ref={fileInputRef} type='file' />
		</Box>
	)
}

export default MailReply
