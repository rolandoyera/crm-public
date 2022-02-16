import {
    Box,
    Typography,
    Link,
    Grid,
    Card,
    CardHeader,
    CardContent,
    Divider,
    Button,
    Avatar,
    Tooltip,
    Fab,
} from "@mui/material"
import algoliasearch from "algoliasearch/lite"
import {
    InstantSearch,
    SearchBox,
    Hits,
    Highlight,
    Panel,
    Pagination,
    connectStateResults,
} from "react-instantsearch-dom"
import { experimentalStyled } from "@mui/material/styles"
import { createInMemoryCache } from "@algolia/cache-in-memory"
import Facet from "./Facet"
import PlusIcon from "icons/Plus"
import { Link as RouterLink } from "react-router-dom"

const searchClient = algoliasearch("xxx", "xxxxx", {
    responsesCache: createInMemoryCache(),
    requestsCache: createInMemoryCache({ serializable: false }),
})

const Search = () => {
    return (
        <>
            <Tooltip title="Add">
                <Fab
                    color="primary"
                    component={RouterLink}
                    to="/dashboard/customers/add"
                    size="medium"
                    sx={{
                        top: 65,
                        margin: (theme) => theme.spacing(2),
                        position: "fixed",
                        right: 0,
                        zIndex: (theme) => theme.zIndex.speedDial,
                        display: {
                            xs: "flex",
                            lg: "none",
                        },
                    }}
                >
                    <PlusIcon fontSize="medium" />
                </Fab>
            </Tooltip>

            <InstantSearch searchClient={searchClient} indexName="customers">
                <Grid container spacing={3}>
                    <Grid
                        item
                        md={3}
                        lg={2}
                        sx={{
                            display: {
                                xs: "none",
                                md: "unset",
                            },
                        }}
                    >
                        <Card sx={{ minHeight: 740 }}>
                            <CardHeader title={"Groups"} />
                            <Divider />
                            <CardContent sx={{ p: 2, pt: 5 }}>
                                <Typography mb={1}>Carrier</Typography>
                                <Refinement pl={1}>
                                    <Panel>
                                        <Facet attribute="policyCarrier" />
                                    </Panel>
                                </Refinement>
                                <Typography mb={1}>State</Typography>
                                <Refinement pl={1}>
                                    <Panel>
                                        <Facet attribute="holderState" />
                                    </Panel>
                                </Refinement>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={9} lg={10} xl={9}>
                        <Card sx={{ minHeight: 740 }}>
                            <CardContent>
                                <AlogoliaSearch>
                                    <SearchBox
                                        translations={{
                                            placeholder:
                                                "Who are you looking for?",
                                        }}
                                    />
                                    <Button
                                        color="primary"
                                        component={RouterLink}
                                        to="/dashboard/customers/add"
                                        startIcon={
                                            <PlusIcon fontSize="small" />
                                        }
                                        sx={{
                                            padding: ".5rem 1.5rem",
                                            ml: 2,
                                            display: {
                                                xs: "none",
                                                lg: "flex",
                                            },
                                        }}
                                        variant="contained"
                                    >
                                        Add New
                                    </Button>
                                </AlogoliaSearch>
                                <Box mt={1.5}>
                                    <CustomResults />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </InstantSearch>
        </>
    )
}

export default Search

function Hit({ hit }) {
    return (
        <HitResult
            sx={{
                height: {
                    xs: "180px",
                    sm: "110px",
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: {
                    xs: "column",
                    sm: "row",
                },
            }}
        >
            <Box
                sx={{
                    width: "240px",
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        sm: "row",
                    },
                    alignItems: {
                        xs: "center",
                        sm: "unset",
                    },
                }}
            >
                <Avatar
                    sx={{
                        backgroundColor: "primary.main",
                        color: "white",
                        mr: {
                            xs: 0,
                            sm: 2,
                        },
                        mb: {
                            xs: 1,
                            sm: 0,
                        },
                    }}
                />
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
                    <Typography color={"textSecondary"} variant="caption">
                        NAME
                    </Typography>
                    <Link
                        color={"textPrimary"}
                        href={`/dashboard/${hit.path}`}
                        sx={{
                            cursor: "pointer",
                            "& :hover": {
                                color: "primary.main",
                            },
                        }}
                        underline={"none"}
                    >
                        <Typography>
                            <HighlightStyled
                                attribute="holderFirstName"
                                hit={hit}
                            />{" "}
                            <HighlightStyled
                                attribute="holderLastName"
                                hit={hit}
                            />
                        </Typography>
                    </Link>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    minWidth: "80px",
                    alignItems: {
                        xs: "center",
                        sm: "unset",
                    },
                }}
            >
                <Typography color={"textSecondary"} variant="caption">
                    DOB
                </Typography>

                <Typography>
                    <HighlightStyled attribute="holderDOB" hit={hit} />
                </Typography>
            </Box>
            <Box
                sx={{
                    display: {
                        xs: "none",
                        md: "flex",
                    },
                    flexDirection: "column",
                    minWidth: "80px",
                }}
            >
                <Typography color={"textSecondary"} variant="caption">
                    STATE
                </Typography>

                <Typography>{hit.holderState}</Typography>
            </Box>
            <Box
                sx={{
                    display: {
                        xs: "none",
                        md: "flex",
                    },
                    flexDirection: "column",
                    minWidth: "160px",
                }}
            >
                <Typography color={"textSecondary"} variant="caption">
                    POLICY
                </Typography>

                <Typography>{hit.policyCarrier}</Typography>
            </Box>
        </HitResult>
    )
}

const CustomResults = connectStateResults(({ searchState, searchResults }) => (
    <>
        {searchResults && searchResults.nbPages ? (
            <>
                <Hits hitComponent={Hit} />
                <Paginate>
                    <Pagination />
                </Paginate>
            </>
        ) : (
            <Box mt={5.5} ml={3}>
                <Typography>No results.</Typography>
            </Box>
        )}
    </>
))

const AlogoliaSearch = experimentalStyled("div")(({ theme }) => ({
    display: "flex",
    height: "100%",
    width: "100%",

    "& .ais-SearchBox": {
        position: "relative",
        width: "360px",
    },
    "& .ais-SearchBox-input": {
        height: "40px",
        width: "100%",
        borderRadius: theme.shape.borderRadius,
    },
    "& .ais-SearchBox-input:focus": {
        boxShadow: " 0 0px 1px 1px #3c4fe0",
    },
}))

const HighlightStyled = experimentalStyled(Highlight)(({ theme }) => ({
    "& .ais-Highlight-highlighted": {
        backgroundColor: theme.palette.primary.light,
        color: "white",
    },
}))

const HitResult = experimentalStyled(Box)(({ theme }) => ({
    width: "100%",
    borderBottom: "1px solid black",
    borderColor: theme.palette.divider,
    padding: "1rem 0",
}))

const Paginate = experimentalStyled(Box)(({ theme }) => ({
    marginTop: "2rem",
    display: "flex",
    justifyContent: "center",

    "& .ais-Pagination-link": {
        color: theme.palette.text.primary,
        borderRadius: "5px",
        transition: "all .2s",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: theme.palette.divider,
    },
    "& .ais-Pagination-link--selected": {
        color: "white",
    },
    "& .ais-Pagination-item--selected": {
        backgroundColor: theme.palette.primary.main,
        color: "white",
        transition: "all .2s",
    },
    "& .ais-Pagination-item:not(.ais-Pagination-item--selected):not(.ais-Pagination-item--disabled):hover":
        {
            transition: "all .2s",
            backgroundColor: theme.palette.primary.light,
            color: "white",
        },
    "& .ais-Pagination-item--disabled:hover": {
        backgroundColor: "transparent",
    },
}))

const Refinement = experimentalStyled(Box)(({ theme }) => ({
    "& .ais-RefinementList-checkbox": {
        backgroundColor: theme.palette.background.default,
        appearance: "none",
    },
    "& .ais-RefinementList-checkbox::before": {
        content: '" "',
        position: "absolute",
    },
    "& .ais-RefinementList-checkbox:checked": {
        backgroundImage: "unset",
        borderColor: theme.palette.primary.main,
    },
    "& .ais-RefinementList-checkbox:checked::before": {
        content: '"\u2713 "',
        display: "flex",
        justifyContent: "center",
        width: "14px",
        height: "14px",
        color: "white",
        borderRadius: "1px",
        zIndex: 0,
        backgroundColor: theme.palette.primary.main,
    },
}))
