import Link from "next/Link"

export default function LinkItem ({ link, line, comment }) {

    return(
        <>
           <div className="text-gray-600 font-bold py-2 border-b-2 border-red-100">
                <Link href={link} target="_blank" className="flex w-full px-5 hover:bg-red-400 hover:text-white transition-all ease-in duration-300" >
                    {line}
                </Link>
                <div className="px-6 text-xs text-gray-400">
                    {comment}
                </div>
            </div>
        </>
    )
}