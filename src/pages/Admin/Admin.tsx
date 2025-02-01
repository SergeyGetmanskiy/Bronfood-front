import { Outlet } from 'react-router-dom';
import AdminFooter from './AdminFooter/AdminFooter';

function Admin() {
    return (
        <>
            <Outlet />
            <AdminFooter />
        </>
    );
}

export default Admin;
