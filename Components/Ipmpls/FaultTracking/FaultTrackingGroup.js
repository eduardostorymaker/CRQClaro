import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';

export default function FaultTrackingGroup ({ dataFiltered, onSelect, setCodeSiteSelected }) {

    const HeaderStyles= `bg-red-500 text-white`

    const stringToArrayObject = (string) => {
        const toArray = string.split('/')
        const toObject = toArray.map(item => {
            const atributes = item.split(',')
            return({
                id: atributes[0],
                ticket: atributes[1],
                group: atributes[2],
                current: /^true$/i.test(atributes[3])
            })
        })
        console.log("Objeto")
        console.log(toObject)
        return toObject
    } 

    const incidentsAndGroupToString = (string) => {
        const objArr = stringToArrayObject(string)
        return objArr.reduce( (a,v) => {
            return a + `${v.ticket} (${v.group}) `
        },"")
    }

    const columns = [
        { 
            field: 'Open',
            headerName: 'Open',
            width: 80,
            headerClassName:HeaderStyles,
            renderCell: (params) => {
                return <button className="w-full bg-yellow-500 px-2 text-white hover:bg-yellow-300 transition ease-in-out ">Abrir</button>
            }
        },
        { field: 'Id', headerName: 'Id', width: 70, headerClassName:HeaderStyles  },
        { field: 'Estado', headerName: 'Estado', width: 120, headerClassName:HeaderStyles  },
        { field: 'Seguimiento', headerName: 'Seguimiento', width: 250, headerClassName:HeaderStyles  },
        { field: 'Titulo', headerName: 'Titulo', width: 600, headerClassName:HeaderStyles  },
        { field: 'Inicio', headerName: 'Inicio', width: 200, headerClassName:HeaderStyles  },
        { field: 'Fin', headerName: 'Fin', width: 200, headerClassName:HeaderStyles  },
        { field: 'Incidencias', headerName: 'Incidencias', width: 200, headerClassName:HeaderStyles  }
        
    ];

    // const rows = [
    //     { id: 1, Codigo: "abc", Site: 'Snow', Servicios: 'Jon', Equipo: "equipo", Tipo: "tipo", Distrito: "distrito", Provincia: "provincia", Departamento: "departamento" },
    // ];

    const rows = dataFiltered.map( item => {
        const following = item.ticket?stringToArrayObject(item.ticket).find(item => item.current):""

        return(
            { 
                id: item.id,
                Open: "Abrir",
                Id: item.id,
                Estado: item.state,
                Seguimiento: item.ticket? `${following.ticket} (${following.group})`:"Sin Ticket",
                Titulo: item.title,
                Inicio: (new Date(item.starttime)).toLocaleString('es-ES'),
                Fin: (new Date(item.endtime)).toLocaleString('es-ES'),
                Incidencias: item.ticket?incidentsAndGroupToString(item.ticket):"Sin Ticket",
            }
        )
    })

    const router = useRouter()

    const onClickEvent = (e) => {
        //console.log("Se dio click")
        //console.log(e)
        if (e.field === "Open" ) {
            //console.log("mapa")
            router.push(`/ipmpls/faulttracking/${e.row.Id}`)
        }
    }

    return(
        <div className='h-full w-full'>
            <DataGrid
                onCellClick={onClickEvent}
                rows={rows}
                columns={columns}
                initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                },
                }}
                pageSizeOptions={[5, 10]}
            />
        </div>
    )
}
