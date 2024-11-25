"use client"

import Link from "next/link"
import { useState,useEffect } from "react"

import categoryInternationalLinks from "../../../../data/ip/categoryInternationalLinks.json"

const addChangeField = (data) => {
    return data.map( item => {
        return ({
            ...item,
            change: false
        })
    } )
}

export default function EditLinks () {

    const [internationalLinks,setInternationalLinks] = useState([])
    const [filter,setFilter] = useState({
        category: "",
        source: "",
        interface: "",
        description: ""
    })
    const [toUpdate, setToUpdate] = useState(false)

    const internationalLinksFiltered = internationalLinks.filter( item => 
        item.category.toLowerCase().includes(filter.category.toLowerCase())
        &&
        item.interface.toLowerCase().includes(filter.interface.toLowerCase())
        &&
        item.description.toLowerCase().includes(filter.description.toLowerCase())
        &&
        item.source.toLowerCase().includes(filter.source.toLowerCase())
    )

    const internationalLinksOnlyChanged = internationalLinks.filter( item => item.change)

    useEffect(()=>{
        console.log("Consultando API")
        const urlLinks = "http://172.19.128.128:3060/api/ip/international/links"
        fetch(urlLinks)
            .then( res => res.json())
            .then( data => setInternationalLinks(addChangeField(data.data)))
    },[toUpdate])

    const onSaveData = async () => {
        //const methodHttp = params.id === "new"?'POST':'PUT'
        console.log("Iniciando Guardado")
        const methodHttp = 'PUT'
        try {
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-Type': 'text/plain'},
                body: JSON.stringify(internationalLinksOnlyChanged)
            }
            const api = "http://172.19.128.128:3060/api/scripts/ip/international"
    
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
    
        } catch (error) {
            console.log("Error en el update")
            console.log(error)
            // setStateDb(statesMessages.failed)
        }
    }


    console.log("internationalLinksOnlyChanged")
    console.log(internationalLinksOnlyChanged)


    return(
        <div className="w-full">
            <div className="w-full flex justify-end">
                <Link href={"/admin/ip/internationallinks"} className="p-2">
                    regresar
                </Link>
            </div>
            <div>
                <div>
                    {
                        internationalLinksOnlyChanged.length
                        ?
                        <div 
                            className="p-2 bg-yellow-400 text-white w-[150px] mb-2 flex justify-center"
                            onClick={onSaveData}
                        >
                            Guardar cambios
                        </div>
                        :
                        ""
                    }
                </div>

                <div className="grid grid-cols-[150px_200px_250px_1fr] gap-2 border-b-[1px] border-red-400 bg-red-400 ">
                    <div className="py-2">
                        <input className="w-full" type="text" onChange={(e) => setFilter({...filter, category: e.target.value})} />
                    </div>
                    <div className="py-2">
                        <input className="w-full" type="text" onChange={(e) => setFilter({...filter, source: e.target.value})} />
                    </div>   
                    <div className="py-2">
                        <input className="w-full" type="text" onChange={(e) => setFilter({...filter, interface: e.target.value})} /> 
                    </div>  
                    <div className="py-2">
                        <input className="w-full" type="text" onChange={(e) => setFilter({...filter, description: e.target.value})} />
                    </div>   

                </div>
                {
                    internationalLinksFiltered.map( item =>
                        <div key={item.id} className={`grid grid-cols-[150px_200px_250px_1fr] gap-2 border-b-[1px] border-red-400 ${item.change?"bg-red-200":""}`}>
                            <div className="flex w-full items-center">
                                <select
                                    className="bg-transparent p-2"
                                    defaultValue={item.category}
                                    onChange={(e) => setInternationalLinks(internationalLinks.map(linkItem => {
                                        if (linkItem.id === item.id) {
                                            return({
                                                ...linkItem,
                                                category: e.target.value,
                                                change: true
                                            })
                                        } else {
                                            return ({
                                                ...linkItem
                                            })
                                        }
                                    }))}
                                >
                                    {
                                        categoryInternationalLinks.map( optionValue =>
                                            <option key={optionValue} value={optionValue} >{optionValue}</option>
                                        )
                                    }
                                </select>
                            </div>
                            <div>
                                {
                                    `${item.source}`
                                }
                            </div>   
                            <div>
                                {
                                    `${item.interface}`
                                }
                            </div>  
                            <div>
                                {
                                    `${item.description}`
                                }
                            </div>   

                        </div>
                    )
                }
            </div>
        </div>
    )
}