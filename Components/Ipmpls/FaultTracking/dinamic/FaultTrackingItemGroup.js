"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { useParams } from "next/navigation"
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import ListaSitesFilterByWord from "../../../Map/ListaSites/ListaSitesFilterByWord";
import { CreateRounded } from "@mui/icons-material";

//const states = ["Activo","Culminado"]
const pending = "Pendiente"
const closed = "Finalizado"
const states = [
    {
        value:pending,
        selected:false
    },
    {
        value:closed,
        selected:false
    }
]

const changeSelectStateFormat = (states,state) => {
    const newState = states.map( item => {
        if (item.value === state) {
            return ({
                ...item,
                selected: true
            })
        } else {
            return ({
                ...item,
                selected: false
            })
        }
    })
    return newState
}

const toFlatState = (state) => {
    let response = pending
    const flatState = state.find( item => item.selected)
    if (flatState) {
        response = flatState.value
    }
    return response
}

const secondJS = 1000
const minuteJS = 60 * secondJS
const hourJS = 60 * minuteJS

const minus5hours = (dataTime) => {
    return new Date(Date.parse(dataTime) - 5*hourJS)
}

const changeDateToInputFormat = (dataTimeString) => {
    const toDate = new Date(dataTimeString)
    return minus5hours(toDate).toISOString('es-ES').substring(0,16)
}

// tryToDb
// nothing
// inprogress
// fault 
// success
const tryToDbStates = {
    nothing: "nothing",
    inprogress: "inprogress",
    fault: "fault",
    success: "success",
}

const fillNullsInObject = (obj) => {
    return Object.entries(obj).reduce((newObj,[id,value]) => {
        newObj[id] = value || ""
        return newObj
    }, {})  
}

const stringToArrayObject = (string) => {
    const toArray = string.split('/')
    const toObject = toArray.map(item => {
        const atributes = item.split(',')
        return({
            id: atributes[0],
            ticket: atributes[1],
            group: atributes[2],
            current: /^true$/i.test(atributes[3])
        })
    })
    console.log("Objeto")
    console.log(toObject)
    return toObject
} 

const objectArrayToString = (ArrayObj) => {
    const toArrayString = ArrayObj.map(obj => {
        const toArray = Object.values(obj)
        return toArray.join(',')
    })
    return toArrayString.join('/')
}

const updateTicketObjArray = (list,id,ticket,group,current) => {
    if (list[0].id) {
        if (id) {
            return list.map( item => {
                if (item.id === id) {
        
                    return({
                        ...item,
                        ticket:ticket?ticket:item.ticket,
                        group:group,
                        current:current?current:item.current
                    })
                } else {
                    return({
                        ...item,
                    })
                }
            })
        } else {
            const newId = list.reduce((a,v) => {
               return parseInt(a) > parseInt(v.id)? parseInt(a) + 1 : parseInt(v.id) + 1
            },1)
            const newTicket = {
                id:String(newId),
                ticket,
                group,
                current: true
            }
            return [newTicket,...list.map(item => {
                return({
                    ...item,
                    current: false
                })
            })]
            
        }
    } else {
        return([{
            id:'1',
            ticket,
            group,
            current: true
        }])
    }
}

const newDataItem = {
    alarms:"",
    endtime: dayjs().add(12,'hours'),        
    id: "13",
    message: "",
    starttime: dayjs(),
    state: "Pendiente",
    ticket: "",
    title: "",
    notes: ""
}

export default function FaultTrackingItemGroup ({ dataItem,id }) {
    
    const router = useRouter()

    const [canEdit,setCanEdit] = useState(/^[0-9]*$/.test(id)?false:true)
    const [showInfo, setShowInfo] = useState(1)
    const [dataForm,setDataForm] = useState(/^[0-9]*$/.test(id)?fillNullsInObject(dataItem):newDataItem)
    const [tryToDb,setTryToDb] = useState(tryToDbStates.nothing)
    const [ticketId,setTicketId] = useState(0)
    const [areThereChanges,setAreThereChanges] = useState(false)
    console.log("dataForm")
    console.log(dataForm)
    const updateForm = async (newDataForm) => {
        const areYouSure = window.confirm("La información se actualizará en la base de datos. ¿Desea continuar?")
        if (areYouSure) {
            const {id,state,title,starttime,endtime,alarms,message,ticket,notes} = newDataForm
            console.log("Actualizando...")
            setTryToDb(tryToDbStates.inprogress)
            
            try {
                const requestOptions = {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id,
                        state,
                        title,
                        starttime,
                        endtime,
                        alarms,
                        message,
                        ticket,
                        notes
                    })
                }
                const api = "http://172.19.128.128:3060/api/faulttracking"
        
                const response = await fetch(api,requestOptions)
                const dataInfo = await response.json()
                if (dataInfo.error) {
                    throw new Error("Error "+ dataInfo.status + ": " +dataInfo.error)
                }
                console.log(dataInfo) 
                setTryToDb(tryToDbStates.success)
                setCanEdit(false)
                setAreThereChanges(false)
            } catch (error) {
                console.log("Error en el update")
                console.log(error)
                setTryToDb(tryToDbStates.fault)   
            }

        }
    }

    const newForm = async (newDataForm) => {
        const areYouSure = window.confirm("Se creará un nuevo evento en la base de datos. ¿Desea continuar?")
        if (areYouSure) {
            const {id,state,title,starttime,endtime,alarms,message,ticket,notes} = newDataForm
            console.log("Creando...")
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id,
                        state,
                        title,
                        starttime,
                        endtime,
                        alarms,
                        message,
                        ticket,
                        notes
                    })
                }
                const api = "http://172.19.128.128:3060/api/faulttracking"
        
                const response = await fetch(api,requestOptions)
                const dataInfo = await response.json()
                if (dataInfo.error) {
                    throw new Error("Error "+ dataInfo.status + ": " +dataInfo.error)
                }
                console.log(dataInfo)   
                setTryToDb(tryToDbStates.success)
                router.push('/ipmpls/faulttracking')
                
            } catch (error) {
                console.log("Error en el update")
                console.log(error)
                setTryToDb(tryToDbStates.fault)   
            }
        }
    }

    // console.log("textArea")
    // console.log(textArea)
    
    const params = useParams()
    //console.log(params.id)

    const sharedStyles = `text-center transition ease-in-out flex items-center justify-center h-full border-[1px] border-red-400`

    const alarmStyle = sharedStyles
    const alarmUnseletedStyle = `${alarmStyle} bg-red-400 text-white`
    const alarmSeletedStyle = `${alarmStyle} bg-white text-red-500`
    
    const messageStyle = sharedStyles
    const messageUnseletedStyle = `${messageStyle} bg-red-400 text-white`
    const messageSeletedStyle = `${messageStyle} bg-white text-red-500`


    const blockSharedStyle = `h-full w-full`

    const blockAlarmsSharedStyle = `${blockSharedStyle}`
    const blockAlarmsSelectedStyle = `${blockAlarmsSharedStyle}`
    const blockAlarmsUnselectedStyle = `${blockAlarmsSharedStyle} hidden`

    const blockMessageSharedStyle = `${blockSharedStyle}`
    const blockMessageSelectedStyle = `${blockMessageSharedStyle}`
    const blockMessageUnselectedStyle = `${blockMessageSharedStyle} hidden`

    const labelSyles = `text-sm text-red-500`

    const isThereMessage = () => {
        if (dataForm.message) {
            return "SI"
        } else {
            return "NO"
        }
    }

    const onChangeState = (e) => {
        setDataForm({
            ...dataForm,
            state: e.target.value
        })
        setAreThereChanges(true)
    }

    const onChangeStartTime = (e) => {
        setDataForm(
            {
                ...dataForm,
                starttime: e.$d
            }
        )
        setAreThereChanges(true)
    }

    const onChangeEndTime = (e) => {
        setDataForm(
            {
                ...dataForm,
                endtime: e.$d
            }
        )
        setAreThereChanges(true)
    }

    const onChangeAlarms = (e) => {
        setDataForm(
            {
                ...dataForm,
                alarms: e.target.value
            }
        )
        setAreThereChanges(true)
    }

    const onChangeNotes = (e) => {
        setDataForm(
            {
                ...dataForm,
                notes: e.target.value
            }
        )
        setAreThereChanges(true)
    }

    const onChangeMessage = (e) => {
        setDataForm(
            {
                ...dataForm,
                message: e.target.value
            }
        )
        setAreThereChanges(true)
    }

    const onChangeTitle = (e) => {
        setDataForm(
            {
                ...dataForm,
                title: e.target.value
            }
        )
        setAreThereChanges(true)
    }

     const deleteTicket = (id) => {
        const ticketObj = stringToArrayObject(dataForm.ticket)
        const updatedObj = ticketObj.filter(item => item.id !== id)
        console.log('updatedObj')
        console.log(updatedObj)
        if (!updatedObj.some(item => item.current) && updatedObj.length ) {
            updatedObj[0].current=true
        }

        setDataForm({
            ...dataForm,
            ticket: objectArrayToString(updatedObj)
        })
        setTicketId(0)
        setAreThereChanges(true)
    }

    const changeTickets = (e) => {
        console.log("cambiando ticket...")
        console.log(e)
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const ticketObj = stringToArrayObject(dataForm.ticket)
        const ticketObjUpdated = updateTicketObjArray(ticketObj,data.get('id'),data.get('ticket'),data.get('group').toUpperCase())
        setDataForm(
            {
                ...dataForm,
                ticket: objectArrayToString(ticketObjUpdated)
            }
        )
        setTicketId(0)
        setAreThereChanges(true)
    }

    const onChangeTicket = (e) => {
        const ticketData = new FormData(e.currentTarget)
        console.log("Formulario")
        console.log(ticketData.get('id'))
        const ticketObj = stringToArrayObject(dataForm.ticket)
        const ticketObjUpdated = updateTicketObjArray(ticketObj,ticketData.get('id'),ticketData.get('ticket'),ticketData.get('group').toUpperCase())
        setDataForm(
            {
                ...dataForm,
                ticket: objectArrayToString(ticketObjUpdated)
            }
        )
        setTicketId(0)
        setAreThereChanges(true)
    }

    const saveNewTicket = (e) => {
        console.log("Creando nuevo ticket...")
        console.log(e)
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        
        const ticketObj = stringToArrayObject(dataForm.ticket)
        console.log("ticketObj")
        console.log(ticketObj)
        console.log("data")
        console.log(data.get('ticket'))
        let ticketObjUpdated
        if (ticketObj.length) {
            ticketObjUpdated = updateTicketObjArray(ticketObj,"",data.get('ticket'),data.get('group').toUpperCase(),'true')
        } else {
            ticketObjUpdated = updateTicketObjArray([],"",data.get('ticket'),data.get('group').toUpperCase(),'true')
        }
        console.log("ticketObjUpdated")
        console.log(ticketObjUpdated)
        setDataForm(
            {
                ...dataForm,
                ticket: objectArrayToString(ticketObjUpdated)
            }
        )
        setAreThereChanges(true)
        
    }

    const changeCheck = (id) => {
        const ticketObj = stringToArrayObject(dataForm.ticket)
        const newTicketObj = ticketObj.map(item => {
            if (item.id === id) {
                return ({
                    ...item,
                    current:true
                })
            } else {
                return ({
                    ...item,
                    current:false
                })
            }
        })
        setDataForm({
            ...dataForm,
            ticket: objectArrayToString(newTicketObj)
        })
        setAreThereChanges(true)
    }

    const onCloseEditState = () => {
        if (/^[0-9]*$/.test(id)) {
            if (areThereChanges) {
                const areYouSure = window.confirm("Se perdera los cambios al cerrar ¿Desea continuar?")
                if (areYouSure) {
                    setCanEdit(false)
                    setDataForm(dataItem)
                    setAreThereChanges(false)
                }
            } else {
                setCanEdit(false)
                setAreThereChanges(false)
            }
        } else {
            if (areThereChanges) {
                const areYouSure = window.confirm("Se perdera los cambios al cerrar ¿Desea continuar?")
                if (areYouSure) {
                router.push('/ipmpls/faulttracking')
                }
            } else {
                router.push('/ipmpls/faulttracking')
            }
        }
    }

    const onReturnToList = () => {
        if (areThereChanges) {
            const areYouSure = window.confirm("Se perdera los cambios, si desea regresar a la lista ¿Desea continuar?")
            if (areYouSure) {
                router.push('/ipmpls/faulttracking')
            }
        } else {
            router.push('/ipmpls/faulttracking')
        }
    }

    console.log("dataForm group")
    console.log(dataForm)
    console.log(dataForm.ticket)
    console.log("Cambios?")
    console.log(areThereChanges)

    return(
        <div className="h-full w-ful grid grid-rows-[50px_50px_1fr] ">
            <div className="h-[50px] w-full  ">
                <>
                    {
                        tryToDb === tryToDbStates.nothing
                        &&
                        <div className="h-full w-full bg-yellow-400 text-white flex justify-center items-center font-bold"></div>
                        
                        
                    }
                    {
                        tryToDb === tryToDbStates.inprogress
                        &&
                        <div className="h-full w-full bg-yellow-400 text-white flex justify-center items-center font-bold">Actualizando información...</div>
                        
                        
                    }
                    {
                        tryToDb === tryToDbStates.fault
                        &&
                        <div className="h-full w-full bg-red-400 text-white flex justify-center items-center font-bold">Sucedio un error al cargar la información a la base de datos!!!</div>
                        
                        
                    }
                    {
                        tryToDb === tryToDbStates.success
                        &&
                        <div className="h-full w-full bg-green-400 text-white flex justify-center items-center font-bold">Información actualizada!!!</div>
                        
                        
                    }
                </>
            </div>
            <div
                className="w-full flex justify-end p-2"
            >
                <div
                    
                    className={`h-[50px] w-[50px] rounded-full p-2 mr-2 ${canEdit?"bg-red-400":"bg-yellow-400"} `}              
                >
                    {
                        canEdit
                        ?
                        <CloseSharpIcon 
                            style={{ color: '#ffffff', width: '100%', height: '100%', transition: 'all 0.5s ease'}} 
                            onClick={onCloseEditState} 
                        />
                        :
                        <EditNoteSharpIcon 
                            style={{ color: '#ffffff', width: '100%', height: '100%', transition: 'all 0.5s ease'}} 
                            onClick={() => {
                                setCanEdit(!canEdit)
                                setTryToDb(tryToDbStates.nothing)
                            }} 
                        />
                    }
                </div>
                <div
                    onClick={onReturnToList} 
                    className={`h-[50px] w-[50px] rounded-full p-2 bg-red-400`}
                >
                    <ArrowBackIcon style={{ color: '#ffffff', width: '100%', height: '100%', transition: 'all 0.5s ease'}} />
                </div>
            </div>
            <div className="p-4 w-full h-full overflow-hidden">
                <div className="grid grid-rows-[auto_80px_80px_1fr] h-full w-full bg-white border-[1px] border-red-300 p-4 rounded-md ">
                    <div className="w-full flex justify-between">
                        <div className="flex">
                            <div className="mr-4">
                                <div className={labelSyles}>
                                    ESTADO
                                </div>
                                <div>
                                    <select 
                                        name="selectState" 
                                        disabled={!canEdit} 
                                        onChange={onChangeState} 
                                        defaultValue={dataForm.state} 
                                        className={`h-12 w-40 rounded-sm p-2 border-[#d4a5a5] border-[1px] text-black disabled:text-black ${canEdit?"bg-white border-[#d4a5a5] ":"bg-gray-200"}`}
                                    >
                                        {
                                            states.map(item => 
                                                <option key={item.value} value={item.value} >{item.value}</option> 
                                            )
                                        }

                                    </select>
                                </div>

                            </div>
                            <div>
                                <div className={labelSyles}>
                                        INCIDENCIA
                                </div>
                                <div className="flex flex-col " >
                                    {
                                        canEdit
                                        ?
                                        <div>
                                            <form onSubmit={saveNewTicket} className="flex pb-2" >
                                                
                                                <div className="hidden">
                                                    <input className="" type="text" name="id" value={ticketId} />
                                                </div>
                                                <div>
                                                    <input 
                                                        className="border-[1px] border-r-[0px] border-[#d4a5a5] p-2 h-[48px]" 
                                                        type="text" 
                                                        name="ticket" 
                                                        placeholder={ticketId?stringToArrayObject(dataForm.ticket).find(item => item.id === ticketId).ticket:"Incidencia"} 
                                                    />
                                                </div>
                                                <div>
                                                    <input 
                                                        className="border-[1px] border-[#d4a5a5] p-2 h-[48px]" 
                                                        type="text" 
                                                        name="group" 
                                                        placeholder={ticketId?stringToArrayObject(dataForm.ticket).find(item => item.id === ticketId).group:"Grupo asignado"}
                                                    />
                                                </div>
                                                <div className="flex items-center pl-2">
                                                    <button type="submit" className="p-2 bg-yellow-400 text-white rounded-sm" >
                                                        {
                                                            !ticketId
                                                            ?
                                                            "Agregar nuevo"
                                                            :
                                                            "Cambiar datos"
                                                        }
                                                    </button>
                                                    {
                                                        ticketId
                                                        ?
                                                        <button className="p-2 bg-red-400 text-white rounded-sm ml-2" onClick={() => setTicketId(0)}>
                                                            Cancelar
                                                        </button>
                                                        :
                                                        ""
                                                    }
                                                    
                                                </div>
                                                
                                            </form>
                                        </div>
                                        :
                                        ""
                                    }
                                    <div className={`flex flex-col justify-center border-[1px] border-[#d4a5a5] rounded-sm p-2 min-h-[48px] ${canEdit?"bg-white":"bg-gray-200"}`}>
                                        {   dataForm.ticket
                                            ?
                                            stringToArrayObject(dataForm.ticket).map(item=>
                                                <div key={item.id} className="flex items-center" >
                                                    {
                                                        canEdit
                                                        ?
                                                        <div className="flex">
                                                            <div
                                                                onClick={()=>deleteTicket(item.id)}
                                                            >
                                                                <DeleteForeverIcon className="text-red-500" />
                                                            </div>
                                                        </div>
                                                        :
                                                        ""
                                                    }
                                                    <div className="flex items-center">
                                                        <div
                                                            onClick={() => canEdit?changeCheck(item.id):""} 
                                                            className={``}
                                                        >
                                                            {
                                                                item.current
                                                                ?
                                                                <StarIcon className="text-yellow-400" />
                                                                :
                                                                <StarBorderIcon className="text-yellow-400" />
                                                            }
                                                        </div>
                                                        <form onChange={canEdit?onChangeTicket:()=>{}} className="flex pl-2" >
                                                            {
                                                                !canEdit
                                                                ?
                                                                <div>
                                                                    {
                                                                        `${item.ticket} (${item.group})`
                                                                    }
                                                                </div>
                                                                :
                                                                <div className="flex">
                                                                    <input type="text" name="id" value={item.id} className="hidden" />
                                                                    <input type="text" name="ticket" value={item.ticket} className="flex justify-center" />
                                                                    <span>(</span>
                                                                    <input type="text" name="group" value={item.group} className="flex justify-center" />
                                                                    <span>)</span>
                                                                </div>

                                                            }
                                                        </form>
                                                        
                                                    </div>
                                                </div>
                                            )
                                            :
                                            <div className="flex justify-start">
                                                No hay tickets
                                            </div>
                                        }
                                    </div>
                                    
                                        {/* <input 
                                            type="text" 
                                            disabled={!canEdit} 
                                            value={dataForm.ticket} 
                                            onChange={onChangeTicket} 
                                            className={`h-12 w-[600px] rounded-sm p-2 border-[#d4a5a5] border-[1px] text-black disabled:border-[#d4a5a5] text-black  ${canEdit?"bg-white":"bg-gray-200"}`}
                                        /> */}
                                </div>
                            </div>
                        </div>
                        <div className="">
                            {
                                canEdit && !(tryToDb === tryToDbStates.inprogress)
                                &&
                                <button 
                                    className="flex p-4 bg-yellow-400 text-white items-center font-bold rounded-sm"
                                    onClick={() => /^[0-9]*$/.test(id)?updateForm(dataForm):newForm(dataForm)}
                                >
                                    Guardar Cambios
                                </button>

                            }
                        </div>
                    </div>
                    <div>
                        <div className={labelSyles}>
                                FALLA
                        </div>
                        <div>
                                <input 
                                    type="text" 
                                    disabled={!canEdit} 
                                    value={dataForm.title} 
                                    onChange={onChangeTitle} 
                                    className={`h-12 w-[600px] rounded-sm p-2 border-[#d4a5a5] border-[1px] bg-transparen disabled:border-[#d4a5a5] text-black  ${canEdit?"bg-white":"bg-gray-200"}`}
                                />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="mr-4">
                            <div className={labelSyles}>
                                INICIO
                            </div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker 
                                    value={dayjs(dataForm.starttime)}
                                    onChange={onChangeStartTime}
                                    format="DD/MM/YYYY hh:mm a"
                                    readOnly = {!canEdit}
                                    className= {`border-[1px] ${canEdit?"bg-gray-white border-yellow-400 text-yellow-400":"bg-gray-200 border-gray-400"}`}
     
                                />
                            </LocalizationProvider>
                            {/* <input type="datetime-local" disabled={!canEdit} onChange={onChangeStartTime} value={changeDateToInputFormat(dataForm.starttime)} /> */}
                        </div>
                        {
                            dataForm.state === "Pendiente" && !canEdit
                            ?
                            ""
                            :
                            <div>
                                <div className={labelSyles}>
                                    FIN
                                </div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker 
                                        value={dayjs(dataForm.endtime)}
                                        onChange={onChangeEndTime}
                                        format="DD/MM/YYYY hh:mm a"
                                        readOnly = {!canEdit}
                                        className= {`border-[1px] ${canEdit?"bg-gray-white border-yellow-400 text-yellow-800":"bg-gray-200 border-gray-400"}`}
                                    />
                                </LocalizationProvider>
                                {/* <input type="datetime-local" disabled={!canEdit} onChange={onChangeEndTime} value={changeDateToInputFormat(dataForm.endtime)} /> */}
                            </div>
                            
                            

                        }
                    </div>
                    <div className="h-full w-full grid grid-rows-[40px_1fr] overflow-hidden mt-4">
                        <div className="grid w-full h-full grid-cols-3">
                            <div 
                                className={showInfo===1?alarmSeletedStyle:alarmUnseletedStyle}
                                onClick={()=>setShowInfo(1)}
                            >
                                Notas
                            </div>
                            <div 
                                className={showInfo===2?alarmSeletedStyle:alarmUnseletedStyle}
                                onClick={()=>setShowInfo(2)}
                            >
                                Alarmas
                            </div>
                            <div 
                                className={showInfo===3?messageSeletedStyle:messageUnseletedStyle}
                                onClick={()=>setShowInfo(3)}    
                            >
                                {`Mensaje (${isThereMessage()})`}
                            </div>
                        </div>
                        <div className="h-full w-full">
                            <div
                                className={showInfo===1?blockAlarmsSelectedStyle:blockAlarmsUnselectedStyle}
                            >
                                <textarea 
                                    className={`h-full w-full resize-none overflow-scroll whitespace-nowrap p-2 border-[1px] border-t-0 border-red-500 text-black ${canEdit?"bg-white":"bg-gray-200"}`} 
                                    onChange={canEdit?onChangeNotes:()=>{}} 
                                    value={dataForm.notes} 
                                    spellcheck="false"
                                />
                                
                            </div>
                            <div
                                className={showInfo===2?blockAlarmsSelectedStyle:blockAlarmsUnselectedStyle}
                            >
                                <textarea 
                                    className={`h-full w-full resize-none overflow-scroll whitespace-nowrap p-2 border-[1px] border-t-0 border-red-500 text-black ${canEdit?"bg-white":"bg-gray-200"}`} 
                                    onChange={canEdit?onChangeAlarms:()=>{}} 
                                    value={dataForm.alarms} 
                                    spellcheck="false"
                                />
                                
                            </div>
                            <div
                                className={showInfo===3?blockMessageSelectedStyle:blockMessageUnselectedStyle}
                            >
                                <textarea 
                                    className={`h-full w-full resize-none overflow-scroll whitespace-nowrap p-2 border-[1px] border-t-0 border-red-500 text-black ${canEdit?"bg-white":"bg-gray-200"}`} 
                                    onChange={canEdit?onChangeMessage:()=>{}} 
                                    value={dataForm.message} 
                                    spellcheck="false"
                                />
                                    
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </div>
    )
}