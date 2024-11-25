import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function GeneralLoading ({ message }) {

    return(
        <div className='h-full flex flex-col items-center justify-center text-xl text-red-700 px-8' >
            <p className='p-4'>
                { message||"Cargando..." }
            </p>
            
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        </div>
    )
}