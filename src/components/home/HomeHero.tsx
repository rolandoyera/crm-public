import { useState, useEffect } from "react"
import type { FC } from "react"
import { Link as RouterLink } from "react-router-dom"
import { Box, Button, Container, Skeleton, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { Company } from "lib/constants"
import CheckCircleIcon from "icons/CheckCircle"

const HomeHero: FC = (props) => {
    const theme = useTheme()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [image, setImage] = useState<string>("")

    useEffect(() => {
        ;(async () => {
            const response = await fetch(
                `/static/home/hero_${theme.palette.mode}-2.png`
            )
            const blob = await response.blob()

            setImage(URL.createObjectURL(blob))
            setIsLoading(false)
        })()
    }, [theme.palette.mode])

    return (
        <Box
            sx={{
                backgroundColor: "background.paper",
                pt: 6,
                overflow: "hidden",
            }}
            {...props}
        >
            <Container
                maxWidth="xl"
                sx={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",

                    px: {
                        md: "130px !important",
                    },
                }}
            >
                <Typography align="center" color="textPrimary" variant="h3">
                    {Company.name} CRM
                </Typography>
                <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                    sx={{ py: 1 }}
                >
                    {/* A professional crm that comes ready-to-use, without the
                    tears. */}
                </Typography>
                <Button
                    color="primary"
                    sx={{
                        my: {
                            xs: 4,
                        },
                    }}
                    component={RouterLink}
                    size="large"
                    to="/dashboard"
                    variant="contained"
                >
                    Get Started
                </Button>
                <Box
                    sx={{
                        alignItems: {
                            sm: "center",
                            xs: "flex-start",
                        },
                        display: "flex",
                        flexDirection: {
                            sm: "row",
                            xs: "column",
                        },
                        py: 3,
                        "& > div": {
                            p: {
                                sm: "0 10.5px",
                                xs: "10.5px 0",
                            },
                        },
                    }}
                >
                    <Typography color="textSecondary" variant="caption">
                        Available For:
                    </Typography>
                    {["Healthcare", "Automotive", "Retail"].map((item) => (
                        <Box
                            key={item}
                            sx={{
                                alignItems: "center",
                                display: "flex",
                            }}
                        >
                            <CheckCircleIcon
                                sx={{
                                    color: "success.light",
                                    mr: "10.5px",
                                }}
                            />
                            <Typography color="textPrimary" variant="subtitle2">
                                {item}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Container>
            <Container
                maxWidth="xl"
                sx={{
                    width: "100%",
                    px: {
                        md: 15,
                    },
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        pt: !isLoading && "52.13%",
                    }}
                >
                    {isLoading ? (
                        <Skeleton
                            sx={{
                                borderRadius: 1,
                                width: "100%",
                                pt: "52.13%",
                            }}
                            variant="rectangular"
                        />
                    ) : (
                        <img
                            alt="Hero"
                            src={image}
                            style={{
                                maxWidth: "100%",
                                zIndex: 20,
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                top: 0,
                            }}
                        />
                    )}
                    <img
                        alt="Shapes 1"
                        src="/static/home/shapes_1.svg"
                        style={{
                            left: "3%",
                            position: "absolute",
                            top: "-7.5%",
                            width: "20%",
                            maxWidth: "243.32px",
                            zIndex: 0,
                        }}
                    />
                    <img
                        alt="Shapes 2"
                        src="/static/home/shapes_2.svg"
                        style={{
                            bottom: 0,
                            position: "absolute",
                            right: "-8%",
                            width: "20%",
                            maxWidth: "195.32px",
                            zIndex: 30,
                        }}
                    />
                </Box>
            </Container>
        </Box>
    )
}

export default HomeHero
