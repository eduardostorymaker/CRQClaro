import { Marker, Popup, Tooltip } from "react-leaflet"

import PopUpPin from "./PopUpPin"

export default function MarkerGroupLeaflet ({ dataList,icon,centerIcon,siteSelected,setCodeSiteSelected,showToolTip }) {
    console.log("dataList")
    console.log(dataList)
    return(
        <>
            {
                dataList.map(item => {
                    const {id, code, name, latitude, longitude} = item
                    let iconToShow = icon
                    if (latitude === siteSelected.latitude && longitude === siteSelected.longitude) {
                        iconToShow = centerIcon
                    } 
                    return(
                        <Marker  position={[latitude,longitude]} icon={iconToShow} >
                            <Popup>
                                <PopUpPin id={id} code={code} name={name} setCodeSiteSelected={setCodeSiteSelected} />
                            </Popup>
                            {
                                showToolTip
                                &&
                                <Tooltip direction="right" offset={[10, 0]} opacity={1} permanent>
                                    <div>
                                        <div>
                                            {`${code} ${name}`}
                                        </div>
                                        
                                    </div>
                                </Tooltip>
                                
                            }
                        </Marker >
                    )
                
                }
                )
            }
        </>
    )
}