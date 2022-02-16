import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import BrightLogo from "assets/health/bright-logo.png"
import Ambetter from "assets/health/ambetter-logo.png"
import Friday from "assets/health/friday-logo.png"
import FloridaBlue from "assets/health/florida-blue-logo.png"
import Molina from "assets/health/molina-logo.png"
import Oscar from "assets/health/oscar-logo.png"
import AvMed from "assets/health/avmed-logo.png"
import AvMedLight from "assets/health/avmed-logo-light.png"
import BCBS from "assets/health/bcbs-logo.png"
import Aetna from "assets/health/aetna-logo.png"
import Cigna from "assets/health/cigna-logo.png"
import United from "assets/health/united-logo.png"
import PolicyIcon from "@mui/icons-material/Policy"
import { FC } from "react"
import { useTheme } from "@mui/material/styles"

interface CarrierSiteButtonProps {
    health: any
}

const CarrierBadge: FC<CarrierSiteButtonProps> = ({ health }) => {
    const theme = useTheme()

    return (
        <Box display={"flex"}>
            {(() => {
                switch (health.policyCarrier) {
                    case "Aetna":
                        return (
                            <img
                                src={Aetna}
                                alt="Company Logo"
                                height={"30px"}
                            />
                        )
                    case "Ambetter":
                        return (
                            <img
                                src={Ambetter}
                                alt="Company Logo"
                                height={"30px"}
                            />
                        )
                    case "AvMed":
                        return theme.palette.mode === "dark" ? (
                            <img
                                src={AvMedLight}
                                alt="Company Logo"
                                height={"30px"}
                            />
                        ) : (
                            <img
                                src={AvMed}
                                alt="Company Logo"
                                height={"30px"}
                            />
                        )
                    case "BCBS":
                        return (
                            <img
                                src={BCBS}
                                alt="Company Logo"
                                height={"30px"}
                            />
                        )
                    case "Bright Healthcare":
                        return (
                            <img
                                src={BrightLogo}
                                alt="Company Logo"
                                height={"30px"}
                            />
                        )

                    case "Cigna":
                        return (
                            <img
                                src={Cigna}
                                alt="Company Logo"
                                height={"30px"}
                            />
                        )

                    case "Molina Healthcare":
                        return (
                            <img
                                src={Molina}
                                alt="Company Logo"
                                height={"30px"}
                            />
                        )
                    case "Oscar Health":
                        return (
                            <img
                                src={Oscar}
                                alt="Company Logo"
                                height={"30px"}
                            />
                        )
                    case "Florida Blue":
                        return (
                            <img
                                src={FloridaBlue}
                                alt="Company Logo"
                                height={"30px"}
                            />
                        )
                    case "Friday Health":
                        return (
                            <img
                                src={Friday}
                                alt="Company Logo"
                                height={"30px"}
                            />
                        )
                    case "United Healthcare":
                        return (
                            <img
                                src={United}
                                alt="Company Logo"
                                height={"30px"}
                            />
                        )

                    default:
                        return <PolicyIcon color="primary" fontSize="small" />
                }
            })()}
            <Typography variant="h6" ml={1}>
                {health.policyCarrier}
            </Typography>
        </Box>
    )
}

export default CarrierBadge
