import { useState } from "react"
import { useParams, useRouter } from "next/navigation"

const loadToClient = (e, setImage, setCreateObjectURL, setFileSelected,setFailedMessage,setTypeOfFile) => {

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

const postNewEntry = async (groupId, typeOfFile) => {

    let urlFetch = ""
    if (typeOfFile === "img") {
        urlFetch = "http://172.19.128.128:1337/api/scheduleimages"
    } else {
        urlFetch = "http://172.19.128.128:1337/api/scheduledocuments"
    }

    const date = new Date()
    const [month, day, year] = [
        date.getMonth(),
        date.getDate(),
        date.getFullYear()
    ]
    const myEntry = {
        data:{
            name: `${groupId} ${day}-${month+1}-${year}`,
            group: groupId
        }
    }
    
    const body = JSON.stringify(myEntry)
    const response = await fetch(urlFetch,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body
    })
    const dataResponse = await response.json()
    const id = Number(dataResponse.data.id)

    return {
        id
    }
}

const loadToServer = async (image,groupId,router,typeOfFile) => {

    let api = ""
    if (typeOfFile === "img") {
        api = "api::scheduleimage.scheduleimage"
    } else {
        api = "api::scheduledocument.scheduledocument"
    }
    
    if (image) {
        const {id} = await postNewEntry(groupId,typeOfFile)

        const formData = new FormData()
        formData.append("files",image)
        formData.append("field","media")
        formData.append("ref",api)
        formData.append("refId",id)


        const response = await fetch("http://172.19.128.128:1337/api/upload",{
            method: 'POST',
            body: formData
        })
        const dataResponse = await response.json()
        
        router.push(`/general/schedules/group/${groupId}`)
        
    } else {
        
    }

}

export default function ScheduleUploadItem () {
    const [image, setImage] = useState(null)
    const [createObjectURL, setCreateObjectURL] = useState(null)
    const [fileSelected,setFileSelected] = useState(false)
    const [failedMessage, setFailedMessage] = useState("Elegir un horario en formato JPG, PNG o XLS.")
    const [typeOfFile,setTypeOfFile] = useState("img")

    const router = useRouter()

    const params = useParams()
    const groupId = params.id

    const buttonUloadSharedStyles = "ml-8 flex items-center h-12 border-2 p-2"
    const buttonUploadActiveStyle = `${buttonUloadSharedStyles} bg-red-500 border-red-500  text-white hover:bg-white hover:text-red-500 transition:all duration-300`
    const buttonUploadDesactiveStyle = `${buttonUloadSharedStyles} border-gray-500  text-gray-500 `

    return(
        <div className="p-4 h-full w-full">
            
            <form className="flex justify-evenly w-full pb-8 ">
                <input
                    className="hidden" 
                    type="file"
                    name="file"
                    id="file"
                    onChange={(e) => loadToClient(e,setImage,setCreateObjectURL,setFileSelected,setFailedMessage,setTypeOfFile)}
                />
                <label 
                    for="file" 
                    className="flex items-center h-12 border-2 border-red-500 bg-red-500 p-2 text-white hover:bg-white hover:text-red-500 transition:all duration-300 "
                >
                    Elegir horario (imagen/xls)
                </label>

                <button
                    type="button"
                    onClick={()=>loadToServer(image,groupId, router, typeOfFile)}
                    className={fileSelected?buttonUploadActiveStyle:buttonUploadDesactiveStyle}
                >
                    Subir horario
                </button>
            </form>
            <div className="flex w-full">
                {
                    failedMessage
                    ?
                    <div className="flex w-full justify-center text-red-500 font-bold">
                        <p>
                            {
                                failedMessage
                            }
                        </p>
                    </div>
                    :
                    <div className="flex w-full flex-col justify-center">
                        <p className="flex justify-center text-red-500">
                            {image.name}
                        </p>
                        {
                            image.type.includes("image")
                            ?
                            <figure className="flex justify-center w-full">
                                <img 
                                    className="w-full"
                                    src={createObjectURL}
                                />
                            </figure>
                            :
                            <></>
                        }
                    </div>
                }
            </div>
                
        </div>
    )
}