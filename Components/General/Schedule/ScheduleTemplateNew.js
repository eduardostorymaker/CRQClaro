"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const linkImage = (file,name)  => {
    return `http://172.19.128.128:4444/images/${file}/${name}`
}

export default function ScheduleTemplateNew ({ group }) {
    const router = useRouter()

    const [dataGroup,setDataGroup] = useState("")
    const [dataSchedule, setDataSchedule] = useState("")
    const [canEdit,setCanEdit] = useState(false)
    const [trigger,setTrigger] = useState(false)
    const [editTitle,setEditTitle] = useState("")
    const selectedGroup = dataGroup?dataGroup.find(item => parseInt(item.id) === parseInt(group)):""
    const dataScheduleFiltered = dataSchedule?dataSchedule.filter(item => item.groupid === selectedGroup?.id):""

    // console.log("selectedGroup.id")
    // console.log(selectedGroup.id)

    useEffect(()=>{
        const urlGroup = "http://172.19.128.128:3060/api/schedulesimagesgroup"
        fetch(urlGroup,{cache: "no-store"})
            .then( res => res.json())
            .then( data => {
                setDataGroup(data.data)
                // if (!group) {
                //     router.push(`/general/schedulesv2/view?group=${data.data[0].id}`)
                // }
            })
        const urlSchedule = "http://172.19.128.128:3060/api/schedulesimages"
        fetch(urlSchedule,{cache: "no-store"})
            .then( res => res.json())
            .then( data => setDataSchedule(data.data))
    },[trigger])

    const onChangeTitle = (e,id) => {
        const newData = dataSchedule.map(item=>{
            if (item.id === id) {
                return {
                    ...item,
                    name: e.target.value
                }
            } else {
                return {
                    ...item
                }
            }
        })
        setDataSchedule(newData)
    }

    const loadToServer = async () => {

        try {
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dataSchedule)
            }
            const api = "http://172.19.128.128:3060/api/schedulesimages"
    
            const response = await fetch(api,requestOptions)
            const dataInfo = await response.json()
            if (dataInfo.error) {
                throw new Error("Error "+ dataInfo.status + ": " +dataInfo.error)
            }
            console.log(dataInfo) 
            setCanEdit(false)
            setEditTitle(false)
            // setTryToDb(tryToDbStates.success)
            // setCanEdit(false)
            // setAreThereChanges(false)
        } catch (errorDB) {
            console.log("Error en la DB")
            console.log(errorDB)
            //setTryToDb(tryToDbStates.fault)   
        }
    }

    const deleteScheduleImage = async (id) => {

        const areYouSure = window.confirm("Se eliminará ese horario de la Base de Datos ¿Desea continuar?")
        if (areYouSure) {
  
            try {
                const requestOptions = {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id: id
                    })
                }
                const api = "http://172.19.128.128:3060/api/schedulesimages"
        
                const response = await fetch(api,requestOptions)
                const dataInfo = await response.json()
                if (dataInfo.error) {
                    throw new Error("Error "+ dataInfo.status + ": " +dataInfo.error)
                }
                console.log(dataInfo) 
                //router.push(`/general/schedulesv2/view?group=${selectedGroup.id}`)
                setTrigger(!trigger)
    
            } catch (errorDB) {
                console.log("Error en la DB")
                console.log(errorDB)
                //setTryToDb(tryToDbStates.fault)   
            }
        }

    }

    const sendToInit = () => {
        router.push(`/general/schedulesv2/view?group=${1}`)
    }

    return(
        <div className="w-full">
            <div className="w-full">
                <div className="w-full">
                    {
                        dataGroup
                        ?
                        <div className="w-full h-[50px] bg-red-500 flex justify-between">
                            <div className="w-full h-full flex">
                                {
                                    dataGroup.map(item => 
                                        <div 
                                            className={`h-full p-2 flex items-center border-r-[1px] border-white cursor-pointer ${item.id === selectedGroup?.id?"bg-white text-red-700":"text-white" }`} 
                                            onClick={()=>router.push(`/general/schedulesv2/view?group=${item.id}`)}
                                        >
                                            {
                                                item.name
                                            }
                                        </div>
                                    )
                                }
                            </div>
                            <div className="h-full flex items-center pr-2">
                                {
                                    canEdit
                                    ?
                                    <div className="text-white">
                                        <CloseIcon onClick={()=> {
                                            setCanEdit(false)
                                            setEditTitle(false)
                                        }} 
                                        />
                                    </div>
                                    :
                                    <div className="text-yellow-400">
                                        <EditIcon onClick={()=>setCanEdit(true)} />
                                    </div>

                                }
                                
                            </div>
                        </div>
                        :
                        "Cargando..."
                    }
                </div>
                <div>
                    <div>
                        {
                            dataSchedule
                            ?
                            <div>
                                <div className="w-full h-[50px] flex justify-end items-center">
                                    {
                                        group
                                        ?
                                        <div className="text-white bg-yellow-400 p-2" onClick={()=> router.push(`/general/schedulesv2/${selectedGroup.id}?name=${selectedGroup.name}&path=${selectedGroup.folder}`)} >
                                            Agregar
                                        </div>
                                        :
                                        ""
                                    }
            
                                </div>
                                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-2 p-2">
                                    {   
                                        dataScheduleFiltered.length
                                        ?
                                        dataScheduleFiltered.map(item => 
                                            <div className="rounded-xl shadow-lg shadow-red-500/50 overflow-hidden">
                                                <div className="p-2">
                                                    {
                                                        canEdit
                                                        ?
                                                        (
                                                            editTitle
                                                            ?
                                                            ""
                                                            :
                                                            (
                                                                <div className="flex">
                                                                    <div className="text-red-500 p-2">
                                                                        <DeleteForeverIcon onClick={()=>deleteScheduleImage(item.id)} />
                                                                    </div>
                                                                    <div className="text-yellow-400 p-2">
                                                                        <EditIcon onClick={()=>setEditTitle(true)} />
                                                                    </div>
                                                                </div>
                                                                
                                                            )
                                                        )
                                                        :
                                                        ""
                                                    }
                                                    
                                                    {
                                                        editTitle
                                                        ?
                                                        <div className="w-full">
                                                            <input value={item.name} className="w-full" onChange={(e)=>onChangeTitle(e,item.id)} />
                                                            <div className="flex">
                                                                <div className="text-red-500 p-2">
                                                                    <CloseIcon onClick={()=>setEditTitle(false)} />
                                                                </div>
                                                                <div className="text-yellow-400 p-2">
                                                                    <SaveIcon onClick={loadToServer} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className="w-full">
                                                        <div>
                                                            {
                                                                item.name
                                                            }
                                                        </div>
                                                    </div>
                                                    }
                                                </div>
                                                <Link target="_blank" href={linkImage(item.folder,item.file)} >
                                                    {
                                                        console.log("Terminacion")
                                                    }
                                                    {
                                                        console.log(item.file.split(".")[item.file.split(".").length - 1])
                                                    }
                                                    {
                                                        "jpg/jpeg/png/tif/bmp/gif".includes(item.file.toLowerCase().split(".")[item.file.split(".").length - 1])
                                                        ?
                                                        <img src={linkImage(item.folder,item.file)} />
                                                        :
                                                        <div>Archivo</div>
                                                    }
                                                </Link>
                                            </div>
                                        )
                                        :
                                        <div className="pl-4 font-bold">
                                            Selecciona un grupo para mostrar los horarios!
                                        </div>
                                    }
                                </div>
                            </div>
                            :
                            "Cargando..."
                        }
                    </div>
                </div>
                <div>
                    
                </div>
            </div>

        </div>
    )
}