"use client"
import { useState,useEffect } from "react"
import FaultTrackingItemGroup from "./FaultTrackingItemGroup"
import { ConstructionOutlined } from "@mui/icons-material"

export default function FaultTrackingItemTemplate ({ id }) {
 
    const [dataItem,setDataItem] = useState("")
    console.log("dataItem")
    console.log(dataItem)
    useEffect(()=>{
        if (/^[0-9]*$/.test(id)) {
            const urlToFetch = `http://172.19.128.128:3060/api/faulttracking/${id}`
            fetch(urlToFetch, {cache: "no-store"})
                .then(res => res.json())
                .then(data => setDataItem(data.data[0]))
        }
    },[])
    


    return(
        <div className="h-full w-full">
            {   
                /^[0-9]*$/.test(id)
                ?
                    (
                    dataItem
                    ?
                    <FaultTrackingItemGroup dataItem={dataItem} id={id} />
                    :
                    ""
                    )
                :
                    (
                    id === "new"
                    ?
                    <FaultTrackingItemGroup dataItem={dataItem} id={id} />
                    :
                    "Ruta incorrecta"
                    )
            }
        </div>
    )
}