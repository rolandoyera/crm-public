import merge from "lodash/merge"
import { createTheme, responsiveFontSizes } from "@mui/material/styles"
import type { Theme, ThemeOptions } from "@mui/material"
import { THEMES } from "../constants"
import { lightShadows, darkShadows } from "./shadows"

interface ThemeConfig {
    responsiveFontSizes?: boolean
    roundedCorners?: boolean
    theme?: string
}

const baseOptions: ThemeOptions = {
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1790,
        },
    },
    components: {
        MuiAvatar: {
            styleOverrides: {
                fallback: {
                    height: "75%",
                    width: "75%",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                },
            },
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    maxWidth: "1980px",
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: {
                "*": {
                    boxSizing: "border-box",
                },
                html: {
                    MozOsxFontSmoothing: "grayscale",
                    WebkitFontSmoothing: "antialiased",
                    height: "100%",
                    width: "100%",
                },
                body: {
                    height: "100%",
                },
                "#root": {
                    height: "100%",
                },
                "#nprogress .bar": {
                    zIndex: "2000 !important",
                },
            },
        },
        MuiCardHeader: {
            defaultProps: {
                titleTypographyProps: {
                    variant: "h6",
                },
            },
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    borderRadius: 3,
                    overflow: "hidden",
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    minWidth: "auto",
                    marginRight: "16px",
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                },
            },
        },
    },
    typography: {
        button: {
            fontWeight: 600,
        },
        fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
        h1: {
            fontWeight: 600,
            fontSize: "3.5rem",
        },
        h2: {
            fontWeight: 600,
            fontSize: "3rem",
        },
        h3: {
            fontWeight: 600,
            fontSize: "2.25rem",
        },
        h4: {
            fontWeight: 600,
            fontSize: "2rem",
        },
        h5: {
            fontWeight: 600,
            fontSize: "1.5rem",
        },
        h6: {
            fontWeight: 600,
            fontSize: "1.125rem",
        },
        overline: {
            fontWeight: 600,
        },
        subtitle1: {
            fontSize: ".9rem",
            lineHeight: 1.57,
            fontWeight: 400,
        },
        subtitle2: {
            fontSize: ".9rem",
        },
    },
}

const themesOptions: Record<string, ThemeOptions> = {
    [THEMES.LIGHT]: {
        components: {
            MuiInputBase: {
                styleOverrides: {
                    input: {
                        "&::placeholder": {
                            opacity: 0.86,
                            color: "#42526e",
                        },
                    },
                },
            },
            MuiBottomNavigation: {
                styleOverrides: {
                    root: {
                        backgroundColor: "#f4f5f7",
                    },
                },
            },
        },
        palette: {
            action: {
                active: "#6b778c",
            },
            background: {
                default: "#f4f5f7",
                paper: "#ffffff",
            },
            error: {
                contrastText: "#ffffff",
                main: "#f44336",
            },
            mode: "light",
            primary: {
                contrastText: "#ffffff",
                main: "#1857cd",
            },
            secondary: {
                contrastText: "#ffffff",
                main: "#9B61F8",
                dark: "#8138f5",
            },
            success: {
                contrastText: "#ffffff",
                main: "#4caf50",
            },
            text: {
                primary: "#172b4d",
                secondary: "#6b778c",
            },
            warning: {
                contrastText: "#ffffff",
                main: "#ff9800",
            },
            info: {
                main: "#f4f5f7",
            },
        },
        shadows: lightShadows,
    },
    [THEMES.DARK]: {
        components: {
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        borderBottom: "1px solid rgba(145, 158, 171, 0.24)",
                    },
                },
            },
            MuiBottomNavigation: {
                styleOverrides: {
                    root: {
                        backgroundColor: "hsl(229, 32%, 6%)",
                    },
                },
            },
        },
        palette: {
            background: {
                default: "hsl(229, 32%, 5%)",
                paper: "hsl(229, 33%, 14%)",
            },
            divider: "rgba(145, 158, 171, 0.2)",
            error: {
                contrastText: "#ffffff",
                main: "#f44336",
            },
            mode: "dark",
            primary: {
                contrastText: "#ffffff",
                main: "#5479ff",
            },
            secondary: {
                contrastText: "#ffffff",
                main: "#9B61F8",
                dark: "#8138f5",
            },
            success: {
                contrastText: "#ffffff",
                main: "#4caf50",
            },
            text: {
                primary: "#ffffff",
                secondary: "#919eab",
            },
            warning: {
                contrastText: "#ffffff",
                main: "#ff9800",
            },
            info: {
                main: "#0c0e12",
            },
        },
        shadows: darkShadows,
    },
}

export const createCustomTheme = (config: ThemeConfig = {}): Theme => {
    let themeOptions = themesOptions[config.theme]

    if (!themeOptions) {
        console.warn(new Error(`The theme ${config.theme} is not valid`))
        themeOptions = themesOptions[THEMES.LIGHT]
    }

    let theme = createTheme(
        merge({}, baseOptions, themeOptions, {
            ...(config.roundedCorners && {
                shape: {
                    borderRadius: 16,
                },
            }),
        })
    )

    if (config.responsiveFontSizes) {
        theme = responsiveFontSizes(theme)
    }

    return theme
}
