import React from "react"
import { RefinementList, connectRefinementList } from "react-instantsearch-dom"
import { Typography } from "@mui/material"

export default connectRefinementList(
    ({ translations, searchable, attribute, items, isFromSearch }) =>
        isFromSearch || (items.length && items.length > 0) ? (
            <RefinementList
                attribute={attribute}
                searchable={searchable}
                translations={translations}
            />
        ) : (
            <Typography>No results.</Typography>
        )
)
