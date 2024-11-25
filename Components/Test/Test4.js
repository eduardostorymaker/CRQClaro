"use client"

import { useEffect, useState, useRef } from "react"

export default function Test4 () {

    const [data,setData] = useState("")
    const [isRunning, setIsRunning] = useState(false)
    const intervalRef = useRef(null)
    console.log(data)
    console.log(data)

    useEffect(()=>{
        fetch("http://172.19.128.128:3061/api/test",{cache:"no-store"})
            .then( res => res.json())
            .then( data => {
                console.log("data recibida")
                setData(data.data)
                console.log("data actualizada")
            } )
    },[])

    useEffect(()=>{
        if (isRunning) {
            console.log("iniciando repeticiones")
            intervalRef.current = setInterval(()=>{
                //setData(prev => prev + 1)
                console.log("Iniciando consulta")
                fetch("http://172.19.128.128:3061/api/test",{cache:"no-store"})
                    .then( res => res.json())
                    .then( data => {
                        console.log("data recibida")
                        setData(data.data)
                        console.log("data actualizada")
                    } )
            },30*1000)
        } else {
            console.log("cancelando repeticiones")
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                console.log("Intervalo cancelado")
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                console.log("Intervalo limpiado en desmontaje")
            }
        }

        //return () => clearInterval(interval)
    },[isRunning])

    const startInterval = () => {
        setIsRunning(true);
    };

    const stopInterval = () => {
        setIsRunning(false);
    };

    return (
        <div>
            <div className="p-4 bg-red-400 text-white">
                {
                    data
                    ?
                    data.map( item =>
                        <div key={item.id}>
                            <div>
                                {
                                    item.name
                                }
                            </div>
                            <div>
                                {
                                    item.count
                                }
                            </div>
                        </div>    
                    )
                    :
                    "Cargando..."
                }
            </div>
            <button onClick={startInterval} disabled={isRunning} className="p-2">Iniciar</button>
            <button onClick={stopInterval} disabled={!isRunning} className="p-2">Detener</button>
        </div>
    )
}