import type { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { experimentalStyled } from '@mui/material/styles'
import BlogNavbar from './BlogNavbar'
import Footer from '../Footer'

const BlogLayoutRoot = experimentalStyled('div')(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	height: '100%',
	paddingTop: 64,
}))

const BlogLayout: FC = () => (
	<BlogLayoutRoot>
		<BlogNavbar />
		<Outlet />
		<Footer />
	</BlogLayoutRoot>
)

export default BlogLayout
