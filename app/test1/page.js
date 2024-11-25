"use client"
import myImage from "../../assets/icons/technology.png"
import { useEffect } from "react"
import Image from "next/image"

export default function test1 () {

    const getToken = async () => {
        try {
            const requestOptions = {
                method: 'PUT',
                mode: 'no-cors',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "grantType": "password",
                    "userName": "usr_noc_claro",
                    "value": "Claro2024**"
                })
            }
            const api = "https://10.96.209.54:26335/rest/plat/smapp/v1/sessions"
    
            const response = await fetch(api,requestOptions)
            const dataInfo = await response.json()
            if (dataInfo.error) {
                throw new Error("Error "+ dataInfo.status + ": " +dataInfo.error)
            }
            console.log(dataInfo) 
            // setTryToDb(tryToDbStates.success)
            // setCanEdit(false)
            // setAreThereChanges(false)
        } catch (error) {
            console.log("Error en el update")
            console.log(error)
            // setTryToDb(tryToDbStates.fault)   
        }
    }

    useEffect(()=>{
        // const requestOptions = {
        //     method: 'PUT',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({
        //         "grantType": "password",
        //         "userName": "usr_noc_claro",
        //         "value": "Claro2024**"
        //     })
        // }
        // const api = "https://10.96.209.54:26335/rest/plat/smapp/v1/sessions"
        // fetch(api,requestOptions)
        //     .then( res => res.json())
        //     .then( data => console.log(data))


        /////////////////////////////////////////////////
        // const myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");

        // const raw = JSON.stringify({
        // "grantType": "password",
        // "userName": "usr_noc_claro",
        // "value": "Claro2024**"
        // });

        // const requestOptions = {
        // method: "PUT",
        // mode: 'no-cors',
        // headers: myHeaders,
        // body: raw,
        // redirect: "follow"
        // };

        // fetch("https://10.96.209.54:26335/rest/plat/smapp/v1/sessions", requestOptions)
        // .then((response) => response.text())
        // .then((result) => console.log(result))
        // .catch((error) => console.error(error));

        fetch("http://172.19.128.128:3061/api/nce/routeralarms")
        .then(res => res.json())
        .then(data => console.log(data))
    },[])
    console.log("myImage")
    console.log(myImage)
    return(
        <div>
            Test1

            <div>
                <button className="bg-yellow-400 p-2" onClick={getToken}>
                    Enviar data
                </button>
            </div>
            <div className="h-[100px] w-[100px]">
                <Image src={myImage.src} fill className="h-[100px] w-[100px]" />

            </div>
      
        </div>
    )
}