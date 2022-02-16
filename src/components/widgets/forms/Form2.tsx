import { useState } from 'react'
import type { FC } from 'react'
import {
	Box,
	Checkbox,
	Chip,
	Divider,
	FormControlLabel,
	Input,
} from '@mui/material'
import MultiSelect from '../../MultiSelect'
import SearchIcon from '../../../icons/Search'

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

const Form2: FC = () => {
	const [chips, setChips] = useState<string[]>([
		'Freelance',
		'Full Time',
		'Novice',
		'Europe',
		'Android',
		'Web Developer',
	])

	const handleChipDelete = (chip: string): void => {
		setChips((prevChips) => prevChips.filter((prevChip) => chip !== prevChip))
	}

	const handleMultiSelectChange = (value: string[]): void => {
		setChips(value)
	}

	return (
		<Box
			sx={{
				backgroundColor: 'background.paper',
				color: 'text.primary',
				minHeight: '100%',
				p: 3,
			}}>
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
					<Input disableUnderline fullWidth placeholder='Enter a keyword' />
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
		</Box>
	)
}

export default Form2
