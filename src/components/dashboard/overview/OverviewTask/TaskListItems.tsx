import { Link as RouterLink } from "react-router-dom"
import Box from "@mui/material/Box"
import ListItem from "@mui/material/ListItem"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemText from "@mui/material/ListItemText"
import Link from "@mui/material/Link"
import Checkbox from "@mui/material/Checkbox"
import Typography from "@mui/material/Typography"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked"
import { subHours, formatDistance } from "date-fns"
import ClockIcon from "icons/Clock"
import { useEffect, useState } from "react"
import { Tooltip } from "@mui/material"

const TaskListItems = (props) => {
    const { isChecked, checkItem, waitToDelete } = props
    const [pastDueCss, setPastDueCss] = useState("text.secondary")
    const [pastDueClass, setPastDueClass] = useState("")
    const [pastDueText, setPastDueText] = useState("Due")
    const [isItNow, setIsItNow] = useState(new Date())
    useEffect(() => {
        const CheckTime = setInterval(() => {
            setIsItNow(new Date())
            if (new Date() > new Date(checkItem?.completeBy?.seconds * 1000)) {
                setPastDueCss("error.main")
                setPastDueClass("past-due")
                setPastDueText("Past Due")
            } else if (
                new Date() >
                new Date(checkItem?.completeBy?.seconds * 1000 - 3600000)
            ) {
                setPastDueCss("warning.main")
                setPastDueClass("past-due")
                setPastDueText("Almost Due")
            } else {
                setPastDueCss("text.secondary")
                setPastDueClass("")
                setPastDueText("Due")
            }
        }, 1000)
        return () => clearInterval(CheckTime)
    }, [checkItem?.completeBy?.seconds])

    return (
        <ListItem
            divider={true}
            sx={{
                height: {
                    xs: 160,
                    sm: 80,
                },
                px: 1,
                display: "flex",
                flexDirection: {
                    xs: "column",
                    sm: "row",
                },
                alignItems: {
                    xs: "center",
                },
                justifyContent: "space-between",
            }}
        >
            <ListItemAvatar
                sx={{
                    pl: {
                        xs: 1,
                        sm: 0,
                    },
                }}
            >
                {(() => {
                    switch (checkItem.priority) {
                        case "":
                            return (
                                <Checkbox
                                    checked={
                                        isChecked === checkItem.checkItemId
                                    }
                                    onChange={(e) => {
                                        e.stopPropagation()
                                        waitToDelete(e, checkItem)
                                    }}
                                    icon={<RadioButtonUncheckedIcon />}
                                    checkedIcon={<RadioButtonCheckedIcon />}
                                    sx={{
                                        borderRadius: "50px",
                                        color: "primary.main",
                                        "&.Mui-checked": {
                                            color: "primary.main",
                                        },
                                    }}
                                />
                            )
                        case "1":
                            return (
                                <Checkbox
                                    checked={
                                        isChecked === checkItem.checkItemId
                                    }
                                    onChange={(e) => {
                                        e.stopPropagation()
                                        waitToDelete(e, checkItem)
                                    }}
                                    icon={<RadioButtonUncheckedIcon />}
                                    checkedIcon={<RadioButtonCheckedIcon />}
                                    sx={{
                                        mr: 1,
                                        borderRadius: "50px",
                                        color: "primary.main",
                                        "&.Mui-checked": {
                                            color: "primary.main",
                                        },
                                    }}
                                />
                            )
                        case "2":
                            return (
                                <Checkbox
                                    checked={
                                        isChecked === checkItem.checkItemId
                                    }
                                    onChange={(e) => waitToDelete(e, checkItem)}
                                    icon={<RadioButtonUncheckedIcon />}
                                    checkedIcon={<RadioButtonCheckedIcon />}
                                    sx={{
                                        mr: 1,
                                        borderRadius: "50px",
                                        color: "warning.main",
                                        "&.Mui-checked": {
                                            color: "warning.main",
                                        },
                                    }}
                                />
                            )
                        case "3":
                            return (
                                <Checkbox
                                    checked={
                                        isChecked === checkItem.checkItemId
                                    }
                                    onChange={(e) => waitToDelete(e, checkItem)}
                                    icon={<RadioButtonUncheckedIcon />}
                                    checkedIcon={<RadioButtonCheckedIcon />}
                                    sx={{
                                        mr: 1,
                                        borderRadius: "50px",
                                        color: "error.main",
                                        "&.Mui-checked": {
                                            color: "error.main",
                                        },
                                    }}
                                />
                            )
                        default:
                            return null
                    }
                })()}
            </ListItemAvatar>
            <ListItemText>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: {
                            xs: "center",
                            sm: "unset",
                        },
                    }}
                >
                    <Box sx={{ mb: 0.4 }}>
                        <Link
                            color="inherit"
                            component={RouterLink}
                            to={`/dashboard/customers/${checkItem.customerId}`}
                            variant="subtitle2"
                        >
                            {checkItem.holderFirstName +
                                " " +
                                checkItem.holderLastName}
                        </Link>
                    </Box>
                    <Tooltip title={checkItem.name}>
                        <Typography
                            color="textSecondary"
                            variant="caption"
                            sx={{
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                maxWidth: {
                                    xs: "20em",
                                    sm: "20em",
                                },
                                pr: 1,
                                cursor: "pointer",
                            }}
                        >
                            {checkItem.name}
                        </Typography>
                    </Tooltip>
                </Box>
            </ListItemText>
            <ListItemText>
                <Box
                    sx={{
                        alignItems: "flex-end",
                        display: "flex",
                        height: "100%",
                        justifyContent: "right",
                    }}
                >
                    <Box
                        sx={{
                            alignItems: "center",
                            display: "flex",
                            justifyContent: "right",
                        }}
                    >
                        {checkItem?.completeBy ? (
                            <>
                                <Box
                                    sx={{
                                        position: "relative",
                                        width: "12px",
                                        height: "12px",
                                        marginTop: "0px",
                                    }}
                                    className={`${pastDueClass}`}
                                >
                                    <ClockIcon
                                        sx={{
                                            color: `${pastDueCss}`,
                                            fontSize: "1rem",
                                            position: "absolute",
                                            top: -2,
                                            left: -2,
                                        }}
                                    />
                                </Box>
                                <Typography
                                    color="textSecondary"
                                    variant="caption"
                                    sx={{ ml: 1 }}
                                >
                                    {pastDueText}:{" "}
                                    {formatDistance(
                                        subHours(
                                            new Date(
                                                checkItem?.completeBy.seconds *
                                                    1000
                                            ),
                                            0
                                        ),
                                        new Date(isItNow),
                                        {
                                            addSuffix: true,
                                        }
                                    )}
                                </Typography>
                            </>
                        ) : (
                            <Typography color="textSecondary" variant="caption">
                                Not Scheduled
                            </Typography>
                        )}
                    </Box>
                </Box>
            </ListItemText>
        </ListItem>
    )
}

export default TaskListItems
