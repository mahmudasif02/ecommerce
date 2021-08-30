import React from 'react';
import ProductItem from './ProductItem/ProductItem';
import Cart from '../Cart/Cart';
import './Products.css'
import Slider from './Slider';
import { useEffect } from 'react';
import { useItem } from '../../contexts/ItemContext';
import Loading from '../Loading/Loading';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CategorySlider from '../PageLayout/CategorySlider';
import { getProducts } from '../../utils/network';

const Products = ({changeCategory, selectedCategory, subCategory}) => {
  const searchQuery = useParams().search

  const {allproducts, loading, setLoading} = useItem()
  
  const [productArray, setProductArray] = useState(allproducts)
  useEffect(() => {
    setProductArray(allproducts)
  },[allproducts])
  console.log(allproducts)

  useEffect(() => {
    if(selectedCategory){
      setLoading(true)
      getProducts(selectedCategory, subCategory)
      .then(result => {
        setLoading(false)
        setProductArray(result)
      })
      
    }
    else if(searchQuery){
      setLoading(true)
      const query = searchQuery.toLowerCase()
      const newList = allproducts.filter(item => {
        if(item.name.toLowerCase().includes(query) || item.desc.includes(query)){
          return item
        }
      })
      setProductArray(newList)
      setLoading(false)
      // fetch('https://pickbazar-clone.herokuapp.com/products/'+searchQuery)
      // .then(res => res.json())
      // .then(result =>{
      //   setLoading(false)
      //   setProductArray(result)
      // })
    }
    else{
      setProductArray(allproducts)
    }
  },[selectedCategory, subCategory, allproducts, searchQuery, setLoading])
  
  return (
    <>
      <div className="row mt-4">
        <Loading loading={loading}></Loading>
        <Slider></Slider>
        <div className="col-sm-12 filter-mobile-view mt-3">
            <CategorySlider changeCategory={changeCategory} />
        </div>
        {
          !loading && productArray.length === 0 &&
          <h3 className="text-center col-md-12 mt-4">No products found</h3>
        }
        {
          productArray?.map((product,index) => {
            return(
              <div className="col-md-3 col-sm-4 col-6" key={index} style={{padding:'0'}}>
                <ProductItem product={product}></ProductItem>
              </div>
            )
          })
        }
      </div>
      <Cart></Cart>
    </>
  );
};

export default Products;