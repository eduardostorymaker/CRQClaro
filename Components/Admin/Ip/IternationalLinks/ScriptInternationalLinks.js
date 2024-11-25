"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ScriptInternationalLinks () {
    const [response,setResponse] = useState("")
    const [isWating,setIsWating] = useState(false)
    const [consulted, setConsulted] = useState(false)
    const [user,setUser] = useState("")
    const [password,setPassword] = useState("")
    const [isThereAMistake, setIsThereAMistake] = useState(false)
    const [showPassword, setShowPassword] = useState(true)
    const validation = "successfully executed"
    const isOK = response.includes(validation)

    function encriptar(texto) {
        let encriptado = '';
        for (let i = 0; i < texto.length; i++) {
            encriptado += String.fromCharCode(texto.charCodeAt(i) + 5);
        }
        return encriptado;
    }

    const excecuteScript = async () => {
        if ( user && password) {
            setIsThereAMistake(false)
            try {
                const dataRoaming = {
                    du: encriptar(user),
                    dp: encriptar(password)
                }
                const methodHttp = 'POST'
                const api = "http://172.19.128.128:3060/api/scripts/ip/international"
                const requestOptions = {
                    method: methodHttp,
                    headers: {'Content-Type': 'text/plain'},
                    body: JSON.stringify(dataRoaming)
                }
                setConsulted(true)
                setIsWating(true)
                const res = await fetch(api, requestOptions)
                const data = await res.json()
                if (data.error) {
                    throw new Error("Error "+ data.status + ": " +data.error)
                }
                console.log("data")
                console.log(data)
                setResponse(data.data.output)
                setIsWating(false)
    
            } catch (error) {
                console.log("Error en el update")
                console.log(error)
                setResponse("Error ejecutando el codigo")
                setIsWating(false)
            }
        } else {
            setIsThereAMistake(true)
        }
    }

    
    return(
        <div>
            {
                isWating
                ?
                <div className="p-2 w-full bg-yellow-400">
                    Ejecutando el Script, espere...
                </div>
                :
                <div>
                    <div className="w-full flex justify-end p-2">
                        <div>
                            <Link href={"/admin/ip/internationallinks"}>
                                Regresar
                            </Link>
                        </div>
                    </div>
                    <div className="p-2">
                        <div className="w-full flex justify-center">
                            <div className="bg-red-400 p-4 text-white w-[300px]">
                                {
                                    isThereAMistake
                                    ?
                                    <div className="w-full py-2 text-[11px] text-yellow-400">
                                        <div>
                                            Ingresar usuario y contraseña
                                        </div>
                                    </div>
                                    :
                                    ""
                                }
                                <div className="w-full">
                                    <div>
                                        <div>
                                            Usuario:
                                        </div>
                                        <input className="text-gray-900 p-2 w-full" type="text" value={user} onChange={(e)=>setUser(e.target.value)} />
                                    </div>
                                    <div className="mt-2">
                                        <div className="flex justify-between">
                                            <div>
                                                Contraseña:
                                            </div>
                                            <div className="text-[12px] flex items-center" onClick={() => setShowPassword(!showPassword)}>
                                                {
                                                    showPassword
                                                    ?
                                                    "(Ocultar)"
                                                    :
                                                    "(Mostrar)"
                                                }
                                            </div>
                                        </div>
                                        <input className="text-gray-900 p-2 w-full" type={showPassword?"text":"password"} value={password} onChange={(e)=>setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <button className="p-2 bg-yellow-400 text-white w-full mt-4" onClick={() => excecuteScript()} >
                                    Ejecutar Script
                                </button>
                            </div>
                        </div>
                        {
                            consulted
                            ?
                            <div>
                                {
                                    isOK
                                    ?
                                    <div className="p-2 bg-yellow-400 text-white mt-2">
                                        Ejecución exitosa
                                    </div>
                                    :
                                    <div className="p-2 bg-red-400 text-white mt-2">
                                        Hubo un error
                                    </div>
                                }
                                
                                <div>
                                    <textarea value={response} className="h-[500px] w-full" >

                                    </textarea>
                                </div>
                            </div>
                            :
                            <div className="p-2 bg-green-400 text-white mt-2">
                                Ejecutar Script para obtener los enlaces internacionales actualizados.
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}