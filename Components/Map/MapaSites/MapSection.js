'use client'

import LeafletMap from "./LeafletMap";
import { useState, useEffect } from "react";

import MapSectionFilter from "./MapSectionFilter";

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { AddCircleOutline } from "@mui/icons-material";
import { useSearchParams } from "next/navigation";


export default function MapSection ({dataSites, setCodeSiteSelected, siteSelected}) {

    const firstDistanceToShow = 1

    const [showMenu, setShowMenu] = useState(true)
    const [radioValue, setRadioValue] = useState(firstDistanceToShow)
    const [showToolTip, setShowToolTip] = useState(false)
    const [textFilter, setTextFilter] = useState("")
  
    const onUpdate = (valueEntry) => {
        setRadioValue(valueEntry)
    }

    const gradeToKm = 111.32
    

    const showedMenuStyles = `flex w-full bg-white bg-opacity-80 absolute top-0  z-[20000]`
    const hiddenMenuStyles = `hidden`

    const showedMapStyles = `h-full w-full`
    const hiddenMapStyles = "h-full w-full"

    const buttonShareStyles = "absolute right-0 top-[4px] bg-opacity-70 text-white h-[60px] w-[60px] z-[20001] rounded-full transition ease-in-out duration-5000 flex justify-center items-center"
    const buttonShowStyles = `${buttonShareStyles} bg-red-500 `
    const buttonHiddenStyles = `${buttonShareStyles} bg-yellow-500  rotate-[135deg]`


    const getDistance = (latitude,longitude) => {
        return Math.pow(Math.pow(latitude - siteSelected.latitude,2) + Math.pow(longitude-siteSelected.longitude,2),0.5)*gradeToKm
    }

    const dataFiltered = dataSites.filter(item => getDistance(item.latitude, item.longitude) < radioValue)

    return(
        <div className="flex w-full h-full relative">
            {/* Inicio boton */}
            <div 
                className={showMenu?buttonHiddenStyles:buttonShowStyles}
                onClick={()=>setShowMenu(!showMenu)}
            >
                <AddIcon />

            </div>
            {/* Fin boton */}
            
            <div className={showMenu?showedMenuStyles:hiddenMenuStyles}>
                <MapSectionFilter 
                    radioValue={radioValue} 
                    setRadioValue={setRadioValue}
                    dataSites={dataSites} 
                    showToolTip={showToolTip} 
                    setShowToolTip={setShowToolTip} 
                    textFilter={textFilter}
                    setTextFilter={setTextFilter} 
                    setCodeSiteSelected = {setCodeSiteSelected}
                />
            </div>
            <div className={showMenu?showedMapStyles:hiddenMapStyles}>
                <LeafletMap dataToShow={dataFiltered} siteSelected={siteSelected} showToolTip={showToolTip} setCodeSiteSelected={setCodeSiteSelected} /> 
            </div>
            <div className="h-[150px] w-[200px] absolute bg-opacity-50 rounded-xl bg-red-500 bottom-0 z-[20000] p-2 text-[14px] text-white m-2">
                <div className="text-white">
                    <p className="pb-[4px] font-bold border-b-[1px] border-white">
                        {`${siteSelected.tecnologies||" "}`}
                    </p>
                    <p className="pb-[4px] border-b-[1px] border-white">
                        {`${siteSelected.code} ${siteSelected.name}`}
                    </p>
                    <p className="pb-[4px] border-b-[1px] border-white">
                        {`${siteSelected.latitude}, ${siteSelected.longitude}`}
                    </p>
                    <p className="pb-[4px] border-b-[1px] border-white">
                        {`${siteSelected.district}, ${siteSelected.province}, ${siteSelected.department}`}
                    </p>
                </div>
            </div>
        </div>
    )
}