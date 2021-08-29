import { useEffect, useState } from "react"
import { useContext,createContext } from "react"
import { getCategories, getLogo, getProducts } from "../utils/network"

const ItemContext = createContext()
export function useItem(){
    return useContext(ItemContext)
}

export function ItemContextProvider({children}){
    const [productChange, setProductChange] = useState(true)
    const [categoryChange, setCategoryChange] = useState(true)
    const [couponChange, setCouponChange] = useState(true)
    const [logoChange, setLogoChange] = useState(true)

    const [loading,setLoading] = useState()
    const [categoryLoading, setCategoryLoading] = useState()
    const [couponLoading, setCouponLoading] = useState()

    const [allproducts, setAllProducts] = useState([])
    const [products, setProducts] = useState([])

    const [allcategories, setAllCategories] = useState([])
    const [categories, setCategories] = useState([])

    // const [allcoupons, setAllcoupons] = useState([])
    const [coupons, setCoupons] = useState([])

    const [logo, setLogo] = useState({})

    useEffect(() => {
        setLoading(true)
        getProducts()
        .then(data => {
            setProducts(data)
            setAllProducts(data)
            setLoading(false)
        })
    },[productChange])

    useEffect(() => {
        setLoading(true)
        getLogo()
        .then(result => {
            setLogo(result.img)
            setLoading(false)
        })
    },[logoChange])

    useEffect(() => {
        setCategoryLoading(true)
        getCategories()
        .then(data => {
            setAllCategories(data)
            setCategories(data)
            setCategoryLoading(false)
        })
    },[categoryChange])

    const value = {
        loading, setLoading, allproducts, products, setProducts, productChange, setProductChange, categoryChange, setCategoryChange, allcategories, categories, setCategories, categoryLoading, setCategoryLoading, couponLoading, setCouponLoading, coupons, setCoupons, setCouponChange, couponChange, logo, setLogo, logoChange, setLogoChange
    }

    return (
        <ItemContext.Provider value={value}>
            {children}
        </ItemContext.Provider>
    )
}