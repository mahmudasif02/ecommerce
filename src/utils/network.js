export const base_url="https://api.onimamzad.com" 

export const inputAddress="/api/frontEnd/inputAddress"
export const delveryAddress="/api/frontEnd/deliveryAddress"
export const updateAddress="/api/frontEnd/updateAddress"
export const deleteAddress="/api/frontEnd/deleteAddress"
export const userLogin="/api/frontEnd/userLogin"
export const allProducstApi="api/frontEnd/products"
export const userRegister="/api/frontEnd/userRegister"
export const allCategoriesApi="/api/frontEnd/categories"

export const getProducts = (selectedCategory="", subCategory="") => {
    return fetch('https://api.onimamzad.com/api/frontEnd/products?categoryId='+selectedCategory+'&subCategoryId='+subCategory)
    .then(res => res.json())
    .then(result =>{
        return result
    })
}

export const callAddAddress= (address, token) => {
    fetch(base_url+inputAddress, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        },
        body: JSON.stringify(address)
    })
    .then(response => response.json())
    .then(data => {
        if(data){
            return data
        }
    })
    .catch(error => {
        alert(error.message)
    })
}