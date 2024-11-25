"use client"
import ProductCard from "./ProductCard";
import ProductsShowFilter from "./ProductsShowFilter";

import { useState, useEffect } from "react";


export default function ProductsShow({productList}) {
    
    const categoriesList = productList.map(item=>item.categories)
    const categoriesListFlat = categoriesList.flat()
    const categoriesListUnique = categoriesListFlat.filter((item,index)=> categoriesListFlat.indexOf(item) === index)

    const firstOrderFilter = {
        mayorPrecio: false,
        menorPrecio: false,
        popular: true
    }

    const resetOrderFilter = {
        mayorPrecio: false,
        menorPrecio: false,
        popular: false
    }
    const [products, setProducts] = useState(productList)
    const [orderFilters, setOrderFilters] = useState(firstOrderFilter)
    //const [categorySelected,setCategorySelected] = useState("none")

    const selectCategory = (category) => {
        //setCategorySelected(category)
        modifyCategoryFilter(category)
    }

    const modifyCategoryFilter = (category) => {
        const dataToFilter = [...productList]
        const dataFiltered = dataToFilter.filter(item => item.categories.includes(category))
        setFormatProducts(dataFiltered)
    }

    const resetFilter = () => {
        setFormatProducts(productList)
    }

    const setFormatProducts = (data) => {
        const sortData = data.sort((a,b)=>(a.name>b.name?1:-1))
        setProducts(sortData)
    }

    // const setMayorPrecio = () => {
    //     const newValue = {
    //         ...resetOrderFilter,
    //         mayorPrecio: true
    //     }
    //     updateFilter("mayorPrecio")
    // }

    // const setMenorPrecio = () => {
    //     const newValue = {
    //         ...resetOrderFilter,
    //         menorPrecio: true
    //     }
    //     updateFilter("menorPrecio")
    // }

    // const setPopular = () => {
    //     const newValue = {
    //         ...resetOrderFilter,
    //         popular: true
    //     }
    //     updateFilter("popular")
    // }

    const updateFilter = (type) => {
        const dataToOrder = [...products]
        switch (type) {
            case "popular":
                orderByPopularity(dataToOrder)
                break;
            case "menorPrecio":
                orderByLowerPrice(dataToOrder)
                break;
            case "mayorPrecio":
                orderByHigherPrice(dataToOrder)
                break;
        }

    }

    const orderByLowerPrice = (data) => {
        const sortData = data.sort((a,b)=>(a.price<b.price?-1:a.price=b.price?0:1))
        setProducts(sortData)
    }

    const orderByHigherPrice = (data) => {
        const sortData = data.sort((a,b)=>(a.price<b.price?1:a.price=b.price?0:-1))
        setProducts(sortData)
    }

    const orderByPopularity = (data) => {
        const sortData = data.sort((a,b)=>(a.name>b.name?1:-1))
        setProducts(sortData)
    }

    return(
        <>
            <ProductsShowFilter 
                categories={categoriesListUnique} 
                selectCategory={selectCategory}
                updateFilter={updateFilter}
            />
            {
                products.map(product => 
                    <ProductCard key={product.id} product={product} />
                )
            }
            
            <button onClick={()=>resetFilter()} >Restaurar</button>
        </>
    )
}