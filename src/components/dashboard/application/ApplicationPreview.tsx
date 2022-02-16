import type { FC } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Scrollbar from "../../Scrollbar";
import CustomerSection from "./CustomerSection";
import SpouseSection from "./SpouseSection";
import TableHeaderSection from "./TableHeaderSection";
import PolicySection from "./PolicySection";
import { DependentsSection } from "./DependentsSection";

interface ApplicationPreviewProps {
    dependents?: any;
    customer?: any;
    policy?: any;
    hasHealthNote?: any;
}

const ApplicationPreview: FC<ApplicationPreviewProps> = ({
    customer,
    dependents,
    policy,
    hasHealthNote,
    ...props
}) => {
    return (
        <Paper {...props} sx={{ maxWidth: "774px", mx: "auto" }}>
            <Scrollbar>
                <Box
                    sx={{
                        minWidth: "774px",
                        padding: "3rem 35px",
                        minHeight: "990px",
                    }}
                >
                    <Grid container>
                        <Box>
                            <div
                                style={{
                                    margin: "0",
                                    fontSize: "11px",
                                }}
                            >
                                <table
                                    style={{
                                        width: "7.3in",
                                        borderCollapse: "collapse",
                                        border: 0,
                                    }}
                                >
                                    <thead>
                                        <tr>
                                            <td
                                                colSpan={6}
                                                style={{
                                                    width: "7.3in",

                                                    padding:
                                                        "1.45pt 5.75pt 1.45pt 5.75pt",
                                                    height: ".4in",
                                                }}
                                            >
                                                <h2
                                                    style={{
                                                        marginTop: "2.0pt",
                                                        marginRight: "0",
                                                        marginBottom: "0",
                                                        marginLeft: "0",
                                                        textAlign: "center",
                                                        fontSize: "13px",
                                                    }}
                                                >
                                                    Royalty Assurance
                                                </h2>
                                                <h1
                                                    style={{
                                                        margin: " 0 0 24pt",
                                                        textAlign: "center",
                                                        fontSize: "16px",
                                                    }}
                                                >
                                                    {policy?.policyType}{" "}
                                                    Insurance Application
                                                </h1>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                Application Date:{" "}
                                                {policy.policyApplicationDate}
                                            </td>
                                        </tr>
                                        <TableHeaderSection
                                            title={"Policy Holder Information"}
                                        />
                                        <CustomerSection customer={customer} />
                                        <TableHeaderSection
                                            title={"Spouse Information"}
                                        />
                                        <SpouseSection customer={customer} />
                                        <TableHeaderSection
                                            title={"Policy Information"}
                                        />
                                        <PolicySection policy={policy} />
                                        <TableHeaderSection
                                            title={"Dependent Information"}
                                        />
                                    </tbody>
                                </table>
                                <table
                                    style={{
                                        width: "7.3in",
                                        borderCollapse: "collapse",
                                        border: 0,
                                    }}
                                >
                                    <tbody>
                                        <DependentsSection
                                            dependents={dependents}
                                        />
                                    </tbody>
                                </table>
                            </div>
                        </Box>
                    </Grid>

                    <Box sx={{ mt: 2 }}>
                        <Typography
                            color="textPrimary"
                            gutterBottom
                            variant="h6"
                        >
                            Notes:
                        </Typography>
                        {hasHealthNote.map((n, i) => (
                            <Typography
                                color="textSecondary"
                                variant="body2"
                                my={1}
                                key={i}
                            >
                                {n.note}
                            </Typography>
                        ))}
                        <Typography color="textSecondary" variant="body2">
                            hcgUser: {customer.hcgUser}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                            hcgPassword: {customer.hcgPassword}
                        </Typography>
                    </Box>
                </Box>
            </Scrollbar>
        </Paper>
    );
};

export default ApplicationPreview;
