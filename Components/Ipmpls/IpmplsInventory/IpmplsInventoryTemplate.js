'use client'

import { useState } from "react"
import IpmplsInvetoryGroup from "./IpmplsInventoryGroup"
import IpmplsInventoryFilterGroup from "./IpmplsInventoryFilterGroup"
import Submenu from "../../Menu/Submenu"

export default function IpmplsInventoryTemplate({ ipmplsDeviceData }) {

    const [dataFiltered, setDataFiltered] = useState(ipmplsDeviceData)
    const [searchValue, setSearchValue] = useState("")

    const onChangeSearch = (e) => {
        setSearchValue(e.target.value)
        setDataFiltered(ipmplsDeviceData.filter(item => item.attributes.name.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    return(
        <div className="w-full">
            <Submenu>
                <IpmplsInventoryFilterGroup searchValue= {searchValue} onChangeSearch={onChangeSearch}  />
            </Submenu>
            <div className="p-4">
                <IpmplsInvetoryGroup dataFiltered={dataFiltered} />
            </div>
        </div>
    )
}