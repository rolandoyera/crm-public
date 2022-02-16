import { useState } from "react"
import type { FC } from "react"
import { Link as RouterLink } from "react-router-dom"
import { Lightbox } from "react-modal-image"
import PropTypes from "prop-types"
import { formatDistanceToNowStrict } from "date-fns"
import {
    Avatar,
    Box,
    Card,
    CardActionArea,
    CardHeader,
    CardMedia,
    Divider,
    IconButton,
    Link,
    Tooltip,
    Typography,
} from "@mui/material"
import red from "@mui/material/colors/red"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import ClockIcon from "icons/Clock"
import ShareIcon from "icons/Share"
import type { Comment } from "types/social"
import SocialPostComment from "./SocialPostComment"
import SocialPostCommentAdd from "./SocialPostCommentAdd"
import { firebaseAuth } from "lib/firebase"

interface SocialPostCardProps {
    authorAvatar: string
    authorName: string
    comments: Comment[]
    createdAt: number
    isLiked: boolean
    likes: number
    media?: string
    message: string
}

const SocialPostCard: FC<SocialPostCardProps> = (props) => {
    const {
        authorAvatar,
        authorName,
        comments,
        createdAt,
        isLiked: isLikedProp,
        likes: likesProp,
        media,
        message,
        ...other
    } = props
    const user = firebaseAuth.currentUser
    const [expandMedia, setExpandMedia] = useState<boolean>(false)
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
        <>
            <Card {...other}>
                <CardHeader
                    avatar={
                        <Avatar
                            component={RouterLink}
                            src={user.photoURL}
                            to="#"
                        />
                    }
                    disableTypography
                    subheader={
                        <Box
                            sx={{
                                alignItems: "center",
                                display: "flex",
                                mt: 1,
                            }}
                        >
                            <ClockIcon
                                fontSize="small"
                                sx={{ color: "text.secondary" }}
                            />
                            <Typography
                                color="textSecondary"
                                sx={{ ml: "6px" }}
                                variant="caption"
                            >
                                {formatDistanceToNowStrict(createdAt)} ago
                            </Typography>
                        </Box>
                    }
                    title={
                        <Link
                            color="textPrimary"
                            component={RouterLink}
                            to="#"
                            variant="subtitle2"
                        >
                            {authorName}
                        </Link>
                    }
                />
                <Box
                    sx={{
                        pb: 2,
                        px: 3,
                    }}
                >
                    <Typography color="textPrimary" variant="body1">
                        {message}
                    </Typography>
                    {media && (
                        <Box sx={{ mt: 2 }}>
                            <CardActionArea
                                onClick={(): void => setExpandMedia(true)}
                            >
                                <CardMedia
                                    image={media}
                                    sx={{
                                        backgroundPosition: "top",
                                        height: 500,
                                    }}
                                />
                            </CardActionArea>
                        </Box>
                    )}
                    <Box
                        sx={{
                            alignItems: "center",
                            display: "flex",
                            mt: 2,
                        }}
                    >
                        {isLiked ? (
                            <Tooltip title="Unlike">
                                <IconButton
                                    onClick={handleUnlike}
                                    sx={{ color: red["600"] }}
                                >
                                    <FavoriteIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Tooltip title="Like">
                                <IconButton onClick={handleLike}>
                                    <FavoriteBorderIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        )}
                        <Typography color="textSecondary" variant="subtitle2">
                            {likes}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <IconButton>
                            <ShareIcon fontSize="small" />
                        </IconButton>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    {comments.map((comment) => (
                        <SocialPostComment
                            authorAvatar={comment.author.avatar}
                            authorName={comment.author.name}
                            createdAt={comment.createdAt}
                            key={comment.id}
                            message={comment.message}
                        />
                    ))}
                    <Divider sx={{ my: 2 }} />
                    <SocialPostCommentAdd />
                </Box>
            </Card>
            {expandMedia && (
                <Lightbox
                    large={media}
                    onClose={(): void => setExpandMedia(false)}
                />
            )}
        </>
    )
}

SocialPostCard.propTypes = {
    authorAvatar: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    createdAt: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    likes: PropTypes.number.isRequired,
    media: PropTypes.string,
    message: PropTypes.string,
}

export default SocialPostCard
