import React from 'react';
import AdminLayout from '../../AdminLayout/AdminLayout';
import AdminProductHeader from './AdminProductHeader';
import './AdminProducts.css';
import AdminProductItem from './AdminProductItem';
import SelectBar from './SelectBar';
import { useState } from 'react';
import { useEffect } from 'react';
import Loading from '../../../Loading/Loading';
import { useItem } from '../../../../contexts/ItemContext';
import { deleteProducts } from '../../../../utils/network';

export function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

const AdminProducts = () => {
    const {loading, setLoading, allproducts, products, setProducts} = useItem()
    const [isAllChecked, setIsAllChecked] = useState(false)
    const [deselectAll, setDeselectAll] = useState(true);
    const [selected, setSelected] = useState([])
    
    const handleBulkDelete = () => {
        setLoading(true)
        const data = {
            "productIds": []
        }
        selected.map(item => {
            data.productIds.push({
                "id":item.id
            })
        }) 
        

        const user = JSON.parse(localStorage.getItem('user')) 
        deleteProducts(data, user.token)
        .then(result => {
            if(result.error){
                alert(result.error)
            }
            else{
                const newList = products.filter(item => {
                    let deleteItem = selected.find(item2 => item.id === item2.id)
                    return deleteItem? false: true
                })
                setProducts(newList)
            }
            resetSelection()
            setLoading(false)
        })

    }

    const handleSingleDelete = (id) => {
        setLoading(true)
        const data = {
            "productIds": [
                {
                    "id":id
                }
            ]
        }
        
        const user = JSON.parse(localStorage.getItem('user')) 
        deleteProducts(data, user.token)
        .then(result => {
            if(result.error){
                alert(result.error)
            }
            else{
                const newList = products.filter(pd => pd.id !== id)
                setProducts(newList)
            }
            setLoading(false)
        })
    }

    const handleAllChecked = () => {
        setSelected(products)
        setIsAllChecked(true)
        setDeselectAll(false)
    }

    const handleDeselectAll = () => {
        setSelected([])
        setIsAllChecked(false)
        setDeselectAll(true)
    }

    useEffect(() => {
        if(products?.length > 0){
            if(selected.length < products.length){
                setIsAllChecked(false)
            }
            else if(selected.length === products.length){
                setIsAllChecked(true)
            }
            if(selected.length > 0){
                setDeselectAll(false)
            }
            else if(selected.length === 0){
                setDeselectAll(true)
            }
        }
    }, [selected, products?.length])

    const resetSelection = () => {
        setDeselectAll(true)
        setSelected([])
        setIsAllChecked(false)
    }

    const forceUpdate = useForceUpdate();

    const [categoryFilter, setCategoryFilter] = useState("")
    const [priceFilter, setPriceFilter] = useState("")

    const handleSearchWithValue = (searchValue) => {
        let apiURL = 'https://pickbazar-clone.herokuapp.com/products/'+searchValue
        setSearchLoading(true)
        return fetch(apiURL)
        .then(res => res.json())
        .then(result =>{
            setSearchLoading(false)
            let newList = result
            return newList
        })
    }

    const [searchLoading, setSearchLoading] = useState(false)
    const [search,setSearch] = useState()
    const handleSearch = (e) => {
        if(e.target.value === ""){
            setSearch(null)
            setProducts(allproducts.slice())
            resetSelection()
        }
        else if(e.which === 13){
            setSearch(e.target.value)
            let newList = allproducts.slice()
            const word = e.target.value
            newList = newList.filter(item => {
                const arr = item.name.toLowerCase().split(" ")
                const match = arr.find(item2 => item2 === word.toLowerCase() || item2.startsWith(word))
                return match ? true : false
            })
            setProducts(newList)

            
        }
    }
    
    useEffect(() =>{
        setProducts(allproducts)
    },[allproducts, setProducts])
    
    return (
        <AdminLayout >
            <div className="admin-products container-fluid">
                <div className="row">
                    <div className="admin-products-header col-lg-12 mt-5">
                        <AdminProductHeader 
                            handleSearch={handleSearch}
                            categoryFilter={categoryFilter}
                            setCategoryFilter={setCategoryFilter}
                            priceFilter={priceFilter}
                            setProducts={setProducts}
                            setPriceFilter={setPriceFilter}
                            forceUpdate={forceUpdate}
                        >
                        </AdminProductHeader>
                    </div>
                    {
                        selected.length > 0 &&
                        <div className="col-lg-12 mt-3" style={{padding:0}}>
                            <SelectBar 
                                handleAllChecked={handleAllChecked}
                                handleDeselectAll={handleDeselectAll}
                                handleDelete={handleBulkDelete}
                            >
                            </SelectBar>
                        </div>
                    }
                    
                    <div className="col-lg-12 admin-products-body">
                        <Loading loading={loading}></Loading>
                        <div className="row pb-5">
                            {
                                searchLoading &&
                                <div className="col-md-12 mt-4 text-center">
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }
                            {
                                !loading && products?.length === 0 &&
                                <h1 className="col-md-12 mt-4 text-center">No products found</h1>
                            }
                            {
                                products?.map((product,index) => (
                                    <AdminProductItem 
                                        key={index} 
                                        isAllChecked={isAllChecked} 
                                        setSelected={setSelected} 
                                        deselectAll={deselectAll}
                                        selected={selected} 
                                        products={products}
                                        product={product} 
                                        handleSingleDelete={handleSingleDelete}
                                    >
                                    </AdminProductItem>
                                ))
                            }
                        </div>
                        
                    </div>
                </div>
            </div>

        </AdminLayout>
    );
};

export default AdminProducts;