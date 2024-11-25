"use client"

import { useState } from "react"
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ScheduleTemplateNew from "../ScheduleTemplateNew";

export default function ScheduleUpload ({params}) {
    console.log("params")
    console.log(params)

    const router = useRouter()

    const searchParams = useSearchParams()
 
    const name = searchParams.get('name')
    const path = searchParams.get('path')
    const group = searchParams.get('group')

    const [image, setImage] = useState(null)
    const [createObjectURL, setCreateObjectURL] = useState(null)
    const [fileSelected,setFileSelected] = useState(false)
    const [failedMessage, setFailedMessage] = useState("Elegir un horario en formato JPG, PNG o XLS.")
    const [typeOfFile,setTypeOfFile] = useState("img")
    const [fileName,setFileName] = useState("")

    const loadToClient = (e) => {
        if(e.target.files[0] && e.target.files) {
            console.log(e.target.files[0])
            if(e.target.files[0].type.includes("image/png") || e.target.files[0].type.includes("image/jpeg"))
            {
                setImage(e.target.files[0])
                setCreateObjectURL(URL.createObjectURL(e.target.files[0]))
                setFileSelected(true)
                setFailedMessage(null)
                setTypeOfFile("img")
            } else if (e.target.files[0].type.includes("sheet") || e.target.files[0].type.includes("csv") || e.target.files[0].type.includes("excel") || e.target.files[0].type.includes("pdf") ) {
                setImage(e.target.files[0])
                setCreateObjectURL(URL.createObjectURL(e.target.files[0]))
                setFileSelected(true)
                setFailedMessage(null)
                setTypeOfFile("xls")
            }
        }
    }

    //const fileName = "Nombre de prueba"

    const loadToServer = async () => {

        try {
            const formData = new FormData()
            formData.append("file",image)
            formData.append("path",path)
            formData.append("name",fileName)
    
            const response = await fetch("http://172.19.128.128:3060/api/filesystem",{
                method: 'POST',
                body: formData
            })
            const dataResponse = await response.json()
            console.log(dataResponse)

            if (dataResponse.status === "success") {
                try {
                    const requestOptions = {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            file: dataResponse.name,
                            name: fileName,
                            group: params.group
                        })
                    }
                    const api = "http://172.19.128.128:3060/api/schedulesimages"
            
                    const response = await fetch(api,requestOptions)
                    const dataInfo = await response.json()
                    if (dataInfo.error) {
                        throw new Error("Error "+ dataInfo.status + ": " +dataInfo.error)
                    }
                    console.log(dataInfo) 
                    router.push(`/general/schedulesv2/view?group=${params.group}`)
                    // setTryToDb(tryToDbStates.success)
                    // setCanEdit(false)
                    // setAreThereChanges(false)
                } catch (errorDB) {
                    console.log("Error en la DB")
                    console.log(errorDB)
                    //setTryToDb(tryToDbStates.fault)   
                }
    
                
            } else {
                throw new Error("No se puedo subir el archivo al servidor!!")
            }
            
        } catch (errorFile) {
            console.log("Error en upload")
            console.log(errorFile)
            //setTryToDb(tryToDbStates.fault)   
        }
    }

    return (
        <div>
            {
                params.group === "view"
                ?
                <ScheduleTemplateNew group={group} />
                :
                <div>
                    <div className="flex justify-between">
                        <div className="h-[50px] w-full text-lg p-2 text-red-800">
                            {
                                name.toUpperCase()
                            }  
                        </div>
                        <div className="text-yellow-400 p-2 flex items-center" onClick={()=>router.push(`/general/schedulesv2/view?group=${params.group}`)}>
                            <ArrowBackIcon />
                        </div>
                    </div>
                    <div>
                        <form className="flex justify-evenly w-full pb-8 ">
                            <input
                                className="hidden" 
                                type="file"
                                name="file"
                                id="file"
                                onChange={loadToClient}
                            />
                            <label 
                                for="file" 
                                className="flex items-center h-12 border-2 border-red-500 bg-red-500 p-2 text-white hover:bg-white hover:text-red-500 transition:all duration-300 "
                            >
                                Elegir horario (imagen/xls)
                            </label>
                            
                            {
                                image
                                ?
                                <button
                                type="button"
                                onClick={loadToServer}
                                className={"text-white bg-yellow-400 p-2"}
                                >
                                    Subir horario
                                </button>
                                :
                                ""
                            }
                            
                        </form>
                        <div className="w-full flex justify-center">
                            <div className="p-2">
                                Nombre del archivo:
                            </div>
                            <input type="text" value={fileName} onChange={(e)=>setFileName(e.target.value)} className="border-[1px] rounded-sm border-black p-2" />
                        </div>
                        <div className="w-full flex justify-center">
                            {
                                image
                                ?
                                <img src={createObjectURL} alt="Imagen" className="" />
                                :
                                failedMessage
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}