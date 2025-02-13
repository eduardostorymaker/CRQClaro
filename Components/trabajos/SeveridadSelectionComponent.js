"use client"

import { useEffect, useState } from "react"

export default function SeveridadSelectionComponent ({item,saveSeverityChanges,setOpenWindow,dataBaseCharging,dataBaseError,setOptionSelected}) {

    console.log("inner item")
    console.log(item)
    console.log(item.severidad)
    console.log(item.rojo)
    const [dataToSelect,setDataToSelect] = useState("")
    const [severitySelected,setSeveritySelected] = useState(item.severidad)
    const [colorSelected,setColorSelected] = useState(item.rojo)
    const lastItem = {
        ...item,
        severidad: severitySelected,
        rojo: colorSelected
    }
    console.log("lastItem")
    console.log(severitySelected)
    console.log(colorSelected)
    // console.log("lastItem")
    // console.log(lastItem)
    console.log("Cargando componente de ventana de opciones")

    useEffect(()=>{
        console.log("Solicitando informacion de menu")
        const api = "http://172.19.128.128:3060/api/eficiencia/trabajosprogramados/severidadcolor"
        fetch(api,{cache: "no-store"})
            .then( res => res.json())
            .then( data => {
                setDataToSelect(data.data[0].severidadcolor)
                // setSeveritySelected(item.severidad)
                // setColorSelected(item.rojo)
            })
    },[])
    return (
        <div className="border-[1px] border-red-200 p-6 rounded-xl  bg-white">
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
                <div className="w-[700px]">
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
                                <div className="flex justify-center mb-2">
                                    <div className="border-[1px] border-b-0 border-red-400 mr-6">
                                        <div className="p-2 bg-red-400 text-white flex justify-center">
                                            CRITICIDAD
                                        </div>
                                        {
                                            dataToSelect.severidad.map(item =>
                                                <div key={item.data} onClick={()=>setSeveritySelected(item.data)} className={`p-2 w-[200px] ${severitySelected===item.data?"bg-yellow-400 text-white":"border-b-[1px] border-red-400"}`}>
                                                    {
                                                        item.data
                                                    }
                                                </div>
                                            )
                                        }  
                                    </div>
                                    <div className="border-[1px] border-red-400 flex flex-col ">
                                        <div className="p-2 bg-red-400 text-white border-b-[1px] border-white flex justify-center">
                                            COLOR
                                        </div>
                                        {
                                            dataToSelect.rojo.map(item =>
                                                <div key={item.data} onClick={()=>setColorSelected(item.data)} className={`p-2 w-[200px] ${colorSelected===item.data?(colorSelected === "SI"?"bg-red-400 text-white":"bg-blue-400 text-white"):"border-b-[1px] border-red-400"}`}>
                                                    {
                                                        item.data.toLowerCase() === "si"
                                                        ?
                                                        "ROJO"
                                                        :
                                                        "AZUL"
                                                    }
                                                </div>
                                            )
                                        } 
                                    </div>
                                </div>
                            </div>
                            :
                            "Cargando..."
                        }
                    </div>
                    <div>
                        <div className="flex justify-between">
                            <button className="p-4 bg-red-400 text-white" onClick={()=>{
                                    setOpenWindow(false)
                                    setOptionSelected("")
                                }}>
                                Cancelar
                            </button>
                            <button className="p-4 bg-yellow-400 text-white" onClick={ () => {
                                saveSeverityChanges(lastItem)
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