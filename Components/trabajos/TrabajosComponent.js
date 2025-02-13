"use client"

import { useEffect } from "react"
import { useState } from "react"
import SeveridadSelectionComponent from "./SeveridadSelectionComponent"
import DerivarSelectionComponent from "./DerivarSelectionComponent"
import EditarSelectionComponent from "./EditarSelectionComponent"
import EditIcon from '@mui/icons-material/Edit';
import Link from "next/link"

export default function TrabajosComponent () {

    const [dataFromServer,setDataFromServer] = useState([])
    
    const [openWindow,setOpenWindow] = useState(false)
    const [itemSelected,setItemSelected] = useState("")
    const [dataBaseCharging,setDataBaseCharging] = useState(false)
    const [dataBaseError,setDataBaseError] = useState("")
    const [updateData,setUpdateData] = useState(false)
    const [updatingData,setUpdatingData] = useState(false)
    const [optionSelected, setOptionSelected] = useState("")
    const [menuFilter,setMenuFilter] = useState("")
    const [nocFilter, setNocFilter] = useState("")
    const [atFilter,setAtFilter] = useState("")
    const [viewAllItems,setViewAllItems] = useState(false)
    const [crqSearchValue,setCrqSearchValue] = useState("")
    const [tareaSearchValue,setTareaSearchValue] = useState("")
    const [resumenSearchValue,setResumenSearchValue] = useState("")
    const [elementoSearchValue,setElementoSearchValue] = useState("")
    const [checkedList,setCheckedList] = useState([])
    console.log("dataFromServer")
    console.log(dataFromServer)
    console.log("updatingData")
    console.log(updatingData)
    console.log("Cargando todo el componente!!")
    console.log("menuFilter")
    console.log(menuFilter)

    const dataFilteredForView = dataFromServer?(viewAllItems?dataFromServer:dataFromServer.filter(item => item.status !== "OK" && item.status !== "RETIRADO" )):""
    const dataFilteredByCrq = dataFilteredForView?dataFilteredForView.filter(item =>item.crq.toLowerCase().includes(crqSearchValue.toLowerCase())):""
    const dataFilteredByTarea = dataFilteredByCrq?dataFilteredByCrq.filter(item =>item.tarea.toLowerCase().includes(tareaSearchValue.toLowerCase())):""
    const dataFilteredByResumen = dataFilteredByTarea?dataFilteredByTarea.filter(item =>item.resumen.toLowerCase().includes(resumenSearchValue.toLowerCase())):""
    const dataFilteredByElemento = dataFilteredByResumen?dataFilteredByResumen.filter(item =>item.elemento.toLowerCase().includes(elementoSearchValue.toLowerCase())):""
    const dataFilteredWithNoc = dataFilteredByElemento.filter(item => item.noc.includes(nocFilter))
    const dataFiltered = dataFilteredWithNoc.filter(item => item.areatecnologica.includes(atFilter))
    console.log("dataFiltered")
    console.log(dataFiltered)

    const addingFormatToMenuFilter = (menu) => {
        return menu.map( item => {

            return {
                ...item,
                selected: false,
                count: 0,
                checkedCount: 0,
                arealist: item.arealist.map( areaitem => {
                    return {
                        ...areaitem,
                        selected: false,
                        count: 0,
                        checkedCount: 0,
                    }
                })
            }
        })
    }

    const resumeData = (list,menu) => {
        if (list.length && menu) {
            return list.reduce((a,v)=>{
                return a.map( item =>{
                    return {
                        ...item,
                        count: v.noc === item.noctitle ? item.count + 1 : item.count,
                        checkedCount: !v.status ? (v.noc === item.noctitle ? item.checkedCount + 1 : item.checkedCount) : item.checkedCount,
                        arealist: item.arealist.map( areaitem => {
                            return {
                                ...areaitem,
                                count: v.areatecnologica === areaitem.areatecnologica ? areaitem.count + 1: areaitem.count,
                                checkedCount: !v.status ? (v.areatecnologica === areaitem.areatecnologica ? areaitem.checkedCount + 1: areaitem.checkedCount) : areaitem.checkedCount,
                            }
                        })
                    }
                })
            },menu)
        }

        return ""
    }

    const menuFilterFormatted = menuFilter?addingFormatToMenuFilter(menuFilter):""
    const menuFilterResumed = resumeData(dataFromServer,menuFilterFormatted)

    useEffect(()=>{
        console.log("Solicitando informacion de todos los trabajos")
        setUpdatingData(true)
        const api = "http://172.19.128.128:3060/api/eficiencia/trabajosprogramados"
        fetch(api,{cache: "no-store"})
            .then( res => res.json())
            .then( data => {
                setDataFromServer(data.data)
                setUpdatingData(false)
            })
    },[])

    useEffect(()=>{
        console.log("Solicitando informacion de menu")
        const api = "http://172.19.128.128:3060/api/eficiencia/trabajosprogramados/grouplist"
        fetch(api,{cache: "no-store"})
            .then( res => res.json())
            .then( data => {
                setMenuFilter(data.data[0].equiposnoc.grupos)
                // setGroupSelected(item.severidad)
                // setColorSelected(item.rojo)
            })
    },[])

    

    const loadToServer = async (item) => {
        console.log("inicia guardado en DB")
        setDataBaseCharging(true)
        

        try {
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-Type': 'text/plain'},
                body: JSON.stringify(item)
            }
            const api = "http://172.19.128.128:3060/api/eficiencia/trabajosprogramados/severidadcolor"
    
            const response = await fetch(api,requestOptions)
            const dataInfo = await response.json()
            if (dataInfo.error) {
                throw new Error("Error "+ dataInfo.status + ": " +dataInfo.error)
            }
            console.log(dataInfo) 
            console.log("fin guardado db")
            setDataBaseCharging(false)
        } catch (errorDB) {
            console.log("Error en la DB")
            console.log(errorDB)
            setDataBaseError(errorDB)
            //setTryToDb(tryToDbStates.fault)   
        }
    }

    const getUpdatedData = async () => {
        console.log("getting data again")
        setUpdatingData(true)
        const api = "http://172.19.128.128:3060/api/eficiencia/trabajosprogramados"
        const res = await fetch(api, {cache: "no-store"})
        const data = await res.json()
        setDataFromServer(data.data)
        setUpdatingData(false)
    }


    const saveSeverityChanges = async (item) => {
        setUpdatingData(true)
        const res = window.confirm("Esta seguro que desea realizar los cambios de severidad y color?")
        console.log("res")
        console.log(res)
        if (res) {
            await loadToServer(item)
            await getUpdatedData()

        } 
    }
    
    const saveChangeGroupChanges = async (item) => {
        setUpdatingData(true)
        const res = window.confirm("Esta seguro que desea realizar el cambio de Grupo?")
        console.log("res")
        console.log(res)
        if (res) {
            await loadToServer(item)
            await getUpdatedData()

        } 
    }

    const saveChangeEdit = async (item) => {
        setUpdatingData(true)
        const res = window.confirm("Esta seguro que desea realizar el cambio en el Elemento/Resumen?")
        console.log("res")
        console.log(res)
        if (res) {
            await loadToServer(item)
            await getUpdatedData()

        } 
    }

    const updatingDataWindow = () => {
        return(
            <div className={`backdrop-blur-sm fixed top-0 bottom-0 right-0 left-0`}>
                <div className="h-full w-full flex items-center justify-center">
                    <div className="bg-white rounded-xl p-8 text-red-900">
                        <div>
                            Cargando...
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const optionWindowSeverity = (item) => {
        return(
            <div className={`backdrop-blur-sm fixed top-0 bottom-0 right-0 left-0 `}>
                <div className="h-full w-full flex items-center justify-center">
                    <div className="">
                        <div>
                            <SeveridadSelectionComponent 
                                item={item} 
                                saveSeverityChanges={saveSeverityChanges} 
                                setOpenWindow={setOpenWindow} 
                                dataBaseCharging={dataBaseCharging} 
                                dataBaseError={dataBaseError}
                                setOptionSelected={setOptionSelected}
                            />
                        </div>


                    </div>
                </div>
            </div>
        )
    }

    const optionWindowChangeGroup = (item) => {
        return(
            <div className={`backdrop-blur-sm fixed top-0 bottom-0 right-0 left-0 `}>
                <div className="h-full w-full flex items-center justify-center">
                    <div className="">
                        <div>
                            <DerivarSelectionComponent 
                                item={item} 
                                saveChangeGroupChanges={saveChangeGroupChanges} 
                                setOpenWindow={setOpenWindow} 
                                dataBaseCharging={dataBaseCharging} 
                                dataBaseError={dataBaseError}
                                setOptionSelected={setOptionSelected}
                                menuFilter={menuFilter}
                            />
                        </div>


                    </div>
                </div>
            </div>
        )
    }


    const optionWindowEdit = (item) => {
        return(
            <div className={`backdrop-blur-sm fixed top-0 bottom-0 right-0 left-0 `}>
                <div className="h-full w-full flex items-center justify-center">
                    <div className="">
                        <div>
                            <EditarSelectionComponent
                                item={item} 
                                saveChangeGroupChanges={saveChangeGroupChanges} 
                                setOpenWindow={setOpenWindow} 
                                dataBaseCharging={dataBaseCharging} 
                                dataBaseError={dataBaseError}
                                setOptionSelected={setOptionSelected}
                            />
                        </div>


                    </div>
                </div>
            </div>
        )
    }

    const openWindowOptions = (item) => {
        setOpenWindow(true)
        setItemSelected(item)
    }

    const saveDataStatus = async (msg,item) => {
        const res = window.confirm(msg)
        if (res) {
            setUpdatingData(true)
            await loadToServer(item)
            await getUpdatedData()

        } 
    }
 
    const buttonSuccess = (item, tag) => {
        return(
            <div>
                <button 
                    className="w-[50px] border-[1px] border-green-500 text-green-500 p-2 ml-2" 
                    onClick={ ()=> saveDataStatus("Esta seguro de que esta OK?",{
                        ...item,
                        status: 'OK'
                    })}
                >
                    {
                        tag
                    }
                </button>
            </div>
        )
    } 

    const buttonChangeGroup = (item,tag) => {
        return(
            <div>
                <button 
                    className="w-[80px] border-[1px] border-yellow-500 text-yellow-500 p-2"
                    onClick={()=>{
                        openWindowOptions(item)
                        setOptionSelected("GROUP")
                    }}
                >
                    {
                        tag
                    }
                </button>
            </div>
        )
    } 

    const buttonDelete = (item,tag) => {
        return(
            <div>
                <button 
                    className="w-[80px] border-[1px] border-red-500 text-red-500 p-2"
                    onClick={ ()=> saveDataStatus("Esta seguro de que desea retirar la tarea?",{
                        ...item,
                        status: 'RETIRADO'
                    })}
                >
                    {
                        tag
                    }
                </button>
            </div>
        )
    } 

    const buttonSeverity = (item) => {
        return(
            <div>
                <button 
                    className={`w-[80px] text-red-800 p-2 text-white ${item.rojo.toLowerCase() === "si"?"bg-red-400":"bg-blue-400"}`}
                    onClick={()=>{
                        openWindowOptions(item)
                        setOptionSelected("SEVERITY")
                    }}
                >
                    {
                        item.severidad
                    }
                </button>
            </div>
        )
    } 

    const buttonEdit = (item) => {
        return(
            <div>
                <button 
                    className={`text-yellow-400`}
                    onClick={()=>{
                        openWindowOptions(item)
                        setOptionSelected("EDIT")
                    }}
                >
                    <EditIcon />
                </button>
            </div>
        )
    } 



    const selectGroupOK = (item) => {
        return(
            <input type="checkbox" name="tarea" value={item.tarea} className="ml-2 h-[20px] w-[20px]" />
        )
    }

    const dataformat = (item) => {
        return [
            selectGroupOK(item),
            buttonSuccess(item,"ok"),
            buttonChangeGroup(item,"Derivar"),
            buttonDelete(item,"Retirar"),
            buttonSeverity(item),
            buttonEdit(item),
            item.crq,
            item.tarea,
            item.resumen,
            item.elemento,
            (new Date(item.inicio)).toLocaleString('es-ES'),
            (new Date(item.fin)).toLocaleString('es-ES'),
            item.areatecnologica,
            item.noc,
            item.red,
            item.direccion,
            item.motivo,
            item.servicio,
            item.planificador + " (" + item.areaplanificador + ")",
            item.gestor + " (" + item.areagestor + ")",
            item.ejecutor + " (" + item.areaejecutor + ")",

        ]
    }

    const sendOkSelectedElements = async (e) => {

        const res = window.confirm("Esta seguro que desea poner en OK esas Tareas?")
        if (res) {
            e.preventDefault()
            const formData = new FormData(e.target)
            const tareaList = formData.getAll('tarea')
            console.log("Submit")
            console.log(formData.getAll('tarea'))
            setUpdatingData(true)
            try {
                const requestOptions = {
                    method: 'PUT',
                    headers: {'Content-Type': 'text/plain'},
                    body: JSON.stringify(tareaList)
                }
                const api = "http://172.19.128.128:3060/api/eficiencia/trabajosprogramados/savegroup"
        
                const response = await fetch(api,requestOptions)
                const dataInfo = await response.json()
                if (dataInfo.error) {
                    throw new Error("Error "+ dataInfo.status + ": " +dataInfo.error)
                }
                console.log(dataInfo) 
                console.log("fin guardado db")
                setDataBaseCharging(false)
                await getUpdatedData()
            } catch (errorDB) {
                console.log("Error en la DB")
                console.log(errorDB)
                setDataBaseError(errorDB)
                //setTryToDb(tryToDbStates.fault)   
            }
        }
    }


    const columnsStyles = `grid
    grid-cols-[40px_70px_100px_100px_100px_50px_150px_150px_300px_200px_200px_200px_200px_200px_200px_200px_200px_200px_200px_200px_200px]
    gap-2  w-[4000px]`

    const columnHeaderStyle = `${columnsStyles} border-[1px] border-gray-200 h-[60px] bg-gray-500 text-white`
    const columnBodyStyle = `${columnsStyles} border-[1px] border-t-0 border-gray-200`

    
    return(
        <div className="w-full h-full p-2 text-[14px]">
            
            {
                updatingData
                ?
                updatingDataWindow()
                :
                ""
            }
            {   
                openWindow
                ?
                (
                    optionSelected === "SEVERITY"
                    ?
                    optionWindowSeverity(itemSelected)
                    :
                    (
                        optionSelected === "GROUP"
                        ?
                        optionWindowChangeGroup(itemSelected)
                        :
                        (
                            optionSelected === "EDIT"
                            ?
                            optionWindowEdit(itemSelected)
                            :
                            ""
                        )
                    )
                    
                )
                :
                ""
            }
            <form className="w-full h-full overflow-x-auto" onSubmit={(e)=>sendOkSelectedElements(e)} >
                <div className="h-[100px]">
                    <div className="flex justify-between">
                        <div className="flex bg-gray-500 text-white border-b-[1px] border-white">
                            {
                                menuFilterResumed
                                ?
                                menuFilterResumed.map( item =>
                                    <div 
                                        key={item.noctitle}
                                        className={`p-2 border-r-[1px] border-white cursor-pointer  select-none ${item.noctitle === nocFilter?"bg-yellow-300":""}`}
                                        onClick={()=>{
                                            setNocFilter(item.noctitle)
                                            setAtFilter("")
                                        }}
                                    >
                                        {
                                            `${item.noctitle} (${item.checkedCount}/${item.count})`
                                        }
                                    </div>
                                )
                                :
                                "Cargando..."
                            }
                        </div>
                        <div
                            className="flex"
                        >
                            <Link href={'/'} className="p-2 mr-2 border-[1px] rounded-md">
                                Regresar
                            </Link>
                            <div className={`p-2 text-white rounded-md ${viewAllItems?"bg-yellow-300":"bg-gray-400"}`} onClick={()=>setViewAllItems(ls => !ls)} >
                                {
                                    "Ver revisadas"
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l-[1px] border-red-300">
                        {
                            menuFilterResumed
                            ?
                            menuFilterResumed.filter(item => item.noctitle === nocFilter ).map( item =>
                                item.arealist.map( itemarea => 
                                    <div 
                                        key={itemarea.areatecnologica}
                                        className={`p-2 border-r-[1px]  border-t-[1px] border-b-[1px] border-red-300 cursor-pointer select-none ${itemarea.areatecnologica === atFilter?"bg-yellow-300 text-white":""}`}
                                        onClick={()=>setAtFilter(itemarea.areatecnologica)}
                                    >
                                        {
                                            `${itemarea.areatecnologica} (${itemarea.checkedCount}/${itemarea.count})`
                                        }
                                    </div>
                                )
                            )
                            :
                            "Cargando..."
                        }
                    </div>
                </div>
                <div className="w-full h-[calc(100%-100px)] ">
                    <div className="">
                        <div className={columnHeaderStyle}>
                            <div className="flex items-center ">
                                <button type="submit" className="ml-2 p-2 border-[1px] border-green-300">
                                    ok 
                                </button>
                            </div>
                            <div className="flex items-center">
                                {
                                    ""
                                }
                            </div>
                            <div className="flex items-center">
                                {
                                    ""
                                }
                            </div>
                            <div className="flex items-center">
                                {
                                    ""
                                }
                            </div>
                            <div className="flex items-center">
                                Severidad
                            </div>
                            <div className="flex items-center">
                                Edit
                            </div>
                            <div className="flex flex-col">
                                <div>
                                    CRQ
                                </div>
                                <div className="w-full">
                                    <input type="text" className="w-full text-black" value={crqSearchValue} onChange={(e)=>setCrqSearchValue(e.target.value)} />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div>
                                    Tarea
                                </div>
                                <div className="w-full">
                                    <input type="text" className="w-full text-black" value={tareaSearchValue} onChange={(e)=>setTareaSearchValue(e.target.value)} />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div>
                                    Resumen
                                </div>
                                <div className="w-full">
                                    <input type="text" className="w-full text-black" value={resumenSearchValue} onChange={(e)=>setResumenSearchValue(e.target.value)} />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div>
                                    Elemento
                                </div>
                                <div className="w-full">
                                    <input type="text" className="w-full text-black" value={elementoSearchValue} onChange={(e)=>setElementoSearchValue(e.target.value)} />
                                </div>
                            </div>
                            <div className="flex items-center">
                                Inicio
                            </div>
                            <div className="flex items-center">
                                Fin
                            </div>
                            <div className="flex items-center">
                                Area
                            </div>
                            <div className="flex items-center">
                                NOC
                            </div>
                            <div className="flex items-center">
                                Red
                            </div>
                            <div className="flex items-center">
                                Direccion
                            </div>
                            <div className="flex items-center">
                                Motivo
                            </div>
                            <div className="flex items-center">
                                Servicio
                            </div>
                            <div className="flex items-center">
                                Planificador
                            </div>
                            <div className="flex items-center">
                                Gestor
                            </div>
                            <div className="flex items-center">
                                Ejecutor
                            </div>
                        </div>
                    </div>
                    <div >
                        <div>
                            {
                                dataFiltered.map(row =>
                                    <div key={Math.random().toString(36).slice(2, 11)} className={columnBodyStyle + ` ${row.status === "OK"?"bg-green-300":(row.status === "RETIRADO"?"bg-red-400":"")}`}>
                                        {
                                            dataformat(row).map(item =>
                                                <div key={item + Math.random().toString(36).slice(2, 11)} className="flex items-center overflow-x-auto ">
                                                    {
                                                        item
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>

                                )
                            }
                        </div>

                    </div>
                </div>
            </form>
        </div>
    )
}