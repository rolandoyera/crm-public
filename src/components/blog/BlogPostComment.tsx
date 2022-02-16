import { useState } from 'react'
import type { FC } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import {
	Avatar,
	Box,
	IconButton,
	Paper,
	Tooltip,
	Typography,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

interface BlogPostCommentProps {
	authorAvatar: string
	authorName: string
	authorRole: string
	content: string
	createdAt: number
	isLiked: boolean
	likes: number
}

const BlogPostComment: FC<BlogPostCommentProps> = (props) => {
	const {
		authorAvatar,
		authorName,
		authorRole,
		content,
		createdAt,
		isLiked: isLikedProp,
		likes: likesProp,
		...other
	} = props
	const [isLiked, setIsLiked] = useState<boolean>(isLikedProp)
	const [likes, setLikes] = useState<number>(likesProp)

	const handleLike = (): void => {
		setIsLiked(true)
		setLikes((prevLikes) => prevLikes + 1)
	}

	const handleUnlike = (): void => {
		setIsLiked(false)
		setLikes((prevLikes) => prevLikes - 1)
	}

	return (
		<Box
			sx={{
				display: 'flex',
				pb: 3,
			}}
			{...other}>
			<Avatar src={authorAvatar} />
			<Paper
				sx={{
					ml: 3,
					pl: 1.5,
					pr: 4.5,
					py: 1.5,
					width: '100%',
				}}
				variant='outlined'>
				<Box
					sx={{
						alignItems: 'flex-start',
						display: 'flex',
						justifyContent: 'space-between',
					}}>
					<div>
						<Typography color='textPrimary' variant='subtitle2'>
							{authorName}
						</Typography>
						<Typography color='textSecondary' variant='caption'>
							{authorRole}
						</Typography>
					</div>
					<Typography color='textSecondary' variant='caption'>
						{formatDistanceToNow(createdAt, { addSuffix: true })}
					</Typography>
				</Box>
				<Typography color='textPrimary' variant='body2'>
					{content}
				</Typography>
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
						mt: 2,
					}}>
					{isLiked ? (
						<Tooltip title='Unlike'>
							<IconButton
								onClick={handleUnlike}
								size='small'
								sx={{ color: 'secondary.main' }}>
								<FavoriteIcon fontSize='small' />
							</IconButton>
						</Tooltip>
					) : (
						<Tooltip title='Like'>
							<IconButton onClick={handleLike} size='small'>
								<FavoriteBorderIcon fontSize='small' />
							</IconButton>
						</Tooltip>
					)}
					<Typography color='textSecondary' variant='subtitle2'>
						{likes}
					</Typography>
				</Box>
			</Paper>
		</Box>
	)
}

BlogPostComment.propTypes = {
	authorAvatar: PropTypes.string.isRequired,
	authorName: PropTypes.string.isRequired,
	authorRole: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	createdAt: PropTypes.number.isRequired,
	isLiked: PropTypes.bool.isRequired,
	likes: PropTypes.number.isRequired,
}

export default BlogPostComment
