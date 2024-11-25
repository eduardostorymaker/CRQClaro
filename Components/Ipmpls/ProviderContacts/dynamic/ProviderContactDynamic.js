"use client"

import { Select } from "@mui/material"
import { useEffect, useState } from "react"

import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useRouter } from "next/navigation";

const type = ["SERVICIO","TRANSPORTE"]

const statesMessages = {
    saved: "La informacion se guardo correctamente!",
    failed: "La información no puedo ser actualizada en la base de datos",
    inProgress: "Se esta intentando guardar la información...",
    none: ""
}

const newDataProvider = 
    {
        id: "1",
        type: "SERVICIO",
        provider: "",
        phone: "",
        to: "",
        cc: "",
        subject: "",
        body: ""
    }

export default function ProviderContactDynamic ({params}) {

    const router = useRouter()
    const [dataProvider,setDataProvider] = useState(params.id==="new"?newDataProvider:"")
    const [canEdit,setCanEdit] = useState(params.id==="new"?true:false)
    const [areThereChanges,setAreThereChanges] = useState(false)
    const [stateDb,setStateDb] = useState(statesMessages.none)
    const [firstData,setFirstData] = useState("")

    useEffect(()=>{
        if (/^[0-9]*$/.test(params.id) ) {
            const url = `http://172.19.128.128:3060/api/internetprovider/${params.id}`
            fetch(url,{cache: "no-cache"})
                .then(res => res.json())
                .then(data => {
                    setDataProvider(data.data[0])
                    setFirstData(data.data[0])
                })
                
            }
    },[])   

    const onChangeForm = (e) => {
        setAreThereChanges(true)
        setDataProvider({
            ...dataProvider,
            [e.target.name]:e.target.value
        })
    }

    const onCloseEdit = () => {
        if (areThereChanges) {
            const areYouSure = window.confirm("Se perdera los cambios ¿Desea continuar?")
            if (areYouSure) {
                if (params.id === "new") {
                    router.push("/ipmpls/providercontact")
                } else {
                    setCanEdit(false)
                    setDataProvider(firstData)
                }
            }
        } else {
            if (params.id === "new") {
                router.push("/ipmpls/providercontact")
            } else {
                setCanEdit(false)
            }
        }
    }

    const onEdit = () => {
        setCanEdit(true)
        setAreThereChanges(false)
    }

    const onBack = () => {
        router.push("/ipmpls/providercontact")
    }

    const onSave = async () => {
        setStateDb(statesMessages.inProgress)
        const methodHttp = params.id === "new"?'POST':'PUT'
        try {
            const requestOptions = {
                method: methodHttp,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dataProvider)
            }
            const api = "http://172.19.128.128:3060/api/internetprovider"
    
            const response = await fetch(api,requestOptions)
            const dataInfo = await response.json()
            if (dataInfo.error) {
                throw new Error("Error "+ dataInfo.status + ": " +dataInfo.error)
            }
            console.log("Data Guardada!!") 
            setStateDb(statesMessages.saved)
            //setDataLinkGroup(addToDo(dataLinkGroup))
            if (params.id === "new") {
                router.push("/ipmpls/providercontact")
            } else {
                setAreThereChanges(false)
                setCanEdit(false)
            }
    
        } catch (error) {
            console.log("Error en el update")
            console.log(error)
            setStateDb(statesMessages.failed)
        }
    }

    console.log(dataProvider)
    return(
        <div>
            {
                dataProvider
                ?
                <div>
                    <div className="h-[50px] w-full">
                        <div className={`h-full w-full flex text-center justify-center items-center text-white ${stateDb === statesMessages.inProgress?"bg-yellow-400":(stateDb === statesMessages.saved?"bg-green-400":(stateDb === statesMessages.failed?"bg-red-400":"bg-green-400"))}`}>
                            {
                                stateDb
                            }
                        </div>
                    </div>
                    <div className="flex w-full justify-end">
                        {
                            canEdit
                            ?
                            <div className="flex">
                                <div className="p-2">
                                    <SaveIcon className="text-yellow-400" onClick={onSave}/>    
                                </div>
                                <div className="p-2" onClick={onCloseEdit}>
                                    <CloseIcon className="text-red-500" />    
                                </div>
                            </div>
                            :
                            <div className="flex">
                                <div className="p-2">
                                    <ArrowBackIcon className="text-red-500" onClick={onBack} />    
                                </div>
                                <div className="p-2">
                                    <EditIcon className="text-yellow-400" onClick={onEdit} />    
                                </div>
                            </div>
                        }
                    </div>
                    <div className="bg-red-500 text-white">
                        <div>
                            <div className="p-2">
                                tipo:
                            </div>
                            <select className={`text-gray-800 ${canEdit?"bg-white":"bg-gray-300"}`} name={"type"} defaultValue={dataProvider.type} onChange={(e)=>canEdit&&onChangeForm(e)} >
                                {
                                    type.map(item=>
                                        <option id={item} value={item}  >
                                            {
                                                item
                                            }
                                        </option>
                                    )
                                }
                            </select>
                        </div>
                        <div>
                            <div className="p-2">
                                proveedor:
                            </div>
                            <input  className={`p-2 w-full text-gray-800 ${canEdit?"bg-white":"bg-gray-300"}`} type="text" name={"provider"} value={dataProvider.provider} onChange={(e)=>canEdit&&onChangeForm(e)} />
                        </div>
                        <div>
                            <div className="p-2">
                                telefono:
                            </div>
                            <input  className={`p-2 w-full text-gray-800 ${canEdit?"bg-white":"bg-gray-300"}`} type="text" name={"phone"} value={dataProvider.phone} onChange={(e)=>canEdit&&onChangeForm(e)} />
                        </div>
                        <div>
                            <div className="p-2">
                                to:
                            </div>
                            <input  className={`p-2 w-full text-gray-800 ${canEdit?"bg-white":"bg-gray-300"}`} type="text" name={"to"} value={dataProvider.to} onChange={(e)=>canEdit&&onChangeForm(e)} />
                        </div>
                        <div>
                            <div className="p-2">
                                cc:
                            </div>
                            <input  className={`p-2 w-full text-gray-800 ${canEdit?"bg-white":"bg-gray-300"}`} type="text" name={"cc"} value={dataProvider.cc} onChange={(e)=>canEdit&&onChangeForm(e)} />
                        </div>
                        <div>
                            <div className="p-2">
                                Subject:
                            </div>
                            <input  className={`p-2 w-full text-gray-800 ${canEdit?"bg-white":"bg-gray-300"}`} type="text" name={"subject"} value={dataProvider.subject} onChange={(e)=>canEdit&&onChangeForm(e)} />
                        </div>
                        <div>
                            <div className="p-2">
                                Body:
                            </div>
                            <textarea className={`w-full h-[200px] p-2 text-gray-800 ${canEdit?"bg-white":"bg-gray-300"}`} type="text" name={"body"} value={dataProvider.body} onChange={(e)=>canEdit&&onChangeForm(e)} />
                        </div>
                    </div>
                </div>
                :
                "Cargando..."
            }
        </div>
    )
}