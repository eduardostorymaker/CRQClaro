"use client"

import { useState } from "react"

import ListaSitesGroup from "./ListaSitesGroup";
import ListaSitesFilterGroup from "./ListaSitesFilterGroup";
import Submenu from "../../Menu/Submenu";

export default function ListaSitesTemplate ({ dataSites, onSelect, setCodeSiteSelected })  {

    const [dataFiltered, setDataFiltered] = useState(dataSites)
    const [searchValue, setSearchValue] = useState("")

    const onChangeSearch = (e) => {
        setSearchValue(e.target.value)
        setDataFiltered(dataSites.filter(item => 
            item.code.toLowerCase().includes(e.target.value.toLowerCase())
            ||
            item.name.toLowerCase().includes(e.target.value.toLowerCase())
        ))
    }

    return (
        <div className="w-full h-full">
            <Submenu>
                <ListaSitesFilterGroup searchValue= {searchValue} onChangeSearch={onChangeSearch}  />
            </Submenu>
            <div className="p-4">
                <ListaSitesGroup dataFiltered={dataFiltered} onSelect={onSelect} setCodeSiteSelected={setCodeSiteSelected} />
            </div>
        </div>

    )
}