import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPopup from '../AdminPopup/AdminPopup';
import OrdersTabs from './OrdersTabs/OrdersTabs';
import OrdersNotAccepted from './OrdersNotAccepted/OrdersNotAccepted';
import OrdersCooking from './OrdersCooking/OrdersCooking';
import OrdersArchive from './OrdersArchive/OrdersArchive';
import { useGetAdminOrders } from '../../../utils/hooks/useAdminOrders/useAdminOrders';
import Preloader from '../../../components/Preloader/Preloader';

const tabNames = ['notAccepted', 'beingPrepared', 'archive'];

function Orders() {
    const [tab, setTab] = useState('notAccepted');
    const navigate = useNavigate();
    const { data, isSuccess, isPending } = useGetAdminOrders();
    const adminOrders = isSuccess ? data.data : [];
    const ordersNotAccepted = adminOrders.filter((order) => order.status === 'not accepted');
    const ordersCooking = adminOrders.filter((order) => order.status === 'being prepared' || order.status === 'ready');
    const ordersArchive = adminOrders.filter((order) => order.status === 'archive');
    const close = () => {
        navigate('/admin');
    };
    const selectTab = (nextTab: string) => setTab(nextTab);

    return (
        <>
            <AdminPopup close={close}>
                <OrdersTabs tabNames={tabNames} tab={tab} selectTab={selectTab} />
                {isPending && <Preloader />}
                {tab === 'notAccepted' && <OrdersNotAccepted orders={ordersNotAccepted} />}
                {tab === 'beingPrepared' && <OrdersCooking orders={ordersCooking} />}
                {tab === 'archive' && <OrdersArchive orders={ordersArchive} />}
            </AdminPopup>
        </>
    );
}

export default Orders;
