'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ContactCard from "./ContactCard";
import FilterContacts from "./FilterContacts";
import Submenu from "../../Menu/Submenu";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

export default function ContactsPageTemplate ({ datalist }) {

    const route = useRouter()

    const [searchValue,setSearchValue] = useState("")
    const [contactList,setContactList] = useState("")
    const [canEdit,setCanEdit] = useState(false)
    const dataToShow = contactList?contactList.filter(item => 
        item.name.toLowerCase().includes(searchValue.toLowerCase())
        ||
        item.description.toLowerCase().includes(searchValue.toLowerCase())
    ):""
    
    useEffect(()=>{
        const url = "http://172.19.128.128:3060/api/contact"
        fetch(url,{cache: "no-store"})
            .then(res => res.json())
            .then(data => setContactList(data.data))
    },[])

    return(
        <div>
            {
                contactList
                ?
                <div className="w-full">
                    <div className="flex h-[50px] w-full justify-between items-center bg-red-500 ">
                        <div className="h-full p-2" >
                            <input type="text p-2" className="h-full" onChange={(e)=>setSearchValue(e.target.value)} />
                        </div>
                        <div className="h-full px-2 flex items-center" >
                            {
                                canEdit
                                ?
                                <div className="flex items-center">
                                    <div>
                                        <div className="p-2 bg-yellow-400 text-white mr-2" onClick={()=>route.push("/general/contacts/new")}>
                                            Nuevo
                                        </div>
                                    </div>
                                    <CloseIcon className="text-white" onClick={()=>setCanEdit(false)} />
                                </div>
                                :
                                <EditIcon className="text-yellow-400" onClick={()=>setCanEdit(true)} />
                            }
                            
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4">
                        {
                            dataToShow.map( item => 
                                <ContactCard key={item.id} dataCard={item} canEdit={canEdit} />
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