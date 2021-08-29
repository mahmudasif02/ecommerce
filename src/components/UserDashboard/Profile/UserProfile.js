import React from 'react';
import ProfileAddressSection from './ProfileAddressSection'
import UserDashboardLayout from '../UserDashboardLayout/UserDashboardLayout';
import './Profile.css'
import ProfileContactSection from './ProfileContactSection';
import { useState } from 'react';
import Loading from '../../Loading/Loading';

const UserProfile = () => {

    const [customer, setCustomer] = useState({})
    const [customerLoading, setCustomerLoading] = useState(false)
    

    return (
        <UserDashboardLayout>
            <Loading loading={customerLoading}></Loading>
            <div className="profile container-fluid bg-white">
                <div className="profile-header-container">
                    <h3 className="profile-header">Your Profile</h3>
                </div>
                
                <ProfileAddressSection customer={customer[0]}></ProfileAddressSection>
                <ProfileContactSection customer={customer[0]}></ProfileContactSection>
            </div>
        </UserDashboardLayout>
    );
};

export default UserProfile;