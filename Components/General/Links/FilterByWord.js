"use client"
import SearchField from "../../Layout/SearchField";

export default function FilterByWord({ searchValue,onChangeSearch }) {

    return(
        <SearchField searchValue={searchValue} onChangeSearch={onChangeSearch} />
    )
}