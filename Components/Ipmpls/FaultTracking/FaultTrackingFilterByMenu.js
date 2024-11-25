import { useRouter } from "next/navigation"

export default function FaultTrackingFilterByMenu ({onSelectMenu,menuFilter}) {
    const router = useRouter()
    const sharedStyles = "h-full px-2 flex justify-center items-center border-r-[1px] border-white"
    const selectedStyles = `${sharedStyles} bg-white flex `
    const unSelectedStyles = `${sharedStyles} bg-red-500 text-white`

    return(
        <div className="h-full w-full flex first:border-l-[1px]">
            {
                menuFilter.map(item => 
                    <div 
                        key={item.id}
                        className={item.selected?selectedStyles:unSelectedStyles}
                        onClick={() => onSelectMenu(item.id,item.value)}
                    >
                        {item.tag}
                    </div>
                    
                )
            }
            <div 
                key={'lasfdkj'}
                className="bg-yellow-400 text-white flex justify-center items-center p-2"
                onClick={() => router.push('/ipmpls/faulttracking/new')}
            >
                <div>
                    Nuevo
                </div>
            </div>
        </div>
    )
}