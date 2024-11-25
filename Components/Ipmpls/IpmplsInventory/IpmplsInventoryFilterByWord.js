import SearchField from "../../Layout/SearchField"

export default function IpmplsInventoryFilterByWord({ searchValue,onChangeSearch }) {

    return(
        <SearchField searchValue={searchValue} onChangeSearch={onChangeSearch} />
    )
}