"use client"

import { useEffect, useState } from "react"

export default function EditarSelectionComponent ({item,saveChangeGroupChanges,setOpenWindow,dataBaseCharging,dataBaseError,setOptionSelected}) {

    const [resumen,setResumen] = useState(item.resumen)
    const [elemento,setElemento] = useState(item.elemento)

    return (
        <div className="border-[1px] border-red-200 p-6 rounded-xl  bg-white">
            <div className="" >
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
                    <div className="w-[700px] mb-2">
                        <div>
                            <div>Elemento:</div>
                            <input 
                                type="text" 
                                value={elemento} 
                                onChange={(e)=>setElemento(e.target.value)} 
                                className="w-full p-2 border-[1px] border-red-400 mb-2" 
                            />
                        </div>
                        <div>
                            <div>Resumen:</div>
                            <textarea 
                                value={resumen} 
                                onChange={(e)=>setResumen(e.target.value)}  
                                className="w-full p-2 border-[1px] border-red-400" 
                            />
                        </div>
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
                                saveChangeGroupChanges({
                                    ...item,
                                    resumen,
                                    elemento
                                })
                                setOpenWindow(false)
                                setOptionSelected("")
                            }}>
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
        </div>
    )
}