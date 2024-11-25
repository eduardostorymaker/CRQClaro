'use client'

import { useRouter } from "next/navigation";

import CardLine from "./CardLine";
import EditIcon from '@mui/icons-material/Edit';

export default function ContactCard ({ dataCard, canEdit }) {

    const router = useRouter()

    return (
        <div className="flex flex-col rounded-xl overflow-hidden shadow-lg shadow-red-500/50">
            <div className="bg-red-500 p-4 text-white font-bold">
                <div className="flex">
                    <div>
                        {
                            canEdit
                            &&
                            <EditIcon onClick={()=>router.push(`/general/contacts/${dataCard.id}`)} />
                        }
                    </div>
                    {
                        dataCard.name
                    }
                </div>
                <div className="text-xs text-red-200">
                    {
                        dataCard.description
                    }
                </div>
            </div>
            <div className="py-4">
                {
                    dataCard.lines.map( item => 
                        <CardLine key={item.id} tag={item.tag} information={item.information} />
                    )
                }
            </div>

        </div>
    )
}