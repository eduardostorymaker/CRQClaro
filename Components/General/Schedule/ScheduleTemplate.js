"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

import Submenu from "../../Menu/Submenu";
import FilterSchedule from "./FilterSchedule";
import ScheduleGroup from "./ScheduleGroup";

const setThisInTrue = (data, id) => {
    const setData = data.map(item => {
        if (item.id===id) {
            return ({
                ...item,
                selected: true
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


export default function ScheduleLayout ({ scheduleGroup, paramId }) {

     //const [filterGroup, setFilterGroup] = useState(setThisInTrue(scheduleGroup,paramId))
    const filterGroup = setThisInTrue(scheduleGroup,paramId)
    const selectedGroup = filterGroup.filter(item=>item.selected)[0]
    //const groupSelected = groupSelectedList[0]
    const router = useRouter()

    const onSelectGroup = (id) => {
        router.push(`/general/schedules/group/${id}`)
    }

    return(
        <div className="h-full w-full">
            <Submenu>
                <FilterSchedule filterGroup={filterGroup} onSelectGroup={onSelectGroup} />
            </Submenu>
            <div>
                <ScheduleGroup selectedGroup={selectedGroup} />
            </div>
           
        </div>
    )
}