import { useState } from 'react'
import type { FC } from 'react'
import { Box, Button, FormHelperText } from '@mui/material'
import useAuth from '../../../hooks/useAuth'
import useMounted from '../../../hooks/useMounted'

const LoginAuth0: FC = (props) => {
	const mounted = useMounted()
	const { loginWithPopup } = useAuth() as any
	const [error, setError] = useState<string | null>(null)

	const handleLogin = async (): Promise<void> => {
		try {
			await loginWithPopup()
		} catch (err) {
			console.error(err)
			if (mounted.current) {
				setError(err.message)
			}
		}
	}

	return (
		<div {...props}>
			{error && (
				<Box sx={{ my: 3 }}>
					<FormHelperText error>{error}</FormHelperText>
				</Box>
			)}
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
				}}>
				<Button color='primary' onClick={handleLogin} variant='contained'>
					Log In
				</Button>
			</Box>
		</div>
	)
}

export default LoginAuth0
