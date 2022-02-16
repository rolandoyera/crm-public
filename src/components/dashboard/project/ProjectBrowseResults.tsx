import { useRef, useState } from 'react'
import type { FC } from 'react'
import PropTypes from 'prop-types'
import {
	Box,
	Button,
	Grid,
	ListItemText,
	Menu,
	MenuItem,
	Pagination,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from '@mui/material'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import type { Project } from '../../../types/project'
import ProjectCard from './ProjectCard'

interface ProjectBrowseResultsProps {
	projects: Project[]
}

const ProjectBrowseResults: FC<ProjectBrowseResultsProps> = (props) => {
	const { projects, ...other } = props
	const sortRef = useRef<HTMLButtonElement | null>(null)
	const [openSort, setOpenSort] = useState<boolean>(false)
	const [selectedSort, setSelectedSort] = useState<string>('Most popular')
	const [mode, setMode] = useState<string>('grid')

	const handleSortOpen = (): void => {
		setOpenSort(true)
	}

	const handleSortClose = (): void => {
		setOpenSort(false)
	}

	const handleSortSelect = (value: string): void => {
		setSelectedSort(value)
		setOpenSort(false)
	}

	const handleModeChange = (event: any, value: string): void => {
		setMode(value)
	}

	return (
		<div {...other}>
			<Box
				sx={{
					alignItems: 'center',
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'space-between',
					mb: 2,
				}}>
				<Typography
					color='textPrimary'
					sx={{
						position: 'relative',
						'&:after': {
							backgroundColor: 'primary.main',
							bottom: '-8px',
							content: '" "',
							height: '3px',
							left: 0,
							position: 'absolute',
							width: '48px',
						},
					}}
					variant='h5'>
					Showing {projects.length} projects
				</Typography>
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
					}}>
					<Button
						color='primary'
						onClick={handleSortOpen}
						ref={sortRef}
						sx={{
							textTransform: 'none',
							letterSpacing: 0,
							mr: 2,
						}}
						variant='text'>
						{selectedSort}
						<ArrowDropDownIcon fontSize='small' />
					</Button>
					<ToggleButtonGroup
						exclusive
						onChange={handleModeChange}
						size='small'
						value={mode}>
						<ToggleButton value='grid'>
							<ViewModuleIcon fontSize='small' />
						</ToggleButton>
					</ToggleButtonGroup>
				</Box>
			</Box>
			<Grid container spacing={3}>
				{projects.map((project) => (
					<Grid
						item
						key={project.id}
						md={mode === 'grid' ? 4 : 12}
						sm={mode === 'grid' ? 6 : 12}
						xs={12}>
						<ProjectCard project={project} />
					</Grid>
				))}
			</Grid>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					mt: 6,
				}}>
				<Pagination count={3} />
			</Box>
			<Menu
				anchorEl={sortRef.current}
				elevation={1}
				onClose={handleSortClose}
				open={openSort}>
				{['Most recent', 'Popular', 'Price high', 'Price low', 'On sale'].map(
					(option) => (
						<MenuItem
							key={option}
							onClick={(): void => handleSortSelect(option)}>
							<ListItemText primary={option} />
						</MenuItem>
					)
				)}
			</Menu>
		</div>
	)
}

ProjectBrowseResults.propTypes = {
	projects: PropTypes.array.isRequired,
}

export default ProjectBrowseResults
