import { Outlet } from 'react-router-dom';
import AdminFooter from './AdminFooter/AdminFooter';
import { useState } from 'react';

function Admin() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    return (
        <>
            {isPopupOpen && <Outlet context={[setIsPopupOpen]} />}
            <AdminFooter isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />
        </>
    );
}

export default Admin;
