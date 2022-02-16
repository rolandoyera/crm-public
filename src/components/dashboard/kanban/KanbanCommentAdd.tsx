import { useState } from 'react'
import type { ChangeEvent, FC, KeyboardEvent } from 'react'
import PropTypes from 'prop-types'
import toast from 'react-hot-toast'
import { Avatar, Box, TextField } from '@mui/material'
import useAuth from '../../../hooks/useAuth'
import { addComment } from '../../../slices/kanban'
import { useDispatch } from '../../../store'

interface KanbanCommentAddProps {
	cardId: string
}

const KanbanCommentAdd: FC<KanbanCommentAddProps> = (props) => {
	const { cardId, ...other } = props
	const dispatch = useDispatch()
	const { user } = useAuth()
	const [message, setMessage] = useState<string>('')

	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setMessage(event.target.value)
	}

	const handleKeyUp = async (
		event: KeyboardEvent<HTMLInputElement>
	): Promise<void> => {
		try {
			if (event.code === 'ENTER' && message) {
				await dispatch(addComment(cardId, message))
				setMessage('')
				toast.success('Comment added!')
			}
		} catch (err) {
			console.error(err)
			toast.error('Something went wrong!')
		}
	}

	return (
		<Box
			sx={{
				alignItems: 'center',
				display: 'flex',
			}}
			{...other}>
			<Avatar src={user.avatar} sx={{ mr: 2 }} />
			<TextField
				fullWidth
				onChange={handleChange}
				onKeyUp={handleKeyUp}
				placeholder='Write a comment...'
				size='small'
				value={message}
				variant='outlined'
			/>
		</Box>
	)
}

KanbanCommentAdd.propTypes = {
	cardId: PropTypes.string.isRequired,
}

export default KanbanCommentAdd
