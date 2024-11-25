"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import categoryInternationalLinks from "../../../../data/ip/categoryInternationalLinks.json"

const addCategoryField = (data) => {
    return data.map( item => {
        return({
            ...item,
            category:"internacional"
        })
    })
}

export default function InternationalLinks () {
    
    const [internarionalScript,setInternationalScript] = useState([])
    const [internarionalLinks,setInternationalLinks] = useState([])
    const [toUpdate,setToUpdate] = useState(true)
    const [search,setSearch] = useState("")
    console.log("internarionalScript")
    console.log(internarionalScript)
    console.log("internarionalLinks")
    console.log(internarionalLinks)
    console.log("categoryInternationalLinks")
    console.log(categoryInternationalLinks)

    useEffect(()=>{
        console.log("Consultando API")
        const urlScript = "http://172.19.128.128:3060/api/ip/international/fromscript"
        fetch(urlScript)
            .then( res => res.json())
            .then( data => setInternationalScript(addCategoryField(data.data)))
        const urlLinks = "http://172.19.128.128:3060/api/ip/international/links"
        fetch(urlLinks)
            .then( res => res.json())
            .then( data => setInternationalLinks(data.data))
    },[toUpdate])

    const diff = (data1,data2) => {
        return data1.filter( item => data2.find( line => line.source === item.source && line.interface === item.interface && line.description === item.description)?false:true)
    }

    const dataDiffToAdd = diff(internarionalScript,internarionalLinks)
    const filteredToAdd = dataDiffToAdd.filter( item => item.interface.includes(search))
    console.log("dataDiffToAdd")
    console.log(dataDiffToAdd)
    const dataDiffToDelete = diff(internarionalLinks,internarionalScript)
    const filteredToDelete = dataDiffToDelete.filter( item => item.interface.includes(search))

    const onSaveData = async (dataLink) => {
        //const methodHttp = params.id === "new"?'POST':'PUT'
        console.log("Iniciando Guardado")
        const methodHttp = 'POST'
        try {
            const requestOptions = {
                method: methodHttp,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dataLink)
            }
            const api = "http://172.19.128.128:3060/api/ip/international/links"
    
            const response = await fetch(api,requestOptions)
            const dataInfo = await response.json()
            console.log("dataInfo")
            console.log(dataInfo)
            if (dataInfo.error) {
                throw new Error("Error "+ dataInfo.status + ": " +dataInfo.error)
            } else {
                console.log("Actualizando...")
                setToUpdate(!toUpdate)
            }
            // console.log("Data Guardada!!") 
            // setStateDb(statesMessages.saved)
            // //setDataLinkGroup(addToDo(dataLinkGroup))
            // if (params.id === "new") {
            //     router.push("/csps/roamingtracking")
            // } else {
            //     setAreThereChanges(false)
            //     setCanEdit(false)
            // }
    
        } catch (error) {
            console.log("Error en el update")
            console.log(error)
            // setStateDb(statesMessages.failed)
        }
    }


    const onDelete = async (dataLink) => {
        //const methodHttp = params.id === "new"?'POST':'PUT'
        console.log("Iniciando Guardado")
        const methodHttp = 'DELETE'
        try {
            const requestOptions = {
                method: methodHttp,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dataLink)
            }
            const api = "http://172.19.128.128:3060/api/ip/international/links"
    
            const response = await fetch(api,requestOptions)
            const dataInfo = await response.json()
            console.log("dataInfo")
            console.log(dataInfo)
            if (dataInfo.error) {
                throw new Error("Error "+ dataInfo.status + ": " +dataInfo.error)
            } else {
                console.log("Actualizando...")
                setToUpdate(!toUpdate)
            }
            // console.log("Data Guardada!!") 
            // setStateDb(statesMessages.saved)
            // //setDataLinkGroup(addToDo(dataLinkGroup))
            // if (params.id === "new") {
            //     router.push("/csps/roamingtracking")
            // } else {
            //     setAreThereChanges(false)
            //     setCanEdit(false)
            // }
    
        } catch (error) {
            console.log("Error en el update")
            console.log(error)
            // setStateDb(statesMessages.failed)
        }
    }


    return(
        <div>
                        
                        
            <div className="flex justify-between">
                <div className="text-[25px] p-4 text-red-900">
                    Actualización de Enlaces Internacionales
                </div>
                <div className="flex items-center p-2">
                    <Link href={"/admin/ip/briefinternationallinks"}>
                        Regresar
                    </Link>    
                </div>
            </div>
            <div className="flex p-2">
                <div className="p-2 bg-red-400 text-white border-r-[1px] border-white">
                    <Link href={"/admin/ip/internationallinks/editlinks"}>
                        Editar enlaces
                    </Link>
                </div>
                <div className="p-2 bg-red-400 text-white">
                    <Link href={"/admin/ip/internationallinks/script"}>
                        Correr Script
                    </Link>
                </div>
            </div>
            <div className="p-4">
                <label className="p-2">
                    Interface: 
                </label>
                <input 
                    type="text" 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    className="p-2 border-[1px] border-red-500"
                />
            </div>
            {
                internarionalScript
                ?
                <div className="">
                    <div>
                        <div>
                            <div className="h-[60px] text-red-900 p-4 text-[20px]">
                                Enlaces no guardados
                            </div>
                            <div>
                                {
                                    filteredToAdd.map( item => 
                                        <div >
                                            <div className="grid grid-cols-[120px_70px_200px_200px_1fr] gap-2 border-[1px] border-t-0 border-red-200 ">
                                                <div className="w-full flex items-center">
                                                    <select 
                                                        defaultValue={item.category}
                                                        onChange={(e) => setInternationalScript(internarionalScript.map( itemList => {
                                                            if (itemList.source === item.source && itemList.interface === item.interface) {
                                                                return({
                                                                    ...itemList,
                                                                    category: e.target.value
                                                                })
                                                            } else {
                                                                return ({
                                                                    ...itemList
                                                                })
                                                            }
                                                        }))}
                                                    >
                                                        {
                                                            categoryInternationalLinks.map(item =>
                                                                <option value={item} >{item}</option>
                                                            )
                                                        }
                                                    </select>
                                                </div>
                                                <div 
                                                    className="bg-yellow-500 text-white flex items-center justify-center"
                                                    onClick={() => onSaveData(item)}
                                                >
                                                    Agregar
                                                </div>
                                                <div className="flex items-center">
                                                    {
                                                        item.source
                                                    }
                                                </div>
                                                <div className="flex items-center">
                                                    {
                                                        item.interface
                                                    }
                                                </div>
                                                <div className="flex items-center">
                                                    {
                                                        item.description
                                                    }
                                                </div>
                                            </div>
                                        </div>    
                                    )

                                }
                            </div>
                        </div>
                        <div>
                            <div className="h-[60px] text-red-900 p-4 text-[20px]">
                                Enlaces posiblemente eliminados
                            </div>
                            <div>
                                {
                                    filteredToDelete.map( item => 
                                        <div >
                                            <div className="grid grid-cols-[70px_200px_200px_1fr] gap-2 border-[1px] border-t-0 border-red-200 ">
                                                <div 
                                                    className="bg-yellow-500 text-white flex items-center justify-center"
                                                    onClick={() => onDelete(item)}
                                                >
                                                    Eliminar
                                                </div>
                                                <div className="flex items-center">
                                                    {
                                                        item.source
                                                    }
                                                </div>
                                                <div className="flex items-center">
                                                    {
                                                        item.interface
                                                    }
                                                </div>
                                                <div className="flex items-center">
                                                    {
                                                        item.description
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