import ListaSitesFilterByWord from "./ListaSitesFilterByWord"

export default function ListaSitesFilterGroup({ searchValue,onChangeSearch }) {

    return(
        <div className="w-full h-full">
            <div className="w-full h-full flex">
                <div className="">
                    <ListaSitesFilterByWord searchValue={searchValue} onChangeSearch={onChangeSearch} />
                </div>

            </div>
        </div>
    )
}