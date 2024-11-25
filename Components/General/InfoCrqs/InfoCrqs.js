"use client"

import { useEffect, useState } from "react"

export default function InfoCrqs () {

    const [data,setData] = useState("")
    useEffect(()=>{
        const api = "http://172.19.128.128:3060/api/generals/crqs/crqsdetails"
        fetch(api,{cache: "no-store"})
            .then( res => res.json())
            .then( data => setData(data.data))
    },[])

    return(
        <div>
            <div className="w-full p-4 text-[20px] text-red-900">
                CRQs Observaciones
            </div>
            {
                data
                ?
                data.map(item =>
                    <div key={item.id} className="p-2 w-full  mt-2" >
                        <div className="bg-red-500 text-white p-2">
                            {
                                item.title
                            }
                        </div>
                        {
                            item.lines.map( line => 
                                <div className="border-[1px] border-t-0 border-red-500 p-2">
                                    {
                                        line.line
                                    }
                                </div>
                            )
                        }
                    </div>
                )
                :
                "Cargando..."
            }
            
        </div>
    )
}