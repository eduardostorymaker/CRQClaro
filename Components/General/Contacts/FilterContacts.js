import SearchField from "../../Layout/SearchField";

export default function FilterContacts ({ searchValue, onChangeSearch }) {
    
    return (
        <SearchField searchValue={searchValue} onChangeSearch={onChangeSearch} />
    )
}