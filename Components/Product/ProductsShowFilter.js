export default function ProductsShowFilter(props) {

    const { categories, selectCategory, updateFilter } = props
    return(
        <>
            <p>Filtro</p>
            <p>Odenar por</p>
            <p onClick={()=>updateFilter("mayorPrecio")}>Mayor precio</p>
            <p onClick={()=>updateFilter("menorPrecio")}>Menor precio</p>
            <p onClick={()=>updateFilter("popular")}>Mas popular</p>
            {
                categories.map(item => 
                    <p key={item} onClick={()=>selectCategory(item)}>
                        {item}
                    </p>
                )
            }
        </>
    )
}