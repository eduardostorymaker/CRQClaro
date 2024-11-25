"use client"

import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';

export default function ListaSitesGroup({ dataFiltered, onSelect, setCodeSiteSelected }) {

    const HeaderStyles= `bg-red-500 text-white`

    const columns = [
        { 
            field: 'Mapa',
            headerName: 'Mapa',
            width: 80,
            headerClassName:HeaderStyles,
            renderCell: (params) => {
                return <button className="w-full bg-yellow-500 px-2 text-white hover:bg-yellow-300 transition ease-in-out ">Mapa</button>
            }
        },
        { field: 'Tipo', headerName: 'Tipo', width: 70, headerClassName:HeaderStyles  },
        { field: 'Codigo', headerName: 'Código', width: 140, headerClassName:HeaderStyles  },
        { field: 'Nombre', headerName: 'Nombre', width: 300, headerClassName:HeaderStyles  },
        { field: 'Estado', headerName: 'Estado', width: 70, headerClassName:HeaderStyles  },
        { field: 'Subregion', headerName: 'Subregion', width: 90, headerClassName:HeaderStyles  },
        { field: 'Tecnologias', headerName: 'Tecnologías', width: 90, headerClassName:HeaderStyles  },
        { field: 'Longitud', headerName: 'Longitud', width: 150, headerClassName:HeaderStyles  },
        { field: 'Latitud', headerName: 'Latitud', width: 150, headerClassName:HeaderStyles  },
        { field: 'Departamento', headerName: 'Departamento', width: 200, headerClassName:HeaderStyles  },
        { field: 'Provincia', headerName: 'Provincia', width: 200, headerClassName:HeaderStyles  },
        { field: 'Distrito', headerName: 'Distrito', width: 200, headerClassName:HeaderStyles  },
        { field: 'CentroPoblado', headerName: 'Centro Poblado', width: 200, headerClassName:HeaderStyles  },
        { field: 'Direccion', headerName: 'Dirección', width: 400, headerClassName:HeaderStyles  },
        
    ];

    // const rows = [
    //     { id: 1, Codigo: "abc", Site: 'Snow', Servicios: 'Jon', Equipo: "equipo", Tipo: "tipo", Distrito: "distrito", Provincia: "provincia", Departamento: "departamento" },
    // ];

    const rows = dataFiltered.map( item => {
        return(
            { 
                id: item.id,
                Mapa: "",
                Tipo: item.type,
                Codigo: item.code,
                Nombre: item.name,
                Estado: item.state,
                Subregion: item.subregion,
                Tecnologias: item.tecnologies,
                Latitud: item.latitude,
                Longitud: item.longitude,
                Departamento: item.department,
                Provincia:item.province,
                Distrito: item.district,
                CentroPoblado: item.ppcc,
                Direccion: item.address,
            }
        )
    })

    const router = useRouter()

    const onClickEvent = (e) => {
        //console.log("Se dio click")
        //console.log(e)
        if (e.field === "Mapa" ) {
            //console.log("mapa")
            //router.push(`/map?siteid=${e.row.Codigo}`)
            onSelect("maplist")
            setCodeSiteSelected(e.row.id)
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
