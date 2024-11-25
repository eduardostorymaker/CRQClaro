'use client'

import { useState } from "react";
import MapSection from "./MapaSites/MapSection";
import ListaSitesTemplate from "./ListaSites/ListaSitesTemplate";

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



export default function MapTemplate ({ dataSites }) {

    const [dataOptions, setDataOptions] = useState(firstDataOptions)
    const [codeSiteSelected, setCodeSiteSelected] = useState("8377")
    
    const sitelist = dataOptions.find(item => item.id === "sitelist" )
    const maplist = dataOptions.find(item => item.id === "maplist" )
    
    const siteSelected = dataSites.find(item => item.id === codeSiteSelected)

    const sharedOptionStyle = `
        h-full
        flex
        justify-center
        items-center
        px-2
        border-r-[1px]
        border-red-500
        hover:bg-yellow-500 hover:border-yellow-500  hover:text-white
        trasition ease-in-out
        
    `

    const unselectedOptionStyle = `
        ${sharedOptionStyle}
        border-red-500
        hover:bg-yellow-500 hover:border-yellow-500  hover:text-white
        text-gray-700
    `

    const selectedOptionStyle =`
        ${sharedOptionStyle}
        border-yellow-500
        bg-yellow-500
        text-white
    `

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
            <div className="h-[40px] w-full">
                <div className="h-full w-full flex">
                    {
                        dataOptions.map(item => 
                            <div 
                                className={item.state?selectedOptionStyle:unselectedOptionStyle}
                                onClick={() => onSelect(item.id)}
                            >
                                {
                                    item.tag
                                }
                            </div>    
                        )
                    }
                </div>
            </div>
            <div className="flex h-[calc(100%-40px)] w-full">
                {
                    sitelist.state
                    &&
                    <div className="w-full h-full">
                        <ListaSitesTemplate dataSites={dataSites} onSelect={onSelect} setCodeSiteSelected={setCodeSiteSelected} />
                    </div>
                }

                {
                    maplist.state
                    &&
                    <div className="w-full h-full">
                        <MapSection dataSites={dataSites} codeSiteSelected={codeSiteSelected} setCodeSiteSelected={setCodeSiteSelected} siteSelected={siteSelected} /> 
                    </div>
                }
          
            </div>
        </div>
    )
}