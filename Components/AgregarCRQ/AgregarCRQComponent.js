"use client"

import Link from "next/link"
import { useState } from "react"

const statusDB = {
    none: "none",
    processing: "processing",
    success: "success",
    failed: "failed"
}

export default function AgregarCQRComponent () {

    const [data, setData] = useState("")
    const [searchCrq,setSearchCrq] = useState("")
    const [isSearching,setIsSearching] = useState(false)
    const [updateDB,setUpdateDB] = useState(statusDB.none)

    console.log(data)

    const getData = async (e,searchCrq) => {
        try {
            setIsSearching(true)
            e.preventDefault()
            if (searchCrq) {
                const api = `http://172.19.128.128:3060/api/eficiencia/trabajosprogramados/addcrqsearch?crq=${searchCrq}`
                const res = await fetch(api,{cache:"no-cache"})
                const dataRes = await res.json()
                setData(dataRes.data)

            } else {
                setData("")
            }
            setIsSearching(false)
        } catch (e) {
            setIsSearching(false)
            console.log("Error")
            console.log(e)
        }
    }

    const formatData = (data) => {
        return data.map( item => {
            return ({
                ...item,
                inicio: new Date(item.inicio) || new Date(),
                fin: new Date(item.fin) || new Date(),
                fondofecha:"",
                rojo:"NO",
                status:""
            })
        })
    }


    const addCRQ = async (item) => {

        const alertRsp = window.confirm("¿Estás seguro de que deseas agregar la CRQ con todas las tareas?");

        if (alertRsp) {

            setUpdateDB(statusDB.processing)
            const taskList = data.filter( task => task.crq === item.crq )
            console.log(formatData(taskList))
    
            const methodHttp = 'PUT'
            try {
                const requestOptions = {
                    method: 'PUT',
                    headers: {'Content-Type': 'text/plain'},
                    body: JSON.stringify(formatData(taskList))
                }
                const api = "http://172.19.128.128:3060/api/eficiencia/trabajosprogramados/addcrqput"
        
                const response = await fetch(api,requestOptions)
                const dataInfo = await response.json()
                console.log("dataInfo")
                console.log(dataInfo)
                if (dataInfo.error) {
                    throw new Error("Error "+ dataInfo.status + ": " +dataInfo.error)
                } else {
                    console.log("Actualizando...")
                    //setToUpdate(!toUpdate)
                }
                setUpdateDB(statusDB.success)
            } catch (error) {
                setUpdateDB(statusDB.failed)
                console.log("Error en el update")
                console.log(error)
                // setStateDb(statesMessages.failed)
            }
        }
    }
    const columnStyles = `grid grid-cols-[100px_180px_180px_450px_350px_200px_200px_250px] text-[16px]`
    const headerStyles = `${columnStyles} bg-gray-500 pt-2 pb-2 text-white`
    const bodyStyles = `${columnStyles} border-b-[1px] border-gray-200`
    return (
        <div className="relative">
            <div className={`absolute backdrop-blur-sm top-0 right-0 left-0 bottom-0 h-min-[800px] flex flex-col justify-center items-center ${updateDB===statusDB.none?"hidden":""}`}>
                <div className="h-min-[800px] bg-white flex flex-col justify-center items-center rounded-md p-4">
                    <div>
                        {
                            updateDB===statusDB.none
                            ?
                            ""
                            :
                            (
                                updateDB===statusDB.processing
                                ?
                                "Conectando con la Base de datos..." 
                                :
                                (
                                    updateDB===statusDB.success
                                    ?
                                    "Se guardo exitosamente!"
                                    :
                                    (
                                        updateDB===statusDB.failed
                                        ?
                                        "Hubo un error (campos de la DB incompatibles), revise los campos que desea guardar"
                                        :
                                        "Error desconocido, avise al administrador"
                                    ) 
                                )
                            )
                        }
                    </div>
                    <div className="p-2 bg-yellow-400 text-white w-[75px] flex justify-center mt-4" onClick={()=>setUpdateDB(statusDB.none)}>
                        OK
                    </div>

                </div>
            </div>
            <div className="flex justify-between">
                <div className="p-2 text-[25px] text-red-400 ">
                    Agregar CRQ
                </div>
                <div className="flex justify-end">
                    <Link href={"/"} className="p-2 m-2 border-[1px] border-gray-300">
                        Regresar
                    </Link>
                </div>
            </div>
            <form className="p-2 flex" onSubmit={(e)=>getData(e,searchCrq)}>
                <div>
                    <input type="text" value={searchCrq} onChange={(e)=>setSearchCrq(e.target.value)} placeholder="Ingrese CRQ" className="w-[250px] border-[1px] border-red-400 p-2"/>
                </div>
                <button type="submit" className="bg-red-400 text-white p-2">
                    Buscar
                </button>
            </form>
            <div className="p-2">
                {
                    !isSearching
                    ?
                    (
                        data.length
                    ?
                        <div>
                            <div>
                                <div className={headerStyles}>
                                    <div className="pl-2">

                                    </div>
                                    <div className="pl-2">
                                        CRQ
                                    </div>
                                    <div className="pl-2">
                                        TAREA
                                    </div>
                                    <div className="pl-2">
                                        RESUMEN
                                    </div>
                                    <div className="pl-2">
                                        ELEMENTO
                                    </div>
                                    <div className="pl-2">
                                        INICIO
                                    </div>
                                    <div className="pl-2">
                                        FIN
                                    </div>
                                    <div className="pl-2">
                                        AREA TECNOLOGICA
                                    </div>
                                </div>
                            </div>
                            <div>
                                {
                                    data.map( item => 
                                        <div className={bodyStyles}>
                                            <div className="pl-2 flex items-center">
                                                <button onClick={()=>addCRQ(item)} className="p-2 bg-yellow-400 text-white">
                                                    Agregar
                                                </button>
                                            </div>
                                            <div className="pl-2">
                                                {
                                                    item.crq
                                                }
                                            </div>
                                            <div className="pl-2">
                                                {
                                                    item.tarea
                                                }
                                            </div>
                                            <div className="pl-2">
                                                {
                                                    item.resumen
                                                }
                                            </div>
                                            <div className="pl-2">
                                                {
                                                    item.elemento
                                                }
                                            </div>
                                            <div className="pl-2">
                                                {
                                                    (new Date(item.inicio)).toLocaleString('es-ES')
                                                }
                                            </div>
                                            <div className="pl-2">
                                                {
                                                    (new Date(item.fin)).toLocaleString('es-ES')
                                                }
                                            </div>
                                            <div className="pl-2">
                                                {
                                                    item.areatecnologica
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        :
                        "No hay resultados"
                    )
                    :
                    "Cargando..."
                    
                }
            </div>
        </div>
    )
}



