export const base_url="https://api.onimamzad.com" 

export const inputAddress="/api/frontEnd/inputAddress"
export const delveryAddress="/api/frontEnd/deliveryAddress"
export const updateAddress="/api/frontEnd/updateAddress"
export const deleteAddress="/api/frontEnd/deleteAddress"
export const userLogin="/api/frontEnd/userLogin"
export const allProducstApi="/api/frontEnd/products"
export const userRegister="/api/frontEnd/userRegister"
export const allCategoriesApi="/api/frontEnd/categories"
export const contactNumber="/api/frontEnd/contactNumbers"
export const updateNumber="/api/frontEnd/updateContact"
export const inputContactNumber="/api/frontEnd/inputContactNumber"
export const deleteNumber="/api/frontEnd/deleteContact"
export const addOrderApi="/api/frontEnd/addOrder"
export const getUserOrderApi="/api/frontEnd/orders"

export const getProducts = (selectedCategory="", subCategory="") => {
    return fetch(base_url+allProducstApi+'?categoryId='+selectedCategory+'&subCategoryId='+subCategory)
    .then(res => res.json())
    .then(result =>{
        return result
    })
}

export const callAddAddress= (address, token) => {
    return fetch(base_url+inputAddress, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        },
        body: JSON.stringify(address)
    })
    .then(response => response.json())
    .then(data => {
        return data
    })
    .catch(error => {
        alert(error.message)
    })
}

export const getDeliveryAddress = (token) => {
    return fetch(base_url+delveryAddress, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    .then(res => res.json())
    .then(result => {
        return result
    })
    .catch(e => {
        alert(e.message)
    })
}

export const updateDeliveryAddress = (address, id, token) => {
    return fetch(base_url + updateAddress + '/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        },
        body: JSON.stringify(address)
    })
    .then(response => response.json())
    .then(data => {
        return data
    })
    .catch(error => {
        alert(error.message)
    })
}

export const deleteDeliveryAddress = (id, token) => {
    return fetch(base_url + deleteAddress + '/' +id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        }
    })
    .then(response => response.json())
    .then(data => {
        return data
    })
    .catch(error => {
        alert(error.message)
    })
}

export const login = (data) => {
    return fetch(base_url + userLogin, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        return result
    })
    .catch(e => {
        alert("Email or password doesn't match")
    })
}

export const signup = (data) => {
    return fetch(base_url + userRegister, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        return result
    })
}

export const getCategories = () =>{
    return fetch(base_url + allCategoriesApi)
    .then(res => res.json())
    .then(data => {
        return data
    })
    .catch(e => {
        alert(e.message)
    })
}

export const getAllContacts = (token) => {
    return fetch(base_url+contactNumber, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        }
    })
    .then(res => res.json())
    .then(result => {
        return result
    })
}

export const callAddContact = (number, token) => {
    return fetch(base_url+inputContactNumber, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        },
        body: JSON.stringify(number)
    })
    .then(response => response.json())
    .then(data => {
        return data
    })
    .catch(error => {
        alert(error.message)
    })
}

export const updateContacts = (number, id, token) => {
    return fetch(base_url+updateNumber+'/'+id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        },
        body: JSON.stringify(number)
    })
    .then(response => response.json())
    .then(data => {
        return data
    })
    .catch(error => {
        alert(error.message)
    })
}

export const deleteContactNumber = (id, token) => {
    return fetch(base_url + deleteNumber + '/' +id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        }
    })
    .then(response => response.json())
    .then(data => {
        return data
    })
    .catch(error => {
        alert(error.message)
    })
}

export const addOrder = (data, token) => {
    return fetch(base_url+addOrderApi,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(async result => {
        return result
    })
    .catch(e => alert(e.message))
}

export const getUserOrders = (token) => {
    return fetch(base_url+getUserOrderApi,{
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        }
    })
    .then(res => res.json())
    .then(async result => {
        return result
    })
    .catch(e => alert(e.message))
}