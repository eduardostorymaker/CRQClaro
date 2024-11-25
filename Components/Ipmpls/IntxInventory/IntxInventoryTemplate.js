'use client'

import { useState } from "react"

import IntxInventoryGroup from "./IntxInventoryGroup"
import IntxInventorySms from "./IntxInventorySms"
import IntxInventoryFilterGroup from "./IntxInventroyFilterGroup"

const createIntxSummary = (list) => {
    const quantityIntxSummary = list.reduce( (a,v) => {
        const gatewayName = v.attributes?.gatewaydevice?.data?.attributes?.name
        const clientName = v.attributes?.clientdevice?.data?.attributes?.name
        const intxName = `${gatewayName} <> ${clientName}`
        const intxSavedList = a.map(item => item.name)
        const isInTheList = intxSavedList.includes(intxName)

       
        if ( isInTheList ) {
            //a.push(v.attributes?.gatewaydevice?.data?.attributes?.name)
   
            const changeList = a.map( item => {
                if (item.name === intxName) {
                    return({
                        ...item,
                        quantity: item.quantity +1
                    })
                } else {
                    return({
                        ...item
                    })
                }
            })

            return changeList

        } else {

            a.push(
                {
                    name: intxName,
                    quantity: 1
                }
            )
            return a
        }
    },[])
    return quantityIntxSummary
}

export default function IntxInventoryTemplate ({ dataIntx }) {

    const quantityIntxSummary = createIntxSummary(dataIntx)

    const modifyData = dataIntx.map( item => {
        return(
            {
                selected:false,
                ...item
            }
        )
    })

    const [intxList,setIntxList] = useState(modifyData)
    const [intxShow,setIntxShow] = useState(intxList)
    const [intxSeleted,setIntxSeleted] = useState([])
    const [gatewaySearch,setGatewaySearch] = useState("")
    const [clientSearch,setClientSearch] = useState("")

    console.log("intxList")
    console.log(intxList)
    console.log("intxShow")
    console.log(intxShow)

    const onChangeGatewaySearch = (e) => {
        setGatewaySearch(e.target.value)
        setIntxShow(intxList.filter(item=>item.attributes?.gatewaydevice?.data?.atributtes?.name.toLowerCase().includes(e.target.value.toLowerCase() ) ))
    }

    const onChangeClientSearch = (e) => {
        setClientSearch(e.target.value)
        setIntxShow(intxList.filter(item=>item.attributes?.clientdevice?.data?.atributtes?.name.toLowerCase().includes(e.target.value.toLowerCase() ) ))
    }

    const onChangeSelect = (id) => {
        const modifiedList = intxList.map( item => {
            if (item.id === id) {
                if (!item.selected) {
                    setIntxSeleted([
                        ...intxSeleted,
                        {
                            ...item,
                            selected: !item.selected
                        }
                    ])

                } else {
                    const erasedItem = intxSeleted.filter( item => item.id !== id)
                    setIntxSeleted(erasedItem)
                }

                return (
                    {
                        ...item,
                        selected: !item.selected
                    }
                )
            
            } else {
                return ({
                    ...item
                })    
            }
        })
        

        //setIntxList(modifiedList)
        //setIntxShow(modifiedList)
        
    }

    const seletedListSumary = intxSeleted.reduce( (a,v) => {

        const gatewayName = v.attributes?.gatewaydevice?.data?.attributes?.name
        const clientName = v.attributes?.clientdevice?.data?.attributes?.name
        const intxName = `${gatewayName} <> ${clientName}`
        const intxSavedList = a.map(item => item.name)
        const isInTheList = intxSavedList.includes(intxName)
        const totalIntx = quantityIntxSummary.find(item => item.name === intxName )

       
        if ( isInTheList ) {
            //a.push(v.attributes?.gatewaydevice?.data?.attributes?.name)
   
            const changeList = a.map( item => {
                if (item.name === intxName) {
                    return({
                        ...item,
                        afected: item.afected +1
                    })
                } else {
                    return({
                        ...item
                    })
                }
            })

            return changeList

        } else {
    
            a.push(
                {
                    name: intxName,
                    afected: 1,
                    total: totalIntx.quantity
                }
            )
            return a
        }
    },[])
    
    return(
        <div className="h-full w-full grid grid-cols-2 overflow-hidden ">
            <div className="h-full w-full grid grid-rows-2 overflow-hidden" >
                <div className="h-full w-full overflow-scroll">
                    <IntxInventoryFilterGroup />
                    <IntxInventoryGroup dataIntx={intxShow} onChangeSelect={onChangeSelect} />
                </div>
                <div className="h-full w-full overflow-scroll">
                    <IntxInventoryGroup dataIntx={intxSeleted} onChangeSelect={onChangeSelect} />
                </div>

            </div>
            <div className="h-full w-full ">
                <div >
                    <IntxInventorySms seletedListSumary={seletedListSumary} />
                </div>
            </div>
        </div>

    )
}