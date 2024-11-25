"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

import Submenu from "../../Menu/Submenu";
import FilterSchedule from "./FilterSchedule";
import ScheduleUploadItem from "./ScheduleUploadItem";

const setThisInTrue = (data, id) => {
    const setData = data.map(item => {
        if (item.id===id) {
            return ({
                ...item,
                selected:true
            })
        } else {
            return ({
                ...item,
                selected:false
            })
        }
    })
    return setData
}

export default function ScheduleUploadTemplate({ scheduleGroup, paramId }) {
    //const [filterGroup, setFilterGroup] = useState(setThisInTrue(scheduleGroup,paramId))
    const filterGroup = setThisInTrue(scheduleGroup,paramId)
    const router = useRouter()

    const onSelectGroup = (id) => {
        router.push(`/general/schedules/upload/${id}`)
    }

    return(
        <div className="h-full w-full">
            <Submenu>
                <FilterSchedule filterGroup={filterGroup} onSelectGroup={onSelectGroup} />
            </Submenu>
            <div className="h-full w-full">
                <ScheduleUploadItem />
            </div>

           
        </div>
    )
}