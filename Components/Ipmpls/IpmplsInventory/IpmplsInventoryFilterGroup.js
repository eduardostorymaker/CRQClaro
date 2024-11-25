import IpmplsInventoryFilterByWord from "./IpmplsInventoryFilterByWord";


export default function IpmplsInventoryFilterGroup({ searchValue,onChangeSearch }) {

    return(
        <div className="w-full h-full">
            <div className="w-full h-full flex">
                <div className="">
                    <IpmplsInventoryFilterByWord searchValue={searchValue} onChangeSearch={onChangeSearch} />
                </div>

            </div>
        </div>
    )
}