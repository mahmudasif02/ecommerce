import React, { useState } from 'react';
import { useEffect } from 'react';
import { BiPlus } from "react-icons/bi";
import { callAddAddress, deleteDeliveryAddress, getDeliveryAddress, updateDeliveryAddress } from '../../utils/network';
import Loading from '../Loading/Loading';
import AddAddressModal from './AddAddressModal';
import AddressItem from './AddressItem';

const AddressSection = ({register,errors, customer}) => {

    const [addAddressIsOpen, setAddAddressIsOpen] = useState(false);
    const [addresses, setAddresses] = useState([]) 
    const [loading, setLoading] = useState(false)

    useEffect(()=> {
        setAddresses(customer?.deliveryAddress || [])
    },[customer?.deliveryAddress])
    
    const handleClose = () => {
        setAddAddressIsOpen(false)
    }
      
    const addAddress = () => {
        let title = document.getElementById("address-title").value;
        let desc = document.getElementById("address").value;
        if(!title || !desc){
            alert("Please fill out all inputs")
        }
        else{
            const newList = addresses
            newList.push({
                title,
                desc
            });
            setAddresses(newList)
            setAddAddressIsOpen(false)
            const address = {title, desc}
            
            setLoading(true)
            const user = JSON.parse(localStorage.getItem('user')) 
            
            callAddAddress(address, user.token)
            .then(result => {
                window.location.reload();
            })
            
        }
    }

    useEffect(() => {
        setLoading(true)
        const user = JSON.parse(localStorage.getItem('user'))
        
        getDeliveryAddress(user.token)
        .then(result => {
            setLoading(false)
            setAddresses(result)
        })
        
    },[])

    const updateAddressInDatabase = (title,desc, index) => {
        setLoading(true)
        const user = JSON.parse(localStorage.getItem('user'))
        const address = {
            title, desc
        }
        updateDeliveryAddress(address, addresses[index].id, user.token)
        .then(result => {
            setLoading(false)
        })
        
    }
    
    const deleteAddress = (index) => {
        setLoading(true)
        const user = JSON.parse(localStorage.getItem('user'))
        deleteDeliveryAddress(addresses[index].id, user.token)
        .then(result => {
            setLoading(false)
        })
        
    }
    
    const handleDelete = (index) =>{
        const newList = [...addresses]
        newList.splice(index,1)
        setAddresses(newList)
        deleteAddress(index)
    }


    return (
        <>
            <Loading loading={loading}></Loading>
            <div className="address checkout-section">
                <h3 className="section-header">Delivery Address</h3>
                <div className="checkout-section-add-btn hover-pointer" onClick={() => setAddAddressIsOpen(true)}><BiPlus/> Add Address</div>
                <div className="radio-group row" id="deliveryAddress" name="deliveryAddress" {...register("deliveryAddress", { required:true })}>
                    
                    {
                        addresses?.map((address, index) => <AddressItem key={index} updateAddressInDatabase={updateAddressInDatabase} index={index} setAddresses={setAddresses} addresses={addresses} address={address} handleDelete={handleDelete}></AddressItem>)
                    }
                    
                </div>
                {errors.deliveryAddress?.type === 'required' && <span className="text-danger">Delivery address is required</span>}
            </div>
            <AddAddressModal addAddress={addAddress} addAddressIsOpen={addAddressIsOpen} handleClose={handleClose}></AddAddressModal>
            

        </>
    );
};

export default AddressSection;