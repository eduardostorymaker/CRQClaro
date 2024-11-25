import FilterByWord from "./FilterByWord";
import FilterByMenu from "./FilterByMenu";

export default function FilterGroup({ searchValue, onChangeSearch, changeSelection, dataFilter }) {

     return(
        <div className="w-full h-full">
            <div className="w-full h-full flex">
                <div className="">
                    <FilterByWord searchValue={searchValue} onChangeSearch={onChangeSearch} />
                </div>
                <div className="h-full">
                    <FilterByMenu changeSelection={changeSelection} dataFilter={dataFilter} />
                </div>
            </div>
        </div>
    )
}