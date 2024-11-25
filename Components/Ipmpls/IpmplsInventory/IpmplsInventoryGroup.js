"use client"

import { DataGrid } from '@mui/x-data-grid';

import IpmplsInventoryItem from "./IpmplsInventoryItem";

export default function IpmplsInvetoryGroup({ dataFiltered }) {

    const columns = [
        { field: 'Codigo', headerName: 'Codigo', width: 70 },
        { field: 'Site', headerName: 'Site', width: 400 },
        { field: 'Servicios', headerName: 'Servicios', width: 130 },
        {
            field: 'Equipo',
            headerName: 'Equipo',
            width: 300,
        },
        {
            field: 'Tipo',
            headerName: 'Tipo',
            width: 150,
        },
        {
            field: 'Distrito',
            headerName: 'Distrito',
            width: 200,
        },
        {
            field: 'Provincia',
            headerName: 'Provincia',
            width: 200,
        },
        {
            field: 'Departamento',
            headerName: 'Departamento',
            width: 200,
        },
    ];

    // const rows = [
    //     { id: 1, Codigo: "abc", Site: 'Snow', Servicios: 'Jon', Equipo: "equipo", Tipo: "tipo", Distrito: "distrito", Provincia: "provincia", Departamento: "departamento" },
    // ];

    const rows = dataFiltered.map( item => {
        return(
            { 
                id: item.id,
                Codigo: item.attributes.site?.data?.attributes?.papcode,
                Site: item.attributes.site?.data?.attributes?.papname,
                Servicios: item.attributes.site?.data?.attributes?.tecnologies,
                Equipo: item.attributes.name,
                Tipo: item.attributes.type,
                Distrito: item.attributes.site?.data?.attributes?.district,
                Provincia: item.attributes.site?.data?.attributes?.province,
                Departamento: item.attributes.site?.data?.attributes?.department 
            }
        )
    })

    return(
        <div className="w-full">
            <DataGrid
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