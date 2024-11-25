"use client"

import { useState } from "react"

const firstHeader = [
    {
        id: "incident",
        tag: "Incidencia",
        search: ""
    },
    {
        id: "date",
        tag: "Fecha",
        search: ""
    },
    {
        id: "title",
        tag: "Titulo",
        search: ""
    },
    {
        id: "brief",
        tag: "Resumen",
        search: ""
    }
]

export default function Test5 () {

    const [searcher,setSearcher] = useState(false)
    const [headers,setHeaders] = useState(firstHeader)
    const columnStyle = "grid grid-cols-[160px_100px_300px_400px]"
    const stylesHeader = "border-[1px] border-white w-full"
    const stylesLines = "border-[1px] border-t-0 border-white"
    const cellStyles = "p-2"
    console.log("headers")
    console.log(headers)

    const data = [
        {
            id:1,
            title: "Titulo1",
            inc: "INC000000125469",
            brief: "Resumen de la informacion abc",
            date: "07/11/2024"
        },
        {
            id:2,
            title: "Titulo2",
            inc: "INC000000125470",
            brief: "Resumen de la informacion xyz",
            date: "07/11/2024"

        },
        {
            id:3,
            title: "Titulo2",
            inc: "INC000000125471",
            brief: "Resumen de la informacion abc",
            date: "07/11/2024"

        },
        {
            id:4,
            title: "Titulo4",
            inc: "INC000000125472",
            brief: "Resumen de la informacion xyz",
            date: "07/11/2024"

        }

    ]

    const dataToShow = data.filter( item => 
        item.inc.toLowerCase().includes(headers.find(header => header.id === "incident").search.toLowerCase())
        &&
        item.date.toLowerCase().includes(headers.find(header => header.id === "date").search.toLowerCase())
        &&
        item.title.toLowerCase().includes(headers.find(header => header.id === "title").search.toLowerCase())
        &&
        item.brief.toLowerCase().includes(headers.find(header => header.id === "brief").search.toLowerCase())
    )

    console.log("dataToShow")
    console.log(dataToShow)

    const cell = (value,index) => 
        <div key={index} className="p-2">
            {
                value
            }
        </div>

    const onChangeSearch = (e,item) => {
        const newHeaders = 
        setHeaders([
            ...headers.map( header => {
                if (item.id === header.id) {
                    return({
                        ...header,
                        search: e.target.value
                    })
                } else {
                    return({
                        ...header
                    })
                }
            })
        ])
    }


    return(
        <div className="h-full w-full">
            <div className="h-full w-full bg-gray-900 p-4">
                <div className="flex justify-between text-white">
                    <div className="flex p-8 bg-red-500">
                        INC
                    </div>
                    <div className="">
                        <div onClick={()=>setSearcher(ant => !ant)}>
                            Filtro
                        </div>
                    </div>
                </div>
                <div className="tablainc py-4 text-white">
                    {
                        searcher
                        ?
                        <div className={`header ${stylesHeader} ${columnStyle}`}>
                            {
                                headers.map( ( item, index) =>
                                    <div key={item.id} className={`flex w-full overflow-hidden text-black ${cellStyles}`}>
                                        <input type="text" className="w-full" value={item.search} onChange={(e)=>onChangeSearch(e,item)} />
                                    </div>   
                                )
                            }
                        </div>
                        :
                        ""
                    }
                    <div className={`header ${stylesHeader} ${columnStyle}`}>
                        {
                            headers.map( ( item, index) =>
                                <div key={item.id} className={cellStyles}>
                                    {
                                        item.tag
                                    }
                                </div>   
                            )
                        }
                    </div>
                    <div className="body">
                        {
                            dataToShow.map( item => {
                                const cellIncident = 
                                    <div className="">
                                        {
                                            item.inc
                                        }
                                    </div>

                                const columnsToShow = [cellIncident,item.date,item.title,item.brief]

                                return(
                                    <div key={item.id} className={`line ${stylesLines} ${columnStyle}`}>
                                        {
                                            columnsToShow.map(( item,index ) => cell(item, index))
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                {/* <div>
                    <iframe className="h-[500px] w-[500px] bg-white" src="http://172.19.128.128:3001/general/links" ></iframe>
                </div> */}
            </div>
        </div>
    )
}