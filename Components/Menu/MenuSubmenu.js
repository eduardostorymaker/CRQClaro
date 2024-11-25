export default function MenuSubmenu ({ changeSelection, dataFilter}) {

    const sharedStyles = "h-full border-r-[1px] px-4 py-2 border-white"
    const selectedStyles = sharedStyles+" "+"bg-white text-red-500 border-b-[1px] border-red-500"
    const unSelectedStyles = sharedStyles+" "+"bg-red-500 text-white hover:text-red-500 hover:bg-white transition-all duration-300"

    return(
        <div className="w-full h-full [&>*:first-child]:border-l-[1px] border-white overflow-hidden">
        {
            dataFilter.map(item => 
                <button 
                    key={item.id}
                    className={item.selected?selectedStyles:unSelectedStyles}
                    onClick={()=>changeSelection(item.id)}
                >
                    {item.title}
                </button>    
            )
        }
        </div>
    )
}