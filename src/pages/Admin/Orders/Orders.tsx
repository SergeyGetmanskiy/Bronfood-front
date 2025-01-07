import { useState, useTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPopup from '../AdminPopup/AdminPopup';
import OrdersTabs from './OrdersTabs/OrdersTabs';
import OrdersNotAccepted from './OrdersNotAccepted/OrdersNotAccepted';
import OrdersCooking from './OrdersCooking/OrdersCooking';
import OrdersArchive from './OrdersArchive/OrdersArchive';
import Preloader from '../../../components/Preloader/Preloader';
import { useGetAdminOrders } from '../../../utils/hooks/useAdminOrders/useAdminOrders';

const tabNames = ['notAccepted', 'cooking', 'archive'];

function Orders() {
    const [isPending, startTransition] = useTransition();
    const [tab, setTab] = useState('notAccepted');
    const navigate = useNavigate();
    const { data, isSuccess } = useGetAdminOrders();
    const adminOrders = isSuccess ? data.data : [];
    const ordersNotAccepted = adminOrders.filter((order) => order.status === 'not accepted');
    const ordersCooking = adminOrders.filter((order) => order.status === 'cooking');
    const close = () => {
        navigate('/admin');
    };
    const selectTab = (nextTab: string) => {
        startTransition(() => {
            setTab(nextTab);
        });
    };

    return (
        <>
            <AdminPopup close={close}>
                <OrdersTabs tabNames={tabNames} tab={tab} selectTab={selectTab} />
                {isPending && <Preloader />}
                {tab === 'notAccepted' && <OrdersNotAccepted orders={ordersNotAccepted} />}
                {tab === 'cooking' && <OrdersCooking orders={ordersCooking} />}
                {tab === 'archive' && <OrdersArchive />}
            </AdminPopup>
        </>
    );
}

export default Orders;
