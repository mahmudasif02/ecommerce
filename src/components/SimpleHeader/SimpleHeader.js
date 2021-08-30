import React from 'react';
import { Link } from 'react-router-dom';
import { useItem } from '../../contexts/ItemContext';

const SimpleHeader = () => {

    const {logo} = useItem()

    return (
        <>
            <header className="bg-white">
                <div className ="container-fluid">
                    <nav className="navbar navbar-expand-lg navbar-light pt-4 pb-4">
                        <div className="d-flex">
                            <Link className="navbar-brand d-flex align-items-center" to="/"><img src={logo} className="site-logo" alt="" /></Link>
                        </div>
                    </nav>
                </div>
                
            </header>
        </>
    );
};

export default SimpleHeader;