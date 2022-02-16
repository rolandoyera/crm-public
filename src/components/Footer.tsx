import type { FC } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid"
import { alpha } from "@mui/material/styles"
import Logo from "./Logo"

const Footer: FC = (props) => (
    <Box
        sx={{
            backgroundColor: "background.default",
            pb: 6,
            pt: {
                md: 15,
                xs: 6,
            },
        }}
        {...props}
    >
        <Container maxWidth="lg">
            <Divider
                sx={{
                    borderColor: (theme) =>
                        alpha(theme.palette.primary.contrastText, 0.12),
                    my: 6,
                }}
            />
            <Grid
                container
                display={"flex"}
                alignItems={"flex-end"}
                justifyContent={"flex-start"}
            >
                <Grid
                    item
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                    xs={12}
                >
                    <Logo />
                    <Typography
                        color="textSecondary"
                        sx={{ mt: 1 }}
                        variant="caption"
                    >
                        © Rolando Yera.
                    </Typography>
                    <Typography color="textSecondary" variant="caption">
                        All Rights Reserved.
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    </Box>
)

export default Footer
