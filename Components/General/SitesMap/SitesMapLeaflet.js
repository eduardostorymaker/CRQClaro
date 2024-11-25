'use client'

import "leaflet/dist/leaflet.css";
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, CircleMarker  } from "react-leaflet"
import pinIcon from "../../../assets/icons/marker-icon.png"
import shadowPinIcon from "../../../assets/icons/marker-shadow.png"

import { useSearchParams } from 'next/navigation'

const myIcon = L.icon({
    iconUrl: pinIcon.src,
    iconSize: [24, 32],
    iconAnchor: null,
    popupAnchor: [-3, -76],
    shadowUrl: shadowPinIcon.src,
    shadowSize: [24, 32],
    shadowAnchor: null,
    className: "leaflet-venue-icon"
})


export default function SitesMapLeaflet() {
    
    //const position1 =  [-12.086623479843762,-77.00395738936616]
    //const position2 =  [dataToShow[2]?.attributes.latitude||-12.086623479843762,dataToShow[2]?.attributes.longitude||-77.00395738936616]

    const params = useSearchParams()
    //console.log(params.get('Latitud'))

    const position1 =  [params.get('Latitud'),params.get('Longitud')]

    return(
        <div className="h-full w-full">
       
            <MapContainer className="h-full w-full" center={position1} zoom={12} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* {
                    itemsToPrint.map(item => 
                        <Marker  position={item.position} icon={myIcon} title={`${item.code} ${item.name}`} >
                            <Popup>
                            {item.code} {item.name}
                            </Popup>
                        </Marker >
                        
                    )
                } */}

                <Marker  position={position1} icon={myIcon} title={`${params.get('Codigo')} ${params.get('Nombre')}`} >
                    <Popup>
                    {`${params.get('Codigo')} ${params.get('Nombre')}`}
                    </Popup>
                </Marker >
            </MapContainer>
        
        </div>
    )
}