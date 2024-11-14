import { Outlet } from 'react-router-dom';
import AdminFooter from './AdminFooter/AdminFooter';
import { Dispatch, SetStateAction, useState } from 'react';

export type OutletContextType = { setIsPopupOpen: Dispatch<SetStateAction<boolean>> };

function Admin() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    return (
        <>
            {isPopupOpen && <Outlet context={{ setIsPopupOpen } satisfies OutletContextType} />}
            <AdminFooter isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />
        </>
    );
}

export default Admin;
