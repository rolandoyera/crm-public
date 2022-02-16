import { useEffect } from 'react'
import type { FC } from 'react'
import { Helmet } from 'react-helmet-async'
import { Box } from '@mui/material'
import { ChatSidebar, ChatThread } from '../../components/dashboard/chat'
import { getThreads } from '../../slices/chat'
import { useDispatch } from '../../store'
import { CRM } from 'lib/constants'

const Chat: FC = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getThreads())
	}, [dispatch])

	return (
		<>
			<Helmet>
				<title>Dashboard: Chat | {CRM.name}</title>
			</Helmet>
			<Box
				sx={{
					backgroundColor: 'background.default',
					display: 'flex',
					height: '100%',
				}}>
				<ChatSidebar />
				<ChatThread />
			</Box>
		</>
	)
}

export default Chat
