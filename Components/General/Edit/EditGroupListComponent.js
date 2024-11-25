"use client"

import { useState,useEffect } from "react"
import { useRouter } from "next/navigation";
import SaveIcon from '@mui/icons-material/Save';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const orderByPriority = (data) => {
    return data.sort((a,b) => a.priority-b.priority)
}

const statesMessages = {
    saved: "La informacion se guardo correctamente!",
    failed: "La información no puedo ser actualizada en la base de datos",
    inProgress: "Se esta intentando guardar la información...",
    none: ""
}

const actionToDo = {
    add: "add",
    delete: "delete",
    modified: "modified",
    none: "none" 
}

const addToDo = (data) => {
    return {
        ...data,
        lines: data.lines.map(item => {
            return({
                ...item,
                todo: "none"
            })
        })
    }
}

const newLine = {
    tag: "etiqueta",
    information: "informacion",
    priority:1
}

const newGroup = {
    id: 1,
    name: "Contacto",
    description: "Descripcion",
    lines: [
        {
            ...newLine,
            id: 1
        }
    ]
}

export default function EditGroupListCompoment ({ params }) {
    
    const [stateDb,setStateDb] = useState(statesMessages.none)
    const [dataContact,setDataContact] = useState(params.id === "new" ? newGroup : "" )
    const router = useRouter()
    
    useEffect(()=>{
        if (params.id !== "new" && /^\d*$/.test(params.id)) {
            const url = `http://172.19.128.128:3060/api/contact/${params.id}`
            fetch(url,{cache: 'no-store'})
                .then(res => res.json())
                .then(data => setDataContact(addToDo(data.data[0])))
        }
    },[])

    const dataToshow = dataContact

    const addNewLine = () => {
        setStateDb(statesMessages.none)
        setDataContact({
            ...dataContact,
            lines: [
                ...dataContact.lines,
                {
                    ...newLine,
                    id: dataContact.lines.reduce((a,v) => a>parseInt(v.id)?a:parseInt(v.id),0) +1,
                    priority: dataContact.lines.reduce((a,v) => a>parseInt(v.priority)?a:parseInt(v.priority),0)+1,
                    todo: actionToDo.add
                }
            ]
        })
    }

    const deleteLine = () => {

        if (dataContact.lines.length > 1) {
            setStateDb(statesMessages.none)
            const {id,tag,information,todo} = dataContact.lines[dataContact.lines.length-1]
            console.log(id,tag,information, todo)
            if (todo === actionToDo.add) {
                setDataContact({
                    ...dataContact,
                    lines: dataContact.lines.slice(0,-1)
                })
            } else {
                const linesModified = dataContact.lines.map(item => {
                    if (parseInt(item.id)===parseInt(id)){
                        return ({
                            ...item,
                            todo: actionToDo.delete
                        })
                    } else {
                        return ({
                            ...item
                        })
                    }
                })
                setDataContact({
                    ...dataContact,
                    lines: linesModified
                })
            }
        }
    }

    const onChangeLine = (e) => {
        setStateDb(statesMessages.none)
        const {id,name,value} = e.target
        const linesModified = dataContact.lines.map(item => {
            if (parseInt(item.id)===parseInt(id)){
                return ({
                    ...item,
                    [name]: value,
                    todo: item.todo === actionToDo.add ? item.todo : actionToDo.modified
                })
            } else {
                return ({
                    ...item
                })
            }
        })
        setDataContact({
            ...dataContact,
            lines: linesModified
        })
    }

    const onChangeLinesOrderDown = (id, priority) => {
        setStateDb(statesMessages.none)
        const isThere = dataContact.lines.find( item => parseInt(item.priority) === parseInt(priority) + 1 )
        if (isThere) {
            const newLines = dataContact.lines.map(item => {
                if (parseInt(item.id) === parseInt(id)) {
                    return({
                        ...item,
                        priority: item.priority + 1,
                        todo: item.todo === actionToDo.add ? item.todo : actionToDo.modified
                    })
                } else if (parseInt(item.id) === parseInt(isThere.id)) {
                    return({
                        ...item,
                        priority: item.priority - 1,
                        todo: item.todo === actionToDo.add ? item.todo : actionToDo.modified
                    })
                } else {
                    return({
                        ...item,
                    })
                }
            })

            setDataContact({
                ...dataContact,
                lines: orderByPriority(newLines) 
            })
        }
    }

    const onChangeLinesOrderUp = (id, priority) => {
        setStateDb(statesMessages.none)
        const isThere = dataContact.lines.find( item => parseInt(item.priority) === parseInt(priority) - 1 )
        if (isThere) {
            const newLines = dataContact.lines.map(item => {
                if (parseInt(item.id) === parseInt(id)) {
                    return({
                        ...item,
                        priority: item.priority - 1,
                        todo: item.todo === actionToDo.add ? item.todo : actionToDo.modified
                    })
                } else if (parseInt(item.id) === parseInt(isThere.id)) {
                    return({
                        ...item,
                        priority: item.priority + 1,
                        todo: item.todo === actionToDo.add ? item.todo : actionToDo.modified
                    })
                } else {
                    return({
                        ...item,
                    })
                }
            })

            setDataContact({
                ...dataContact,
                lines: orderByPriority(newLines)  
            })
        }
    }

    const onSaveData = async () => {
        setStateDb(statesMessages.inProgress)
        const methodHttp = params.id === "new"?'POST':'PUT'
        try {
            const requestOptions = {
                method: methodHttp,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dataContact)
            }
            const api = "http://172.19.128.128:3060/api/contact"
    
            const response = await fetch(api,requestOptions)
            const dataInfo = await response.json()
            if (dataInfo.error) {
                throw new Error("Error "+ dataInfo.status + ": " +dataInfo.error)
            }
            console.log("Data Guardada!!") 
            setStateDb(statesMessages.saved)
            setDataContact(addToDo(dataContact))
            if (params.id === "new") {
                router.push("/general/contacts")
            }

        } catch (error) {
            console.log("Error en el update")
            console.log(error)
            setStateDb(statesMessages.failed)
        }
    }

    const onChangeName = (e) => {
        setStateDb(statesMessages.none)
        setDataContact({
            ...dataContact,
            name: e.target.value
        })
    }

    const onChangeDescription = (e) => {
        setStateDb(statesMessages.none)
        console.log(e.target.id,e.target.value)
        setDataContact({
            ...dataContact,
            description: e.target.value,
        })
    }

    console.log(dataContact)

    return(
        <div>
            {   
                /^\d*$/.test(params.id) || params.id === "new"
                ?
                    (dataContact
                    ?
                        <div>
                            <div className="h-[50px] w-full">
                                <div className={`h-full w-full flex text-center justify-center items-center text-white ${stateDb === statesMessages.inProgress?"bg-yellow-400":(stateDb === statesMessages.saved?"bg-green-400":(stateDb === statesMessages.failed?"bg-red-400":"bg-green-400"))}`}>
                                    {
                                        stateDb
                                    }
                                </div>
                            </div>
                            <div className='w-full flex justify-end'>
                                <div className='flex h-[50px] w-[50px] p-2'>
                                    <ArrowBackIcon className="h-full w-full text-red-400" onClick={()=>router.push("/general/contacts/")}  />
                                </div>
                                <div className='flex h-[50px] w-[50px] p-2'>
                                    <SaveIcon className="h-full w-full text-yellow-400" onClick={onSaveData}  />
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-col rounded-xl overflow-hidden shadow-lg shadow-red-500/50">
                                    <div className="flex flex-col bg-red-500 p-4 text-white font-bold">
                                        <input value={dataToshow.name} className="bg-transparent" onChange={onChangeName} />
                                        <input value={dataToshow.description} className="bg-transparent text-xs text-red-200" onChange={onChangeDescription} />
                                    </div>
                                    <div className="py-4">
                                        {
                                            dataToshow.lines
                                            ?
                                            dataToshow.lines.map(item=>
                                                <div className="flex w-full border-b-2 border-red-100">
                                                    <div className="flex flex-col py-2 px-4 w-full break-words">
                                                        <div>
                                                            <ArrowUpwardIcon className="text-yellow-400" onClick={()=>onChangeLinesOrderUp(item.id,item.priority)} />
                                                            <ArrowDownwardIcon className="text-yellow-400" onClick={()=>onChangeLinesOrderDown(item.id,item.priority)} />
                                                        </div>
                                                        <input id={item.id} name="tag" value={item.tag} className="bg-transparent mr-2 text-gray-500 " onChange={onChangeLine} />
                                                        <div>
                                                            :
                                                        </div>
                                                        <input id={item.id} name="information" value={item.information} className="bg-transparent text-gray-900 w-full overflow-hidden" onChange={onChangeLine} />
                                                    </div>
                                                    
                                                </div>
                                            )
                                            :
                                            ""
                                        }
                                    </div>
                                </div>   
                                <div>
                                    <AddCircleIcon className="text-yellow-400 " onClick={addNewLine} />
                                    <RemoveCircleIcon className="text-yellow-400" onClick={deleteLine} />
                                </div>                    
                            </div>
                        </div>
                    :
                    "Cargando...")
                :
                "ID incorrecto"
            }

        </div>

    )
}