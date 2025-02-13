"use client"

import { useEffect, useState } from "react"

export default function DerivarSelectionComponent ({item,saveChangeGroupChanges,setOpenWindow,dataBaseCharging,dataBaseError,setOptionSelected,menuFilter}) {

    console.log("inner item")
    console.log(item)
    console.log(item.severidad)
    console.log(item.rojo)
    const dataToSelect = menuFilter
    console.log()
    const [groupSelected,setGroupSelected] = useState({
        noc:item.noc,
        at: item.areatecnologica
    })
    const [colorSelected,setColorSelected] = useState(item.rojo)
    const lastItem = {
        ...item,
        noc: groupSelected.noc,
        areatecnologica: groupSelected.at
    }
    console.log("groupSelected")
    console.log(groupSelected)
    //console.log(colorSelected)
    // console.log("lastItem")
    // console.log(lastItem)
    console.log("Cargando componente de ventana de opciones")

    // useEffect(()=>{
    //     console.log("Solicitando informacion de menu")
    //     const api = "http://172.19.128.128:3060/api/eficiencia/trabajosprogramados/grouplist"
    //     fetch(api,{cache: "no-store"})
    //         .then( res => res.json())
    //         .then( data => {
    //             setDataToSelect(data.data[0].equiposnoc.grupos)
    //             // setGroupSelected(item.severidad)
    //             // setColorSelected(item.rojo)
    //         })
    // },[])
    return (
        <div className="border-[1px] border-red-200 p-6 rounded-xl bg-white z-50">
            {
                dataBaseCharging || dataBaseError
                ?
                (
                    dataBaseCharging
                    ?
                    <div>
                        Actualizando Base de Datos...
                    </div>
                    :
                    <div>
                        Error al actualizar la base de datos
                    </div>
                )
                :
                <div>
                    <div>
                        {
                            dataToSelect
                            ?
                            <div className="flex flex-col">
                                <div className="p-2 bg-green-200 mb-2">
                                    <div>
                                        {
                                            `${item.crq} / ${item.tarea}` 
                                        }
                                    </div>
                                    <div>
                                        {
                                            item.elemento
                                        }
                                    </div>
                                    <div>
                                        {
                                            item.resumen
                                        }
                                    </div>
                                </div>
                                <div className="flex mb-2 border-[1px] border-r-0 border-red-400" >
                                    {
                                        dataToSelect.map(item =>
                                            <div key={item.noctitle} className="border-r-[1px] border-red-400">
                                                <div className={`p-2  font-bold ${groupSelected.noc===item.noctitle?"bg-red-400 text-white":"bg-white border-b-[1px] border-red-300"}`}>
                                                    {
                                                        item.noctitle?item.noctitle:"OTRO"
                                                    }
                                                </div>
                                                <div>
                                                    {
                                                        item.arealist.map( itemToSelect => 
                                                            <div 
                                                                key={itemToSelect.areatecnologica}
                                                                onClick={()=>setGroupSelected({
                                                                    noc: item.noctitle,
                                                                    at: itemToSelect.areatecnologica
                                                                })}
                                                                className={`p-2 ${groupSelected.at===itemToSelect.areatecnologica?"bg-yellow-400 text-white":"bg-white"}`}
                                                            >
                                                                {
                                                                    itemToSelect.areatecnologica
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        )
                                    }  
                                </div>
                                
                            </div>
                            :
                            "Cargando..."
                        }
                    </div>
                    <div>
                        <div className="flex justify-between">
                            <button className="p-4 bg-red-400 text-white"  onClick={()=>{
                                setOpenWindow(false)
                                setOptionSelected("")
                            }}>
                                Cancelar
                            </button>
                            <button className="p-4 bg-yellow-400 text-white"  onClick={ () => {
                                saveChangeGroupChanges(lastItem)
                                setOpenWindow(false)
                                setOptionSelected("")
                            }}>
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}