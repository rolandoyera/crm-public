import type { FC } from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import type { ProjectApplicant } from '../../../types/project'
import ProjectApplicantCard from './ProjectApplicantCard'

interface ProjectApplicantsProps {
	applicants: ProjectApplicant[]
}

const ProjectApplicants: FC<ProjectApplicantsProps> = (props) => {
	const { applicants, ...other } = props

	return (
		<Grid container spacing={3} {...other}>
			{applicants.map((applicant) => (
				<Grid item key={applicant.id} lg={4} xs={12}>
					<ProjectApplicantCard
						avatar={applicant.avatar}
						cover={applicant.cover}
						name={applicant.name}
						skills={applicant.skills}
					/>
				</Grid>
			))}
		</Grid>
	)
}

ProjectApplicants.propTypes = {
	applicants: PropTypes.array.isRequired,
}

export default ProjectApplicants
