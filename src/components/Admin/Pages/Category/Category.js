import React from 'react';
import AdminLayout from '../../AdminLayout/AdminLayout';
import './Category.css'
import CategoryHeader from './CategoryHeader'
import { useState } from "react";
import CategoryItem from './CategoryItem';
import { useEffect } from 'react';
import Loading from '../../../Loading/Loading';
import { useItem } from '../../../../contexts/ItemContext';
import { deleteCategory } from '../../../../utils/network';

const Category = () => {
    const {categories, allcategories, setCategories, categoryLoading, setCategoryChange, setCategoryLoading} = useItem()

    const handleSingleDelete = (id) => {
        const user = JSON.parse(localStorage.getItem('user')) 
        setCategoryLoading(true)
        deleteCategory(user.token,id)
        .then(result => {
            setCategoryChange(true)
            setCategoryChange(false)
            setCategoryLoading(false)
        })
    }

    const [search, setSearch] = useState("")
    const categoryFilter = (value) => {
        if(value === "all" || value === ""){
            setCategories(allcategories)
        }
        else{
            setCategories(allcategories.filter(item => item.id == value))
        }
    }

    const handleSearch = (e) => {
        if(e.target.value === ""){
            setSearch(null)
            setCategories(allcategories.slice())
        }
        else if(e.which === 13){
            setSearch(e.target.value)
            let newList = allcategories.slice()
            const word = e.target.value
            newList = newList.filter(item => {
                const arr = item.name.toLowerCase().split(" ")
                const match = arr.find(item2 => item2 === word.toLowerCase() || item2.startsWith(word))
                return match ? true : false
            })
            setCategories(newList)
            setTypeFilter("")
        }
    }

    const [typeFilter, setTypeFilter] = useState("")

    useEffect(() =>{
        setTypeFilter("")
        setCategories(allcategories)
    },[allcategories, setCategories])

    return (
        <AdminLayout>
            <Loading loading={categoryLoading}></Loading>
            <div className="admin-category admin container-fluid">
                <div className="row">
                    <div className="admin-products-header col-lg-12 mt-5">
                        <CategoryHeader 
                            handleSearch={handleSearch} 
                            categoryFilter={categoryFilter}
                            typeFilter={typeFilter}
                            setTypeFilter={setTypeFilter}
                        />
                    </div>
                    {
                        categories.length === 0 && !categoryLoading &&
                        <h1 className="col-md-12 mt-4 text-center">No categories found</h1>
                    }
                    {
                        categories.length > 0 &&
                        <div className="col-lg-12 admin-products-body mt-5">
                            <div className="table-responsive">
                                <table className="table bg-white border table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">Image</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Parent</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            categories.map((category,index) => {
                                                return (
                                                    <CategoryItem 
                                                        key={index} 
                                                        category={category}
                                                        handleSingleDelete={handleSingleDelete}
                                                    />
                                                )
                                            })
                                        }
                                        {
                                            categories.map(category => {
                                                return category.subCategory?.map((subCategory, index) => {
                                                    return (
                                                        <CategoryItem 
                                                            key={index} 
                                                            category={subCategory}
                                                            parent={category}
                                                            handleSingleDelete={handleSingleDelete}
                                                        />
                                                    )
                                                })
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            
                        </div>
                    }
                </div>
            </div>
            
        </AdminLayout>
    );
};

export default Category;