"use client"

import { useEffect,useState } from "react"

import FaultTrackingGroup from "./FaultTrackingGroup";
import FaultTrackingFilterGroup from "./FaultTrackingFilterGroup";
import Submenu from "../../Menu/Submenu";

const firstDataOptions = [
    {
        id: "sitelist",
        tag: "Lista Sites",
        state: true
    },
    {
        id: "maplist",
        tag: "Mapa estaciones",
        state: false
    }
]

const menuFilterList = [
    {
        id: "Pendiente",
        tag: "Pendiente",
        value: "Pendiente",
        selected: true
    },
    {
        id: "Todo",
        tag: "Todo",
        value: "",
        selected: false
    },
    {
        id: "Finalizado",
        tag: "Finalizado",
        value: "Finalizado",
        selected: false
    }
    
]

export default function FaultTrackingTemplate ()  {

    const [dataTracking,setDataTracking] = useState([])
    const dataOrdered = dataTracking.sort((a,b)=>{
        const dateA = new Date(a.starttime)
        const dateB = new Date(b.starttime)
        return dateB - dateA
    })
    const [dataOptions, setDataOptions] = useState(firstDataOptions)
    const [dataFiltered, setDataFiltered] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [menuFilter,setMenuFilter] = useState(menuFilterList)
    const [faultSelected, setFaultSelected] = useState("")

    useEffect(()=>{
        fetch("http://172.19.128.128:3060/api/faulttracking", {cache: "no-cache"})
            .then(res => res.json())
            .then(data => {
                setDataTracking(data.data)
                const dataOrdered = data.data.sort((a,b)=>{
                    const dateA = new Date(a.starttime)
                    const dateB = new Date(b.starttime)
                    return dateB - dateA
                })
                setDataFiltered(dataOrdered.filter(item => item.state.toLowerCase().includes("pendi".toLowerCase())))
            })
    },[])

    const changeMenuValue = (menu,id) => {
        const dataChanged = menu.map(item => {
            if (item.id === id) {
                return({
                    ...item,
                    selected: true
                })
            } else {
                return({
                    ...item,
                    selected: false
                })
            }

        })
        return dataChanged
    }

    const onChangeSearch = (e) => {
        setSearchValue(e.target.value)
        setDataFiltered(dataOrdered.filter(item => 
            item.title.toLowerCase().includes(e.target.value.toLowerCase())
            ||
            item.message.toLowerCase().includes(e.target.value.toLowerCase())
            ||
            item.ticket.toLowerCase().includes(e.target.value.toLowerCase())
        ))
    }

    const onSelectMenu = (id,value) => {
        setDataFiltered(dataOrdered.filter(item => 
            item.state.toLowerCase().includes(value.toLowerCase())
        ))
        setMenuFilter(changeMenuValue(menuFilterList,id))
    }

    const onSelect = (id) => {

        const newDataOptions = dataOptions.map(item=>{
            if (id === item.id) {
                return ({
                    ...item,
                    state: true
                })
            } else {
                return ({
                    ...item,
                    state: false
                })
            }
        })
        setDataOptions(newDataOptions)
    }

    

    return (
        <div className="w-full h-full">
            <Submenu>
                <FaultTrackingFilterGroup searchValue= {searchValue} onChangeSearch={onChangeSearch} onSelectMenu={onSelectMenu} menuFilter={menuFilter} />
            </Submenu>
            <div className="p-4">
                <FaultTrackingGroup dataFiltered={dataFiltered} onSelect={onSelect} setFaultSelected={setFaultSelected} />
            </div>
        </div>

    )
}