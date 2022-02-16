import { useState } from 'react'
import type { ChangeEvent, FC, KeyboardEvent } from 'react'
import {
	Box,
	Card,
	Checkbox,
	Chip,
	Divider,
	FormControlLabel,
	Input,
} from '@mui/material'
import SearchIcon from '../../../icons/Search'
import MultiSelect from '../../MultiSelect'

const selectOptions = [
	{
		label: 'Type',
		options: ['Freelance', 'Full Time', 'Part Time', 'Internship'],
	},
	{
		label: 'Level',
		options: ['Novice', 'Expert'],
	},
	{
		label: 'Location',
		options: [
			'Africa',
			'Asia',
			'Australia',
			'Europe',
			'North America',
			'South America',
		],
	},
	{
		label: 'Roles',
		options: ['Android', 'Web Developer', 'iOS'],
	},
]

const ProjectBrowseFilter: FC = (props) => {
	const [inputValue, setInputValue] = useState<string>('')
	const [chips, setChips] = useState<string[]>([
		'Freelance',
		'Full Time',
		'Novice',
		'Europe',
		'Android',
		'Web Developer',
	])

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setInputValue(event.target.value)
	}

	const handleInputKeyup = (event: KeyboardEvent<HTMLInputElement>): void => {
		if (event.code === 'ENTER' && inputValue) {
			if (!chips.includes(inputValue)) {
				setChips((prevChips) => [...prevChips, inputValue])
				setInputValue('')
			}
		}
	}

	const handleChipDelete = (chip: string): void => {
		setChips((prevChips) => prevChips.filter((prevChip) => chip !== prevChip))
	}

	const handleMultiSelectChange = (value: string[]): void => {
		setChips(value)
	}

	return (
		<Card {...props}>
			<Box
				sx={{
					alignItems: 'center',
					display: 'flex',
					p: 2,
				}}>
				<SearchIcon fontSize='small' />
				<Box
					sx={{
						flexGrow: 1,
						ml: 3,
					}}>
					<Input
						disableUnderline
						fullWidth
						onChange={handleInputChange}
						onKeyUp={handleInputKeyup}
						placeholder='Enter a keyword'
						value={inputValue}
					/>
				</Box>
			</Box>
			<Divider />
			<Box
				sx={{
					alignItems: 'center',
					display: 'flex',
					flexWrap: 'wrap',
					p: 2,
				}}>
				{chips.map((chip) => (
					<Chip
						key={chip}
						label={chip}
						onDelete={(): void => handleChipDelete(chip)}
						sx={{ m: 1 }}
						variant='outlined'
					/>
				))}
			</Box>
			<Divider />
			<Box
				sx={{
					alignItems: 'center',
					display: 'flex',
					flexWrap: 'wrap',
					p: 1,
				}}>
				{selectOptions.map((option) => (
					<MultiSelect
						key={option.label}
						label={option.label}
						onChange={handleMultiSelectChange}
						options={option.options}
						value={chips}
					/>
				))}
				<Box sx={{ flexGrow: 1 }} />
				<FormControlLabel
					control={<Checkbox color='primary' defaultChecked />}
					label='In network'
				/>
			</Box>
		</Card>
	)
}

export default ProjectBrowseFilter
