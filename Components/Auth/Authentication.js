"use client"

import { useState } from "react"

export default function Authentication () {

    const [user,setUser] = useState("")
    const [password,setPassword] = useState("")
    console.log(user)
    console.log(password)

    return(
        <div className="h-full w-full flex justify-center items-center">
            <div className="bg-red-500 p-4 rounded-xl">
                <div>
                    <div className="flex p-4 w-full justify-center">
                        <div className="text-white px-2 font-bold">
                            Inicio de Sesión
                        </div>
                    </div>
                    <div className="p-4 ">
                        <div className="text-white">
                            Usuario:
                        </div>
                        <div>
                            <input 
                                type="text" 
                                className="p-2 w-full" 
                                value={user} 
                                onChange={(e) => setUser(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="p-4 ">
                        <div className="text-white">
                            Contraseña:
                        </div>
                        <div>
                            <input 
                                type="password" 
                                className="p-2 w-full"
                                value = {password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex p-4 justify-center ">
                        <div className="w-full">
                            <div className="flex justify-center">
                                <button className="bg-yellow-400 text-white px-4 py-2">
                                    Ingresar
                                </button>
                            </div>
                            <div>
                                <div className="text-white px-4 py-2">
                                    Usuario o Contraseña incorrecto
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}