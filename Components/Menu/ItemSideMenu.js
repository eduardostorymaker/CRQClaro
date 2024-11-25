import ButtonSideMenu from "./ButtonSideMenu";

const filterMenuByTag = (allMenu, tag) => {
    const filteredMenu = allMenu.filter(item => item.tag === tag)
    return filteredMenu[0].submenu
}

export default function ItemSideMenu({ id, tag, show, allMenu, toggleShowMenu, onSelect }) {

    const filteredList = filterMenuByTag(allMenu, tag)

    const displayedStyles = ""
    const nonDisplayedStyles = "hidden"

    const arrowShowedStyles = "flex translate-x-[4px] rotate-180"
    const arrowHiddenStyles = "flex "
 
    return(
        <div>
            <div className="flex justify-between bg-red-500 border-b border-white text-white h-10 items-center px-2" onClick={()=>toggleShowMenu(id)}>
                <div>
                    {tag}
                </div>
                <div 
                    className="flex h-full items-center"
                    
                >
                    <div className={show?arrowShowedStyles:arrowHiddenStyles}>
                        <div className="h-[2px] w-[10px] bg-white rotate-45 translate-x-[4px] ">

                        </div>
                        <div className="h-[2px] w-[10px] bg-white rotate-[135deg] ">

                        </div>

                    </div>
                </div>
            </div>
            <div className={show?displayedStyles:nonDisplayedStyles}>
                {
                    filteredList.map(item => 
                            <ButtonSideMenu key={item.id} link={item.link} tag={item.tag} selected={item.selected} onSelect={onSelect} menuId={id} submenuId={item.id} />
                    )
                }
            </div>
        </div>
    )
}