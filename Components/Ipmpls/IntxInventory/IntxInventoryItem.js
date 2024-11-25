export default function IntxInventoryItem ({ gateway, gatewayport, client, clientport, selected,onChangeSelect,id }) {

    return(
        <>
            <tr className="text-xs">
                <td>
                    {
                        gateway
                    }
                </td>
                <td>
                    {
                        gatewayport
                    }
                </td>
                <td>
                    {
                        client
                    }
                </td>
                <td>
                    {
                        clientport
                    }
                </td>
                <td>
                    <input 
                        type="checkbox"
                        checked={selected}                   
                        onChange={()=>onChangeSelect(id)}
                    />
                </td>

            </tr>
        </>
    )
}