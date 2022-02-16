import { useState } from 'react'
import type { ChangeEvent, FC } from 'react'
import PropTypes from 'prop-types'
import toast from 'react-hot-toast'
import { Box, Button, TextField } from '@mui/material'
import { createCard } from '../../../slices/kanban'
import { useDispatch } from '../../../store'

interface KanbanCardAddProps {
	columnId: string
}

const KanbanCardAdd: FC<KanbanCardAddProps> = (props) => {
	const { columnId, ...other } = props
	const dispatch = useDispatch()
	const [isExpanded, setIsExpanded] = useState<boolean>(false)
	const [name, setName] = useState<string>('')

	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setName(event.target.value)
	}

	const handleAddInit = (): void => {
		setIsExpanded(true)
	}

	const handleAddCancel = (): void => {
		setIsExpanded(false)
		setName('')
	}

	const handleAddConfirm = async (): Promise<void> => {
		try {
			await dispatch(createCard(columnId, name || 'Untitled Card'))
			setIsExpanded(false)
			setName('')
			toast.success('Card created!')
		} catch (err) {
			console.error(err)
			toast.error('Something went wrong!')
		}
	}

	return (
		<div {...other}>
			{isExpanded ? (
				<>
					<TextField
						fullWidth
						label='Title'
						name='cardName'
						onChange={handleChange}
						value={name}
						variant='outlined'
					/>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							mt: 2,
						}}>
						<Button color='primary' onClick={handleAddCancel} variant='text'>
							Cancel
						</Button>
						<Button
							color='primary'
							onClick={handleAddConfirm}
							variant='contained'>
							Add
						</Button>
					</Box>
				</>
			) : (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
					}}>
					<Button color='primary' onClick={handleAddInit} variant='text'>
						Add Card
					</Button>
				</Box>
			)}
		</div>
	)
}

KanbanCardAdd.propTypes = {
	columnId: PropTypes.string.isRequired,
}

export default KanbanCardAdd
