import IntxInventoryItem from "./IntxInventoryItem";

export default function IntxInventoryGroup ({ dataIntx,onChangeSelect }) {

    return(
        <div className="p-4">
            <table>
                <tbody>
                    {
                        dataIntx?.map( item => 
                            <IntxInventoryItem 
                                key={item.id}
                                gateway={item.attributes?.gatewaydevice?.data?.attributes?.name} 
                                gatewayport={item.attributes?.gatewayport} 
                                client={item.attributes?.clientdevice?.data?.attributes?.name} 
                                clientport={item.attributes?.clientport} 
                                selected={item.selected}
                                onChangeSelect={onChangeSelect}
                                id={item.id}
                            />
                            
                        )
                    }

                </tbody>
            </table>
        </div>
    )
}