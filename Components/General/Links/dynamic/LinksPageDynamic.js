"use client"

import SaveIcon from '@mui/icons-material/Save';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const orderByPriority = (data) => {
    return data.sort((a,b) => a.priority-b.priority)
}

const statesMessages = {
    saved: "La informacion se guardo correctamente!",
    failed: "La información no puedo ser actualizada en la base de datos",
    inProgress: "Se esta intentando guardar la información...",
    none: ""
}

const linkLineNew = {
    id:1,
    line: "linea",
    link: "link",
    comment: "comentario",
    priority: 1,
    todo: "add"
}

const linkGroupNew = {
    groupid: 2,
    groupname: "grupo 1",
    bubleid: 1,
    bubletitle: "Titulo 1",
    lines: [
        linkLineNew 
    ]
}

const dataGroupNew = [
    {
        id:1,
        name: "uno"
    },
    {
        id:2,
        name: "dos"
    },
    {
        id:3,
        name: "tres"
    }
]

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
                todo: actionToDo.none
            })
        })
    }
}

export default function LinksPageDynamic ({params}) {

    const [dataLinkGroup, setDataLinkGroup] = useState(params.id==="new"?linkGroupNew:"")
    const [dataGroup,setDataGroup] = useState("")
    const [stateDb,setStateDb] = useState(statesMessages.none)
    const [update,setUpdate] = useState(false)
    const dataToShow = dataLinkGroup ? {
        ...dataLinkGroup,
        lines: orderByPriority(dataLinkGroup.lines.filter( item => item.todo != actionToDo.delete))
    } : ""
    const limitToUp = 0
    const limitToDown = dataToShow?dataToShow.lines.length - 1:0

    useEffect(()=>{
        console.log("Carga de data!!")
        if (params.id !== "new") {
            const urlDataLink =  `http://172.19.128.128:3060/api/links/${params.id}`
            fetch(urlDataLink, {cache: 'no-store'})
            .then( res => res.json())
            .then( data => setDataLinkGroup(addToDo(data.data[0])))
        }

        const urlGroup = "http://172.19.128.128:3060/api/links/group"
        fetch(urlGroup, {cache: 'no-store'})
            .then( res => res.json())
            .then( data => setDataGroup(data.data))
    },[update])

    const router = useRouter()

    const onChangeLine = (e) => {
        setStateDb(statesMessages.none)
        const {id,name,value} = e.target
        console.log(id,name,value)
        const linesModified = dataLinkGroup.lines.map(item => {
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
        setDataLinkGroup({
            ...dataLinkGroup,
            lines: linesModified
        })
    }

    const onChangeTitle = (e) => {
        setDataLinkGroup({
            ...dataLinkGroup,
            bubletitle: e.target.value
        })
    }

    const onChangeGroup = (e) => {
        setStateDb(statesMessages.none)
        console.log(e.target.id,e.target.value)
        setDataLinkGroup({
            ...dataLinkGroup,
            groupid: e.target.value,
            groupname: dataGroup.find(item => parseInt(item.id) === parseInt(e.target.value)).name
        })
    }

    const addNewLine = () => {
        setStateDb(statesMessages.none)
        setDataLinkGroup({
            ...dataLinkGroup,
            lines: [
                ...dataLinkGroup.lines,
                {
                    ...linkLineNew,
                    id: dataLinkGroup.lines.reduce((a,v) => a>parseInt(v.id)?a:parseInt(v.id),0) +1,
                    priority: dataLinkGroup.lines.reduce((a,v) => a>parseInt(v.priority)?a:parseInt(v.priority),0)+1,
                    todo: actionToDo.add
                }
            ]
        })
    }

    const deleteLine = (item) => {

        setStateDb(statesMessages.none)
        if (item. todo === actionToDo.add) {
            setDataLinkGroup({
                ...dataLinkGroup,
                lines: dataLinkGroup.filter( itemToFilter => itemToFilter.id !== item.id)
            })
        } else {
            const linesModified = dataLinkGroup.lines.map(itemToModify => {
                if (parseInt(itemToModify.id)===parseInt(item.id)){
                    return ({
                        ...itemToModify,
                        todo: actionToDo.delete
                    })
                } else {
                    return ({
                        ...itemToModify
                    })
                }
            })
            setDataLinkGroup({
                ...dataLinkGroup,
                lines: linesModified
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
                body: JSON.stringify(dataLinkGroup)
            }
            const api = "http://172.19.128.128:3060/api/links"
    
            const response = await fetch(api,requestOptions)
            const dataInfo = await response.json()
            if (dataInfo.error) {
                throw new Error("Error "+ dataInfo.status + ": " +dataInfo.error)
            }
            console.log("Data Guardada!!") 
            setStateDb(statesMessages.saved)
            setDataLinkGroup(addToDo(dataLinkGroup))
            if (params.id === "new") {
                router.push("/general/links")
            } else {
                setDataLinkGroup("")
                setUpdate(!update)
            }


        } catch (error) {
            console.log("Error en el update")
            console.log(error)
            setStateDb(statesMessages.failed)
        }
    }

    const onChangeLinesOrderDown = (entryItem,index) => {
        setStateDb(statesMessages.none)
        if (index < limitToDown) {
            console.log("Baja la linea")
            const newLines = dataLinkGroup.lines.map(item => {
                if (parseInt(item.id) === parseInt(entryItem.id)) {
                    return({
                        ...item,
                        priority: dataToShow.lines[index+1].priority,
                        todo: item.todo === actionToDo.add ? item.todo : actionToDo.modified
                    })
                } else if (parseInt(item.id) === parseInt(dataToShow.lines[index+1].id)) {
                    return({
                        ...item,
                        priority: entryItem.priority,
                        todo: item.todo === actionToDo.add ? item.todo : actionToDo.modified
                    })
                } else {
                    return({
                        ...item,
                    })
                }
            })

            setDataLinkGroup({
                ...dataLinkGroup,
                lines: orderByPriority(newLines)  
            })
        }
    }

    const onChangeLinesOrderUp = (entryItem,index) => {
        setStateDb(statesMessages.none)
        if (index > limitToUp) {
            console.log("Subiendo Linea")
            const newLines = dataLinkGroup.lines.map(item => {
                if (parseInt(item.id) === parseInt(entryItem.id)) {
                    return({
                        ...item,
                        priority: dataToShow.lines[index-1].priority,
                        todo: item.todo === actionToDo.add ? item.todo : actionToDo.modified
                    })
                } else if (parseInt(item.id) === parseInt(dataToShow.lines[index-1].id)) {
                    return({
                        ...item,
                        priority: entryItem.priority,
                        todo: item.todo === actionToDo.add ? item.todo : actionToDo.modified
                    })
                } else {
                    return({
                        ...item,
                    })
                }
            })

            setDataLinkGroup({
                ...dataLinkGroup,
                lines: orderByPriority(newLines)  
            })
        }
    }


    return(
        <div>
            {
                dataGroup&&dataLinkGroup
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
                            <ArrowBackIcon className="h-full w-full text-red-400" onClick={()=>router.push("/general/links/")}  />
                        </div>
                        <div className='flex h-[50px] w-[50px] p-2'>
                            <SaveIcon className="h-full w-full text-yellow-400" onClick={onSaveData}  />
                        </div>
                    </div>
                    <div className="mb-2">
                        <div className="flex p-4 bg-red-500 text-white">
                            <label>Grupo:</label>
                            <select className="w-[200px] text-black ml-2" onChange={onChangeGroup} value={dataLinkGroup.groupid} >
                                {
                                    dataGroup.map(item => 
                                        <option name={item.name} value={item.id} key={item.id} >
                                            {
                                                item.name
                                            }
                                        </option>
                                    )
                                }
        
                            </select>
                        </div>
                    </div>
                    <div>
                        <div className="h-full mb-6">
                            <div className="flex flex-col shadow-lg shadow-red-500/50 rounded-xl pb-4 overflow-hidden">
                                <div className="flex w-full font-bold justify-center text-white py-3 bg-red-500 ">
                                    <input type="text" value={dataLinkGroup.bubletitle} className="w-full flex text-center bg-transparent" onChange={onChangeTitle} />
                                        
                                </div>
                                <div>
                                    {
                                        dataToShow.lines.map((item, index) => 
                                            <div key={item.id} className="text-gray-600 font-bold py-2 border-b-2 border-red-100">
                                                <div className='flex justify-between'>
                                                    <div>
                                                        <ArrowDownwardIcon onClick={()=>onChangeLinesOrderDown(item,index)} className="text-yellow-400" />
                                                        <ArrowUpwardIcon onClick={()=>onChangeLinesOrderUp(item,index)} className="text-yellow-400" />
                                                    </div>
                                                    <div>
                                                        <DeleteForeverIcon className="text-red-400 h-[30px] w-[30px] cursor-pointer" onClick={()=>deleteLine(item)} />
                                                    </div>
                                                </div>
                                                <input type="text" id={item.id} name={"line"} value={item.line} className="flex w-full px-5  "  onChange={onChangeLine} />
                                                <input type="text" id={item.id} name={"link"} value={item.link} className="flex w-full px-5 "  onChange={onChangeLine} />
                                                <input type="text" id={item.id} name={"comment"} value={item.comment} className="flex w-full px-6 text-xs text-gray-400" onChange={onChangeLine} />
                                                    
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <div className='h-[50px] w-[50px]'>
                            <AddCircleIcon className="h-full w-full text-yellow-400" onClick={addNewLine} />
                        </div>

                    </div>
                </div>
                :
                "Cargando..."
            }
        </div>
    )
}