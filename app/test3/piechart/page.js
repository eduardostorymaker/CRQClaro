import dynamic from 'next/dynamic'

const Piechart = dynamic(() => import("../../../Components/Test/Piechart"), {
    ssr:false
})


export default function piechartServer () {

    return(
        <Piechart />
    )
}