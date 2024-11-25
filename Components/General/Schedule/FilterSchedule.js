import MenuSubmenu from "../../Menu/MenuSubmenu";

export default function FilterSchedule ({ filterGroup, onSelectGroup }) {
    console.log("filterGroup")
    console.log(filterGroup)
    return(
        <MenuSubmenu dataFilter={filterGroup} changeSelection={onSelectGroup} />
    )
}