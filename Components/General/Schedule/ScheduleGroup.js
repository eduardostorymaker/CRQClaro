import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import ScheduleItem from "./ScheduleItem"

export default function scheduleGroup({ selectedGroup }) {
    const [scheduleList,setScheduleList] = useState([])
    const [scheduleDocuments,setScheduleDocuments] = useState([])
    const router = useRouter()
    const filteredData = scheduleList.filter(item => item.attributes.group === selectedGroup.id )
    const filteredDocuments = scheduleDocuments.filter(item => item.attributes.group === selectedGroup.id )
    
    useEffect(()=>{
        fetch("http://172.19.128.128:1337/api/scheduleimages?populate=*&sort[0]=updatedAt:desc", {cache: "no-store"})
            .then((response) => response.json())
            .then((data) => {
                setScheduleList(data.data)
                //console.log(data.data)
            } )

        fetch("http://172.19.128.128:1337/api/scheduledocuments?populate=*&sort[0]=updatedAt:desc", {cache: "no-store"})
        .then((response) => response.json())
        .then((data) => {
            setScheduleDocuments(data.data)
            console.log("documents")
            console.log(data.data)
        } )
    },[])

    return (
        <div className="p-4">
            <div className="pb-4">
                <button 
                    onClick={()=>router.push(`/general/schedules/upload/${selectedGroup.id}`)}
                    className="border-2 border-red-300 p-2 bg-red-500 text-white hover:bg-white hover:text-red-500 transition-all duration-300"
                >
                    Agregar nuevo horario
                </button>
                
                
            </div>
            {
                filteredData.length > 0
                ?
                <div className="w-full">
                    <div>
                        <p className="text-xl text-red-500 border-b-2 border-red-500">
                            Imágenes
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">

                        {
                            filteredData.map(item => {
                                const img = `http://172.19.128.128:1337${item.attributes.media.data.attributes.formats.small.url}`
                                const link = `http://172.19.128.128:1337${item.attributes.media.data.attributes.url}`

                                return (
                                    <ScheduleItem key={item.id} name={item.attributes.name} img={img} link={link}  />    
                                )
                            }
                            )
                            
                        }

                    </div>
                </div>
                :
                <></>
            }
            
            {
                filteredDocuments.length > 0
                ?
                <div className="w-full mt-4 ">
                    <div>
                        <p className="text-xl text-red-500 border-b-2 border-red-500">
                            Archivos
                        </p>
                    </div>
                    <div className="p-4 grid sm:grid-cols-4 lg:grid-cols-5 lg:grid-cols-6 gap-4" >
                        {
                            filteredDocuments.map(item => {
                                const link = `http://172.19.128.128:1337${item.attributes.media.data.attributes.url}`

                                return (
                                    <Link href={link} className="flex p-4 rounded-xl shadow-lg shadow-red-500/50 overflow-hidden gap-4" >
                                        <div key={item.id} className="text-red-500" >
                                            {item.attributes.name}
                                        </div>    
                                    </Link>
                                )
                            }
                            )
                            
                        }
                    </div>
                </div>
                :
                <></>
            }


        </div>
    )
}