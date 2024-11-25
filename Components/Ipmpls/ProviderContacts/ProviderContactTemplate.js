"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

import ProviderContactGroup from "./ProviderContactGroup"
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

const dataFilterByWord = (data,word) => {
    const dataFiltered = data.filter(item=> 
        item.provider.toLowerCase().includes(word.toLowerCase())
        || 
        item.type.toLowerCase().includes(word.toLowerCase())
    )
    return dataFiltered
}

export default function ProviderContactTemplate() {

    const router = useRouter()

    const [providerData,setProviderData] = useState("")
    const [searchValue, setSearchValue] = useState("")
    const providerDataFiltered = providerData?dataFilterByWord(providerData,searchValue):""
    const [canEdit,setCanEdit] = useState("")

    useEffect(()=>{
        const url = "http://172.19.128.128:3060/api/internetprovider"
        fetch(url,{cache: "no-store"})
            .then(res => res.json())
            .then(data => setProviderData(data.data) )
    },[])

    const onChangeSearch = (e) => {
        setSearchValue(e.target.value)
    }

    return(
        <div>
            {
               providerData
               ?
                <div className="w-full">
                    <div className="h-[50px] bg-red-500 flex items-center justify-between">
                        <div className="pl-2">
                            <input type="text" className="p-2 rounded-md" onChange={onChangeSearch} />
                        </div>
                        <div className="pr-2 flex items-center">
                            {
                                canEdit
                                ?
                                <div className="flex">
                                    <div>
                                        <div className="p-2 text-white bg-yellow-400" onClick={()=>router.push("/ipmpls/providercontact/new")}>
                                            Nuevo
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <CloseIcon  className="text-white" onClick={()=>setCanEdit(false)} />
                                    </div>

                                </div>
                                :
                                <div className="p-2">
                                    <EditIcon className="text-yellow-400" onClick={()=>setCanEdit(true)} />
                                </div>
                            }
                        </div>
                    </div>
                    <div>
                        <ProviderContactGroup providerDataFiltered={providerDataFiltered} canEdit={canEdit} />
                    </div>
                </div>
               : 
               "Cargando..."
            }
        </div>
    )
}