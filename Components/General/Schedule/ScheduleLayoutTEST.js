"use client"
import { useState } from "react"

export default function SheduleLayout() {

    const [image, setImage] = useState(null)
    const [createObjectURL, setCreateObjectURL] = useState(null)

    const img = "http://172.19.128.128:1337/uploads/small_Horario_RAL_00b1059235.png"

    const createNewEntry = async () => {
        const myBody = {
            data: {
                name: "entry 1",
                group: "entry 1",
            }
        }
        const response = await fetch("http://172.19.128.128:1337/api/scheduleimages",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(myBody)
        })

        const myObject = await response.json()
        const id = Number(myObject.data.id)
        console.log(id)
        return {
            id
        }
    }

    const uploadToClient = (e) => {
        //console.log("Archivo")
        if (e.target.files && e.target.files[0]) {
            const myImage = e.target.files[0]
            setImage(myImage)
            setCreateObjectURL(URL.createObjectURL(myImage))
            //console.log(URL.createObjectURL(myImage))
        }
    }

    const uploadToServer = async (e) => {
        console.log("Subiendo")

        const newitemId = await createNewEntry()
        console.log(newitemId)
        console.log(typeof(newitemId))

        const body = new FormData();
        body.append("files",image)
        body.append("field","media")
        body.append("ref","api::scheduleimage.scheduleimage")
        body.append("refId",newitemId.id)
        
        const response = await fetch("http://172.19.128.128:1337/api/upload",{
            method: "POST",
            body
        })
        console.log(response)
        // const myBody = {
        //     data: {
        //         name: "uno1",
        //         group: "grupo1",
        //     }
        // }
        // const response = await fetch("http://172.19.128.128:1337/api/scheduleimages",{
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(myBody)
        // })
        //console.log(response)
    }

    

    return(
        <div className="h-full w-full scroll">
            <div>
                <input 
                    className="bg-white"
                    type="file" 
                    name="myImage" 
                    onChange={uploadToClient} 
                />
                <button 
                    className="border-2 border-black p-2"
                    type="submit"
                    onClick={uploadToServer} 
                >
                    Subir Horario
                </button>
                <figure className="h-16 w-16">
                    <img 
                        className=""
                        src={createObjectURL} 
                    />
                </figure>
            </div>
            <div>
                Imagenes
            </div>
        </div>
    )
}