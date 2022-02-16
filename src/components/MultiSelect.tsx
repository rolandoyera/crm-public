import { useRef, useState } from 'react'
import type { ChangeEvent, FC } from 'react'
import PropTypes from 'prop-types'
import {
	Button,
	Checkbox,
	FormControlLabel,
	Menu,
	MenuItem,
} from '@mui/material'
import ChevronDownIcon from '../icons/ChevronDown'

interface MultiSelectProps {
	label: string
	onChange?: (value: string[]) => void
	options: any[]
	value: string[]
}

const MultiSelect: FC<MultiSelectProps> = (props) => {
	const { label, onChange, options, value, ...other } = props
	const anchorRef = useRef<HTMLButtonElement | null>(null)
	const [openMenu, setOpenMenu] = useState<boolean>(false)

	const handleMenuOpen = (): void => {
		setOpenMenu(true)
	}

	const handleMenuClose = (): void => {
		setOpenMenu(false)
	}

	const handleOptionToggle = (event: ChangeEvent<HTMLInputElement>): void => {
		let newValue = [...value]

		if (event.target.checked) {
			newValue.push(event.target.value)
		} else {
			newValue = newValue.filter((item) => item !== event.target.value)
		}

		if (onChange) {
			onChange(newValue)
		}
	}

	return (
		<>
			<Button
				color='inherit'
				endIcon={<ChevronDownIcon fontSize='small' />}
				onClick={handleMenuOpen}
				ref={anchorRef}
				variant='text'
				{...other}>
				{label}
			</Button>
			<Menu
				anchorEl={anchorRef.current}
				elevation={1}
				onClose={handleMenuClose}
				open={openMenu}
				PaperProps={{ style: { width: 250 } }}>
				{options.map((option) => (
					<MenuItem key={option}>
						<FormControlLabel
							control={
								<Checkbox
									checked={value.indexOf(option) > -1}
									color='primary'
									onChange={handleOptionToggle}
									value={option}
								/>
							}
							label={option}
						/>
					</MenuItem>
				))}
			</Menu>
		</>
	)
}

MultiSelect.propTypes = {
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	options: PropTypes.array.isRequired,
	value: PropTypes.array.isRequired,
}

export default MultiSelect
