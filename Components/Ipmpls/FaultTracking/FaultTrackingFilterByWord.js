import SearchField from "../../Layout/SearchField"

export default function FaultTrackingFilterByWord ({ searchValue,onChangeSearch }) {

    return(
        <SearchField searchValue={searchValue} onChangeSearch={onChangeSearch} />
    )
}