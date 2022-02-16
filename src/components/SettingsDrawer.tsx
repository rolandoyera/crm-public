import { useEffect, useState } from "react"
import type { FC } from "react"
import Box from "@mui/material/Box"
import Tooltip from "@mui/material/Tooltip"
import Fab from "@mui/material/Fab"
import IconButton from "@mui/material/IconButton"
import Drawer from "@mui/material/Drawer"
import Checkbox from "@mui/material/Checkbox"
import Button from "@mui/material/Button"
import LightTheme from "components/light-theme"
import DarkTheme from "components/dark-theme"
import useSettings from "../hooks/useSettings"
import Typography from "@mui/material/Typography"
import AdjustmentsIcon from "../icons/Adjustments"
import FormControlLabel from "@mui/material/FormControlLabel"
import XIcon from "icons/X"

const getValues = (settings) => ({
    responsiveFontSizes: settings.responsiveFontSizes,
    roundedCorners: settings.roundedCorners,
    theme: settings.theme,
})

const SettingsDrawer: FC = ({ ...other }) => {
    const { settings, saveSettings } = useSettings()
    const [open, setOpen] = useState<boolean>(false)
    const [values, setValues] = useState(getValues(settings))

    useEffect(() => {
        setValues(getValues(settings))
    }, [settings])

    const handleOpen = (): void => {
        setOpen(true)
    }
    const themes = [
        {
            label: "Light",
            value: "LIGHT",
            icon: LightTheme,
        },
        {
            label: "Dark",
            value: "DARK",
            icon: DarkTheme,
        },
    ]

    const handleClose = (): void => {
        setOpen(false)
    }

    const handleChange = (field, value): void => {
        setValues({
            ...values,
            [field]: value,
        })
    }

    const handleSave = (): void => {
        saveSettings(values)
        setOpen(false)
    }

    return (
        <>
            <Tooltip title="Settings">
                <Fab
                    color="primary"
                    onClick={handleOpen}
                    size="medium"
                    sx={{
                        bottom: 0,
                        margin: (theme) => theme.spacing(1.5),
                        position: "fixed",
                        right: 8,
                        zIndex: (theme) => theme.zIndex.speedDial,
                    }}
                >
                    <AdjustmentsIcon fontSize="small" />
                </Fab>
            </Tooltip>
            <Drawer
                anchor="right"
                onClose={handleClose}
                open={open}
                ModalProps={{ sx: { zIndex: 2000 } }}
                PaperProps={{ sx: { width: 320 } }}
                {...other}
            >
                <Box
                    sx={{
                        alignItems: "center",
                        backgroundColor: "primary.main",
                        color: "primary.contrastText",
                        display: "flex",
                        justifyContent: "space-between",
                        px: 3,
                        py: 2,
                    }}
                >
                    <Typography color="inherit" variant="h6">
                        Site settings
                    </Typography>
                    <IconButton color="inherit" onClick={handleClose}>
                        <XIcon fontSize="small" />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        py: 4,
                        px: 3,
                    }}
                >
                    <Typography
                        color="textSecondary"
                        sx={{
                            display: "block",
                            mb: 1,
                        }}
                        variant="overline"
                    >
                        Color Scheme
                    </Typography>
                    <Box
                        sx={{
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column",
                            m: -1,
                        }}
                    >
                        {themes.map((theme) => {
                            const { label, icon: Icon, value } = theme

                            return (
                                <div key={value}>
                                    <Box
                                        onClick={() =>
                                            handleChange("theme", value)
                                        }
                                        sx={{
                                            borderColor:
                                                values.theme === value
                                                    ? "primary.main"
                                                    : "divider",
                                            borderRadius: 1,
                                            borderStyle: "solid",
                                            borderWidth: 2,
                                            cursor: "pointer",
                                            flexGrow: 1,
                                            fontSize: 0,
                                            m: 1,
                                            overflow: "hidden",
                                            p: 1,
                                            "& svg": {
                                                height: "auto",
                                                width: "100%",
                                            },
                                        }}
                                    >
                                        <Icon />
                                    </Box>
                                    <Typography
                                        align="center"
                                        sx={{ mt: 1 }}
                                        variant="subtitle2"
                                    >
                                        {label}
                                    </Typography>
                                </div>
                            )
                        })}
                    </Box>
                    <Typography
                        color="textSecondary"
                        sx={{
                            display: "block",
                            mb: 1,
                            mt: 4,
                        }}
                        variant="overline"
                    >
                        Settings
                    </Typography>

                    <div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={values.responsiveFontSizes}
                                    name="direction"
                                    onChange={(event): void =>
                                        handleChange(
                                            "responsiveFontSizes",
                                            event.target.checked
                                        )
                                    }
                                />
                            }
                            label={
                                <Typography variant="subtitle2">
                                    Responsive font sizes
                                </Typography>
                            }
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={values.roundedCorners}
                                    name="roundedCorners"
                                    onChange={(event): void =>
                                        handleChange(
                                            "roundedCorners",
                                            event.target.checked
                                        )
                                    }
                                />
                            }
                            label={
                                <Typography variant="subtitle2">
                                    Rounded Corners
                                </Typography>
                            }
                        />
                    </div>
                    <Button
                        color="primary"
                        fullWidth
                        onClick={handleSave}
                        sx={{ mt: 3 }}
                        variant="contained"
                    >
                        Save Settings
                    </Button>
                </Box>
            </Drawer>
        </>
    )
}

export default SettingsDrawer
