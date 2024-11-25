import Test6 from "../../Components/Test/Test6"

export default function test6Server () {
    return(
        <div className="h-full">
            <Test6 />
            <div className="h-full">
                <iframe src="http://zabbix.claro.pe/grafana/d/d24dda5a-f44d-4b5d-803d-64aea81dca01/dashboard-networking-firewall-contexto?from=now-24h&to=now&var-grupo1=Red%20Corporativa&var-grupo2=$__all&var-host=FW_CISCO_ADMIN_PRI&var-host2=FW_CISCO_VPN_PRI&var-items=$__all&var-items2=$__all&var-host3=FW_CISCO_FPR9K_POLO1&var-items3=$__all&refresh=5m" height="800" className="h-full w-full"></iframe>
            </div>
        </div>
    )
}