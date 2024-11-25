import { useMap } from "react-leaflet/hooks"

export default function ChangeView ({ center }) {

    const map = new useMap()
    map.setView(center, map.getZoom())
    return null
}