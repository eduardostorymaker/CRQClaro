"use client"

import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';

export default function ListaSitesGroup({ dataFiltered }) {

    const HeaderStyles= `bg-red-500 text-white`

    const columns = [
        { field: 'Mapa', headerName: 'Mapa', width: 80, headerClassName:HeaderStyles },
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
                Mapa: "ir a mapa",
                Codigo: item.attributes.papcode,
                Nombre: item.attributes.papname,
                Estado: item.attributes.papstate,
                Subregion: item.attributes.subregion,
                Tecnologias: item.attributes.tecnologies,
                Longitud: item.attributes.longitude,
                Latitud: item.attributes.latitude,
                Departamento: item.attributes.department,
                Provincia:item.attributes.province,
                Distrito: item.attributes.district,
                CentroPoblado: item.attributes.populatedcenter,
                Direccion: item.attributes.address,
            }
        )
    })

    const router = useRouter()

    const onClickEvent = (e) => {
        //console.log("Se dio click")
        //console.log(e)
        if (e.field === "Mapa" ) {
            //console.log("mapa")
            router.push(`/general/sitesmap?Latitud=${e.row.Latitud}&Longitud=${e.row.Longitud}&Codigo=${e.row.Codigo}&Nombre=${e.row.Nombre}`)
        }
    }

    return(
        <div>
            <DataGrid
                onCellClick={onClickEvent}
                rows={rows}
                columns={columns}
                initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 13 },
                },
                }}
                pageSizeOptions={[5, 10]}
            />
        </div>
    )
}
