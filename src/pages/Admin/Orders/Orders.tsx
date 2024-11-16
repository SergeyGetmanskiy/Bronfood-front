import { Outlet, useNavigate } from 'react-router-dom';
import AdminPopup from '../AdminPopup/AdminPopup';
import OrdersTabs from './OrdersTabs/OrdersTabs';

function Orders() {
    const navigate = useNavigate();
    const close = () => {
        navigate('/admin');
    };

    return (
        <>
            <AdminPopup close={close}>
                <OrdersTabs />
                <Outlet />
            </AdminPopup>
        </>
    );
}

export default Orders;
