'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import FilterGroup from "./FilterGroup"
import LinkGroup from "./LinkGroup"
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';



const filterGroupByWord = (allData, filter) => {
    const filteredGroup = allData.filter(item => item.attributes.group.data.attributes.name.toLowerCase().includes(filter.toLowerCase()))
    return filteredGroup
}

const filterAllBySearch = (allData, filter) => {
    const filteredData = allData.filter(item => item.attributes.group.data.attributes.name.toLowerCase().includes(filter.toLowerCase()) || item.attributes.name.toLowerCase().includes(filter.toLowerCase()) || item.attributes.description.toLowerCase().includes(filter.toLowerCase()) )
    return filteredData 
}

const addState = (group) => {
    return [
        {
            id:"todo",
            name: "TODO",
            selected: true
        },
        ...group.map(item => {
            return ({
                ...item,
                selected:false
            })
        })
    ] 
}

export default function LinksPageTemplate () {

    const [filter,setFilter] = useState("")
    const [dataLinks,setDataLinks] = useState("")
    const [dataGroups,setDataGroups] = useState("")
    const [dataToShow,setDataToShow] = useState("")
    const [canEdit,setCanEdit] = useState(false)

    const router = useRouter()

    console.log("dataGroups")
    console.log(dataGroups)

    useEffect(()=>{
        const urlLinks = "http://172.19.128.128:3060/api/links"
        fetch(urlLinks, {cache:'no-store'})
            .then(res => res.json())
            .then(data => {
                setDataLinks(data.data)
                setDataToShow(data.data)
            })

        const urlGroups = "http://172.19.128.128:3060/api/links/group"
        fetch(urlGroups, {cache:'no-store'})
            .then(res => res.json())
            .then(data => setDataGroups(addState(data.data)) )

    },[])

    const onChangeSearch = (e) => {
        setFilter(e.target.value)
        const newData = dataLinks.map(item => {
            const finalLines = item.lines.filter(line => line.line.toLowerCase().includes(e.target.value.toLowerCase()) || line.comment.toLowerCase().includes(e.target.value.toLowerCase()) )
            if (finalLines.length) {
                return ({
                    ...item,
                    lines: finalLines
                })
            }
        }).filter(item=>item)
        setDataToShow(newData)
    }

    const filterByGroup = (id) => {
        if (id === "todo"){
            setDataToShow(dataLinks)     
        } else {
            setDataToShow(dataLinks.filter(item => parseInt(item.groupid) === parseInt(id)))
        }
        setDataGroups(dataGroups.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    selected: true
                }
            } else {
                return {
                    ...item,
                    selected: false
                }
            }
        }))
    }
   
    return(
        <div>
            {
                dataLinks&&dataGroups
                ?
                <div className="w-full h-full">
                    <div className="h-[50px] w-full flex justify-between bg-red-500">
                        <div className="flex h-full w-full">
                            <div className="flex h-full p-2 border-r-[1px] border-white">
                                <input type="text" onChange={onChangeSearch} className="w-[200px] " />
                            </div>
                            {
                                dataGroups.map( item => 
                                    <div className={`flex justify-center items-center px-2 border-r-[1px] border-r-white ${item.selected?"bg-white text-gray-900":"text-white"}`} onClick={()=>filterByGroup(item.id)} >
                                        {
                                            item.name
                                        }
                                    </div>
                                )
                            }
                            

                            
                        </div>
                        <div className="pr-2">
                            
                            {
                                canEdit
                                ?
                                <div className="flex h-full  items-center">
                                    <div className="h-full flex items-center p-2" >
                                        <div className="bg-yellow-400 text-white p-2 " onClick={() => router.push("/general/links/new")}>
                                            Nuevo
                                        </div>
                                    </div>
                                    <div className="flex h-full items-center p-2">
                                        <CloseIcon className="h-full text-white" onClick={()=>setCanEdit(false)}  />
                                    </div>
                                </div>
                                :
                                <div className="flex h-full">
                                    <div className="flex h-full items-center">
                                        <EditIcon className="h-full text-yellow-400" onClick={()=>setCanEdit(true)} />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="w-full p-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {
                            dataToShow.map(item =>
                                <LinkGroup key={item.bubleid} bubleid={item.bubleid} bubletitle={item.bubletitle} lines={item.lines} canEdit={canEdit} />
                            )
                        }
                    </div>
                </div>
                :
                "Cargando..."
            }
        </div>
    )
}
