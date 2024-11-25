
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import LinkItem from "./LinkItem"
import EditIcon from '@mui/icons-material/Edit';

export default function LinkGroup ({ bubleid,bubletitle, lines, canEdit }) {

    const router = useRouter()

    return(
        <div className="h-full mb-6">
            <div className="flex flex-col shadow-lg shadow-red-500/50 rounded-xl pb-4 overflow-hidden">
                <div className="flex w-full font-bold justify-center text-white py-3 bg-red-500 ">
                    {
                        canEdit
                        ?
                        <EditIcon onClick={()=>router.push(`/general/links/${bubleid}`)} />
                        :
                        ""
                    }
                    <h3>
                        {   
                            bubletitle
                        }
                    </h3>
                </div>
                <div>
                    {
                        lines.map(item => 
                            <LinkItem key={item.id} link={item.link} line={item.line} comment={item.comment} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}