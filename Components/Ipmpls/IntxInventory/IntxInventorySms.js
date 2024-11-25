export default function IntxInventorySms ({ seletedListSumary }) {

    const listToString = seletedListSumary.reduce((a,v) => {
        const formatString = `${v.name} (${v.afected}/${v.total})`
        if (a) {
            return a+ ", " + formatString
        } else {
            return a + formatString
        }
    },"")

    const showText = `Caída de INTX ${listToString}`

    console.log("showText")
    console.log(listToString)

    const copyText = async () => {
        //navigator.clipboard.writeText(showText)
        //

        // const myTextArea = document.getElementById("smsintx")
        // myTextArea.select()
        // document.execCommand('copy')

        

        console.log("navigator")
        console.log(navigator.clipboard)

    }

    listToString
                    ?
                    console.log(showText)
                    :
                    console.log("Seleccione las interconexiones!")

    return(
        <div className="h-full w-full">
            <div>
                SMS
            </div>
            <textarea 
                className="w-full"
                id="smsintx" 
                value=
                    {
                        listToString
                        ?
                        showText
                        :
                        "Seleccione las interconexiones!"
                    }
                    
            >

            </textarea>
        </div>
    )
}