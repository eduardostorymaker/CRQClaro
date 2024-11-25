'use client'
export default function CardLine({ tag, information }) {

    return(
        <div className="flex w-full border-b-2 border-red-100">
            <div className="flex py-2 px-4 w-full break-words">
                <div className="mr-2 text-gray-500 ">
                        {
                            tag
                        }:
                </div>
                <div className=" text-gray-900 w-full overflow-hidden">
                    {
                        information
                    }
                </div>
            </div>
            
        </div>
    )
}