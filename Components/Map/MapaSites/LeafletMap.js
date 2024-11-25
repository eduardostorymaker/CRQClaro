'use client'

import { useState } from "react";
import "leaflet/dist/leaflet.css";

//import markerIconPng from " ../../node_modules/leaflet/dist/images/marker-icon.png"

import L from 'leaflet'
import { MapContainer, TileLayer, LayersControl, LayerGroup } from "react-leaflet"

import ChangeView from "./ChangeView";
import PopUpPin from "./PopUpPin";
import pinIcon from "../../../assets/icons/technology.png"
import shadowPinIcon from "../../../assets/icons/marker-shadow.png"
import centerIcon from "../../../assets/icons/placeholder.png"
import { Button } from "@mui/material";
import MarkerGroupLeaflet from "./MarkerGroupLeaflet";

const myIcon = L.icon({
    iconUrl: pinIcon.src,
    iconSize: [35, 30],
    iconAnchor: null,
    popupAnchor: [-3, -10],
    shadowUrl: shadowPinIcon.src,
    shadowSize: [0, 0],
    shadowAnchor: null,
    className: "leaflet-venue-icon"
})

const myCenterIcon = L.icon({
    iconUrl: centerIcon.src,
    iconSize: [40, 35],
    iconAnchor: null,
    popupAnchor: [-3, -10],
    shadowUrl: pinIcon.src,
    shadowSize: [35, 30],
    shadowAnchor: [5, 4],
    className: "leaflet-venue-icon"
})


const redOptions = { color: 'red' }

export default function LeafletMap({ dataToShow,siteSelected,showToolTip,setCodeSiteSelected }) {

    
    const siteItems = dataToShow.filter( item => item.type === "movil")
    const popItems = dataToShow.filter( item => item.type === "pop")
    const hubItems = dataToShow.filter( item => item.type === "hub")

    const positionSelected = [siteSelected.latitude, siteSelected.longitude]

    return(
        <div className="h-full w-full">

       
            <MapContainer className="h-full w-full" center={positionSelected} zoom={17} scrollWheelZoom={true}>
                <ChangeView center={positionSelected} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LayersControl position="bottomright" >
                    <LayersControl.Overlay checked name="Sites" >
                        <LayerGroup >
                            <MarkerGroupLeaflet 
                                dataList={siteItems}
                                icon={myIcon}
                                centerIcon={myCenterIcon}
                                siteSelected={siteSelected}
                                setCodeSiteSelected={setCodeSiteSelected}
                                showToolTip={showToolTip} 
                            />
                        </LayerGroup>
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="POPs" >
                        <LayerGroup >
                            <MarkerGroupLeaflet
                                dataList={popItems}
                                icon={myIcon}
                                centerIcon={myCenterIcon}
                                siteSelected={siteSelected}
                                setCodeSiteSelected={setCodeSiteSelected}
                                showToolTip={showToolTip}
                            />
                        </LayerGroup>
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="Hubs" >
                        <LayerGroup >
                            <MarkerGroupLeaflet 
                                dataList={hubItems} 
                                icon={myIcon} 
                                centerIcon={myCenterIcon} 
                                siteSelected={siteSelected} 
                                setCodeSiteSelected={setCodeSiteSelected} 
                                showToolTip={showToolTip}
                            />
                        </LayerGroup>
                    </LayersControl.Overlay>

                </LayersControl>

            </MapContainer>
        
        </div>
    )
}
 