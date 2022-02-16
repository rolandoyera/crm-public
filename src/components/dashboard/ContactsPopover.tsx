import { useRef, useState, useEffect } from 'react'
import type { FC } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'
import {
	Avatar,
	Box,
	IconButton,
	Link,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Popover,
	Tooltip,
	Typography,
} from '@mui/material'
import UsersIcon from '../../icons/Users'
import { getContacts } from '../../slices/chat'
import { useDispatch, useSelector } from '../../store'
import StatusIndicator from '../StatusIndicator'

const ContactsPopover: FC = () => {
	const dispatch = useDispatch()
	const anchorRef = useRef<HTMLButtonElement | null>(null)
	const { contacts } = useSelector((state) => state.chat)
	const [open, setOpen] = useState<boolean>(false)

	useEffect(() => {
		dispatch(getContacts())
		// eslint-disable-next-line
	}, [])

	const handleOpen = (): void => {
		setOpen(true)
	}

	const handleClose = (): void => {
		setOpen(false)
	}

	return (
		<>
			<Tooltip title='Contacts'>
				<IconButton color='inherit' onClick={handleOpen} ref={anchorRef}>
					<UsersIcon fontSize='small' />
				</IconButton>
			</Tooltip>
			<Popover
				anchorEl={anchorRef.current}
				anchorOrigin={{
					horizontal: 'center',
					vertical: 'bottom',
				}}
				onClose={handleClose}
				open={open}
				PaperProps={{
					sx: {
						p: 2,
						width: 320,
					},
				}}>
				<Typography color='textPrimary' variant='h6'>
					Contacts
				</Typography>
				<Box sx={{ mt: 2 }}>
					<List disablePadding>
						{contacts.allIds.map((contactId) => {
							const contact = contacts.byId[contactId]

							return (
								<ListItem disableGutters key={contact.id}>
									<ListItemAvatar>
										<Avatar src={contact.avatar} />
									</ListItemAvatar>
									<ListItemText
										disableTypography
										primary={
											<Link
												color='textPrimary'
												display='block'
												noWrap
												underline='none'
												variant='subtitle2'>
												{contact.name}
											</Link>
										}
									/>
									{contact.isActive ? (
										<StatusIndicator size='small' status='online' />
									) : (
										<Typography color='textSecondary' noWrap variant='caption'>
											{formatDistanceToNowStrict(contact.lastActivity)} ago
										</Typography>
									)}
								</ListItem>
							)
						})}
					</List>
				</Box>
			</Popover>
		</>
	)
}

export default ContactsPopover
