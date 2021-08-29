import React from 'react';
import { BsTrash } from 'react-icons/bs';
import { BiEdit } from 'react-icons/bi';
import CategoryDrawer from './CategoryDrawer.js';
import { useState } from 'react';

const CategoryItem = ({category, parent, handleSingleDelete}) => {
    
    const [isCategoryDrawerOpen, setCategoryDrawerOpen] = useState(false);

    const handleCategoryDrawerOpen = () => {
        setCategoryDrawerOpen(true)
    }

    const handleCategoryDrawerClose = () => {
        setCategoryDrawerOpen(false);
    }

    return (
        <>
            <tr>
                <td><img src={category.img} alt="" /></td>
                <td>{parent? "_"+category.name: category.name}</td>
                <td>{parent?.name}</td>
                <td>
                    <BiEdit color="green" onClick={()=> handleCategoryDrawerOpen(category)} className="mr-2 hover-pointer"></BiEdit>
                    <BsTrash color='red' onClick={() => handleSingleDelete(category.id)} className="hover-pointer"></BsTrash>
                </td>
            </tr>
            <CategoryDrawer category={category} parent={parent} isCategoryDrawerOpen={isCategoryDrawerOpen} handleCategoryDrawerClose={handleCategoryDrawerClose}></CategoryDrawer>
        </>
    );
};

export default CategoryItem;