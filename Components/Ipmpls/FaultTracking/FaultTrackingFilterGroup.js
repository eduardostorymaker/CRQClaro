import FaultTrackingFilterByWord from "./FaultTrackingFilterByWord"
import FaultTrackingFilterByMenu from "./FaultTrackingFilterByMenu"

export default function FaultTrackingFilterGroup({ searchValue,onChangeSearch,onSelectMenu,menuFilter }) {
    console.log("menuFilter")
    console.log(menuFilter)
    return(
        <div className="w-full h-full">
            <div className="w-full h-full flex">
                <div className="">
                    <FaultTrackingFilterByWord searchValue={searchValue} onChangeSearch={onChangeSearch} />
                </div>
                <div>
                    <FaultTrackingFilterByMenu menuFilter={menuFilter} onSelectMenu={onSelectMenu} />
                </div>

            </div>
        </div>
    )
}