import { useEffect } from 'react'
import type { FC, MutableRefObject } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { Box, Button, Divider, Drawer, List } from '@mui/material'
import type { Theme } from '@mui/material'
import { experimentalStyled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useDispatch, useSelector } from '../../../store'
import { closeSidebar, openCompose } from '../../../slices/mail'

interface MailSidebarProps {
	containerRef: MutableRefObject<HTMLDivElement>
}

const MailSidebarDesktop = experimentalStyled(Drawer)({
	width: 280,
	'& .MuiDrawer-paper': {
		position: 'relative',
	},
})

const MailSidebarMobile = experimentalStyled(Drawer)({
	'& .MuiBackdrop-root': {
		position: 'absolute',
	},
	'& .MuiDrawer-paper': {
		position: 'relative',
		width: 280,
	},
})

const MailSidebar: FC<MailSidebarProps> = ({ containerRef }) => {
	const dispatch = useDispatch()
	const location = useLocation()
	const { isSidebarOpen } = useSelector((state) => state.mail)
	const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

	useEffect(() => {
		if (isSidebarOpen) {
			dispatch(closeSidebar())
		}
	}, [dispatch, isSidebarOpen, location.pathname])

	const handleCloseSidebar = (): void => {
		dispatch(closeSidebar())
	}

	const handleComposeClick = (): void => {
		dispatch(openCompose())
	}

	const content = (
		<div>
			<Box
				sx={{
					px: 3,
					py: 2,
				}}>
				<Button
					color='primary'
					fullWidth
					onClick={handleComposeClick}
					variant='contained'>
					Compose
				</Button>
			</Box>
			<Divider />
			<Box
				sx={{
					py: 2,
					pr: 2,
				}}>
				<List></List>
			</Box>
		</div>
	)

	if (mdUp) {
		return (
			<MailSidebarDesktop variant='permanent'>{content}</MailSidebarDesktop>
		)
	}

	return (
		<MailSidebarMobile
			ModalProps={{ container: () => containerRef.current }}
			onClose={handleCloseSidebar}
			open={isSidebarOpen}
			variant='temporary'>
			{content}
		</MailSidebarMobile>
	)
}

MailSidebar.propTypes = {
	containerRef: PropTypes.any.isRequired,
}

export default MailSidebar
