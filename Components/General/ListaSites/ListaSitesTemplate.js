"use client"

import { useState } from "react"

import ListaSitesGroup from "./ListaSitesGroup";
import ListaSitesFilterGroup from "./ListaSitesFilterGroup";
import Submenu from "../../Menu/Submenu";

export default function ListaSitesTemplate ({ dataSitesList })  {

    const myData = {
        uno: "uno"
    }

    const [dataFiltered, setDataFiltered] = useState(dataSitesList)
    const [searchValue, setSearchValue] = useState("")

    const onChangeSearch = (e) => {
        setSearchValue(e.target.value)
        setDataFiltered(dataSitesList.filter(item => item.attributes.papname.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    return (
        <div className="w-full">
            <Submenu>
                <ListaSitesFilterGroup searchValue= {searchValue} onChangeSearch={onChangeSearch}  />
            </Submenu>
            <div className="p-4">
                <ListaSitesGroup dataFiltered={dataFiltered} />
            </div>
        </div>

    )
}