import ItemSideMenu from "./ItemSideMenu"

const extractMenu = (menuList) => {
    const menu = menuList.map(item =>{
        return(
            {
                id: item.id,
                tag: item.tag,
                show: item.show
            }
        )
    })
    return menu
}

export default function SideMenu({ menu,toggleShowMenu, onSelect }) {

    const menuList = extractMenu(menu)

    return(
        <>
        {
            menuList.map(item=> 
                <ItemSideMenu key={item.id} id={item.id} tag={item.tag} show={item.show} allMenu={menu} toggleShowMenu={toggleShowMenu} onSelect={onSelect} />
            )
        }
        </>
    )
}