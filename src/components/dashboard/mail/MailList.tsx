import { useEffect, useState } from 'react'
import type { FC } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Divider } from '@mui/material'
import { getEmails } from '../../../slices/mail'
import { useDispatch, useSelector } from '../../../store'
import MailItem from './MailItem'
import MailListToolbar from './MailListToolbar'

const MailList: FC = (props) => {
	const dispatch = useDispatch()
	const { customLabel, systemLabel } = useParams()
	const { emails } = useSelector((state) => state.mail)
	const [selectedEmails, setSelectedEmails] = useState<string[]>([])

	useEffect(() => {
		dispatch(getEmails({ customLabel, systemLabel }))
	}, [dispatch, customLabel, systemLabel])

	const handleSelectAllEmails = (): void => {
		setSelectedEmails(emails.allIds.map((emailId) => emailId))
	}

	const handleDeselectAllEmails = (): void => {
		setSelectedEmails([])
	}

	const handleSelectOneEmail = (emailId: string): void => {
		setSelectedEmails((prevSelectedMails) => {
			if (!prevSelectedMails.includes(emailId)) {
				return [...prevSelectedMails, emailId]
			}

			return prevSelectedMails
		})
	}

	const handleDeselectOneEmail = (emailId: string): void => {
		setSelectedEmails((prevSelectedMails) =>
			prevSelectedMails.filter((id) => id !== emailId)
		)
	}

	return (
		<Box
			sx={{
				backgroundColor: 'background.default',
				flexGrow: 1,
				overflow: 'hidden',
			}}
			{...props}>
			<MailListToolbar
				emails={emails.allIds.length}
				onDeselectAll={handleDeselectAllEmails}
				onSelectAll={handleSelectAllEmails}
				selectedEmails={selectedEmails.length}
			/>
			<Divider />
			{emails.allIds.map((emailId: string) => (
				<MailItem
					email={emails.byId[emailId]}
					key={emailId}
					onDeselect={(): void => handleDeselectOneEmail(emailId)}
					onSelect={(): void => handleSelectOneEmail(emailId)}
					selected={selectedEmails.includes(emailId)}
				/>
			))}
		</Box>
	)
}

export default MailList
