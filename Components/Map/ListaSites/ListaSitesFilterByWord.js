import SearchField from "../../Layout/SearchField"

export default function ListaSitesFilterByWord ({ searchValue,onChangeSearch }) {

    return(
        <SearchField searchValue={searchValue} onChangeSearch={onChangeSearch} />
    )
}