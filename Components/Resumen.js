"use client"

import { useState,useEffect } from "react"
import Link from "next/link"

export default function Resumen() {

    const [dataFromServer,setDataFromServer] = useState([])
    const [menuFilter,setMenuFilter] = useState("")
    const [isRefreshing,setIsRefreshing] = useState(false)

    useEffect(()=>{
        console.log("Solicitando informacion de todos los trabajos")
        
        const api = "http://172.19.128.128:3060/api/eficiencia/trabajosprogramados"
        fetch(api,{cache: "no-store"})
            .then( res => res.json())
            .then( data => {
                setDataFromServer(data.data)
            })
    },[])

    useEffect(()=>{
        console.log("Solicitando informacion de menu")
        const api = "http://172.19.128.128:3060/api/eficiencia/trabajosprogramados/grouplist"
        fetch(api,{cache: "no-store"})
            .then( res => res.json())
            .then( data => {
                setMenuFilter(data.data[0].equiposnoc.grupos)
                // setGroupSelected(item.severidad)
                // setColorSelected(item.rojo)
            })
    },[])

    const refreshData = async () => {
        setIsRefreshing(true)
        const api = "http://172.19.128.128:3060/api/eficiencia/trabajosprogramados"
        fetch(api,{cache: "no-store"})
            .then( res => res.json())
            .then( data => {
                setDataFromServer(data.data)
                setIsRefreshing(false)
            })
    }

    const addingFormatToMenuFilter = (menu) => {
        return menu.map( item => {

            return {
                ...item,
                selected: false,
                count: 0,
                checkedCount: 0,
                arealist: item.arealist.map( areaitem => {
                    return {
                        ...areaitem,
                        selected: false,
                        count: 0,
                        checkedCount: 0,
                    }
                })
            }
        })
    }


    const resumeData = (list,menu) => {
        if (list.length && menu) {
            return list.reduce((a,v)=>{
                return a.map( item =>{
                    return {
                        ...item,
                        count: v.noc === item.noctitle ? item.count + 1 : item.count,
                        checkedCount: !v.status ? (v.noc === item.noctitle ? item.checkedCount + 1 : item.checkedCount) : item.checkedCount,
                        arealist: item.arealist.map( areaitem => {
                            return {
                                ...areaitem,
                                count: v.areatecnologica === areaitem.areatecnologica ? areaitem.count + 1: areaitem.count,
                                checkedCount: !v.status ? (v.areatecnologica === areaitem.areatecnologica ? areaitem.checkedCount + 1: areaitem.checkedCount) : areaitem.checkedCount,
                            }
                        })
                    }
                })
            },menu)
        }

        return []
    }

    const menuFilterFormatted = menuFilter?addingFormatToMenuFilter(menuFilter):""

    const resumedInfo = resumeData(dataFromServer,menuFilterFormatted)

    const allCrq = resumedInfo.reduce((a,v) => {
        return ({
            count: a.count + v.count,
            checkedCount: a.checkedCount + v.checkedCount
        })
    },{
        count:0,
        checkedCount:0
    })

    console.log("allCrq")
    console.log(allCrq)

    return(
        <div className="p-4">
            {
                resumedInfo.length && !isRefreshing 
                ?
                <div>
                
                    <div className="flex justify-between">
                        <div className="flex">
                            <Link href={'/trabajosprogramados'} className="p-2 flex items-center bg-gray-500 text-white rounded-md mr-4">
                                Revisar Trabajos
                            </Link>
                            <Link href={'/agregarcrq'} className="p-2 flex items-center bg-gray-500 text-white rounded-md" >
                                Agregar Trabajo
                            </Link>

                        </div>
                        <div className="flex items-center rounded-md border-[1px] border-gray-500 p-4" onClick={()=>refreshData()}>
                            Refrescar
                        </div>
                        <div className="bg-gray-500 text-white p-4 flex items-center rounded-md">
                            <div className="text-[24px]">
                                Faltan:
                            </div>
                            <div className="text-[45px] mr-2 ">
                                {
                                    `${allCrq.checkedCount}`
                                }
                            </div>
                            <div className="text-gray-200">
                                /
                            </div>
                            <div className="text-[25px] ml-2 text-gray-200">
                                {
                                    `${allCrq.count}`
                                }
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div>
                            <div>
                                {
                                    resumedInfo.map( item =>
                                        <div className=" bg-gray-500 p-2 rounded-xl mb-4">
                                            <div className="flex h-full items-center mb-2 text-white">
                                                <div className="text-[25px] h-full">
                                                    {
                                                        item.noctitle
                                                    }
                                                </div>
                                                <div className="flex text-[25px] h-full ml-4 items-center">
                                                    <div className="text-[35px] mr-2">
                                                        {
                                                            `${item.checkedCount}`
                                                        }
                                                    </div>
                                                    <div className="text-gray-200">
                                                        /
                                                    </div>
                                                    <div className="ml-2 text-gray-200">
                                                        {
                                                            `${item.count}`
                                                        }
                                                    </div>
                                                </div>

                                            </div>
                                            <div>
                                                <div className="flex">
                                                    {
                                                        item.arealist.map( subitem =>
                                                            <div key={subitem.areatecnologica} className=" p-4 rounded-xl  mr-4 bg-white text-gray-800">
                                                                <div className="flex text-[18px] justify-center">
                                                                    {
                                                                        subitem.areatecnologica
                                                                    }
                                                                </div>
                                                                <div className="flex  items-center justify-center">
                                                                    <div className="text-[45px] flex mr-2 text-gray-800">
                                                                        {
                                                                            `${subitem.checkedCount}`
                                                                        }
                                                                    </div>
                                                                    <div className="text-gray-400">
                                                                        /
                                                                    </div>
                                                                    <div className="text-[20px] flex items-center ml-2 text-gray-400">
                                                                        {
                                                                            `${subitem.count}`
                                                                        }
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div> 
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>

                :
                "Cargando..."
            }

        </div>
    )
}