import Link from "next/Link"

export default function ButtonSideMenu ( { link, tag, selected, onSelect, menuId, submenuId } ) {

    const sharedStyles = "flex h-full w-full items-center pl-4 border-b-[1px] border-red-300"
    const selectedStyles =`${sharedStyles} text-white bg-yellow-500`
    const unSeletedStyles =`${sharedStyles} text-gray-700 bg-white hover:bg-yellow-500 hover:text-white transition-all duration-300`

    return(
        <li className="h-8">
            <Link 
                onClick={() => onSelect(menuId, submenuId)}
                href={link}
                className={selected?selectedStyles:unSeletedStyles}
            >
                {tag}
            </Link>
        </li>
    )
}