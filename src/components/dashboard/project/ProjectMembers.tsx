import type { FC } from 'react'
import PropTypes from 'prop-types'
import {
	Avatar,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Divider,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from '@mui/material'
import type { ProjectMember } from '../../../types/project'
import getInitials from '../../../utils/getInitials'

interface ProjectMembersProps {
	members: ProjectMember[]
}

const ProjectMembers: FC<ProjectMembersProps> = (props) => {
	const { members, ...other } = props

	return (
		<Card {...other}>
			<CardHeader
				sx={{ pb: 0 }}
				title='Project members'
				titleTypographyProps={{ variant: 'overline' }}
			/>
			<CardContent sx={{ pt: 0 }}>
				<List>
					{members.map((member) => (
						<ListItem disableGutters key={member.id}>
							<ListItemAvatar>
								<Avatar src={member.avatar}>{getInitials(member.name)}</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={
									<Typography color='textPrimary' variant='subtitle2'>
										{member.name}
									</Typography>
								}
								secondary={
									<Typography color='textSecondary' variant='body2'>
										{member.job}
									</Typography>
								}
							/>
						</ListItem>
					))}
				</List>
			</CardContent>
			<Divider />
			<CardActions>
				<Button color='primary' fullWidth variant='text'>
					Manage members
				</Button>
			</CardActions>
		</Card>
	)
}

ProjectMembers.propTypes = {
	members: PropTypes.array.isRequired,
}

export default ProjectMembers
