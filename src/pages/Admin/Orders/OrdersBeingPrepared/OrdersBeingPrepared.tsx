import { Dispatch, SetStateAction } from 'react';
import { AdminOrder } from '../../../../utils/api/adminService/adminService';
import AccordionList from '../AccordionList/AccordionList';
import { OrderStatus } from '../Orders';
import { useGetAdminOrders } from '../../../../utils/hooks/useAdminOrders/useAdminOrders';
import Preloader from '../../../../components/Preloader/Preloader';

function OrdersBeingPrepared({ setOrderStatus }: { setOrderStatus: Dispatch<SetStateAction<OrderStatus>> }) {
    const ordersAccepted = useGetAdminOrders('accepted');
    const ordersReady = useGetAdminOrders('ready');
    const ordersAcceptedData: AdminOrder[] = ordersAccepted.isSuccess ? ordersAccepted.data.data : [];
    const ordersReadyData: AdminOrder[] = ordersReady.isSuccess ? ordersReady.data.data : [];
    const adminOrders = ordersAcceptedData.concat(ordersReadyData);
    return ordersAccepted.isPending || ordersReady.isPending ? <Preloader /> : <AccordionList data={adminOrders} isArchive={false} setOrderStatus={setOrderStatus as Dispatch<SetStateAction<OrderStatus>>} />;
}

export default OrdersBeingPrepared;
