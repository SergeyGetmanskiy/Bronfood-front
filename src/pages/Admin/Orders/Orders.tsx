import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPopup from '../AdminPopup/AdminPopup';
import OrdersTabs from './OrdersTabs/OrdersTabs';
import OrdersNotAccepted from './OrdersNotAccepted/OrdersNotAccepted';
import OrdersBeingPrepared from './OrdersBeingPrepared/OrdersBeingPrepared';
import OrdersArchive from './OrdersArchive/OrdersArchive';
import { useAdminOrdersMutations, useGetAdminOrders } from '../../../utils/hooks/useAdminOrders/useAdminOrders';
import Preloader from '../../../components/Preloader/Preloader';
import AdminConfirmation from '../AdminConfirmation/AdminConfirmation';
import { AdminOrderStatus } from '../../../utils/api/adminService/adminService';

const tabNames: TabNames[] = ['notAccepted', 'beingPrepared', 'archive'];

export type TabNames = 'notAccepted' | 'beingPrepared' | 'archive';

export type OrderStatus = {
    id: number | null;
    status: AdminOrderStatus;
    confirmQuestion: string;
    isConfirmationPopupOpen: boolean;
};

function Orders() {
    const [tab, setTab] = useState<TabNames>('notAccepted');
    const [orderStatus, setOrderStatus] = useState<OrderStatus>({
        id: null,
        status: '',
        confirmQuestion: '',
        isConfirmationPopupOpen: false,
    });
    const navigate = useNavigate();
    const { data, isSuccess, isPending } = useGetAdminOrders();
    const adminOrders = isSuccess ? data.data : [];
    const ordersNotAccepted = adminOrders.filter((order) => order.status === 'not accepted');
    const ordersCooking = adminOrders.filter((order) => order.status === 'being prepared' || order.status === 'ready');
    const ordersArchive = adminOrders.filter((order) => order.status === 'archive');
    const { changeAdminOrderStatus } = useAdminOrdersMutations();
    const close = () => {
        navigate('/admin');
    };
    const selectTab = (nextTab: TabNames) => setTab(nextTab);
    const onSubmit = async () => {
        await changeAdminOrderStatus.mutateAsync({ id: orderStatus.id as unknown as number, status: orderStatus.status });
        setOrderStatus({ ...orderStatus, isConfirmationPopupOpen: false });
    };
    return (
        <>
            <AdminPopup close={close} isConfirmationPopupOpen={orderStatus.isConfirmationPopupOpen}>
                <OrdersTabs tabNames={tabNames} tab={tab} selectTab={selectTab} />
                {isPending && <Preloader />}
                {tab === 'notAccepted' && <OrdersNotAccepted orders={ordersNotAccepted} setOrderStatus={setOrderStatus} />}
                {tab === 'beingPrepared' && <OrdersBeingPrepared orders={ordersCooking} setOrderStatus={setOrderStatus} />}
                {tab === 'archive' && <OrdersArchive orders={ordersArchive} />}
            </AdminPopup>
            {orderStatus.isConfirmationPopupOpen && <AdminConfirmation close={() => setOrderStatus({ ...orderStatus, isConfirmationPopupOpen: false })} question={orderStatus.confirmQuestion} onSubmit={onSubmit} isLoading={changeAdminOrderStatus.isPending} />}
        </>
    );
}

export default Orders;
